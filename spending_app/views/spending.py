import inject

from flask import render_template, request, Blueprint, jsonify, g

from spending_app.infrastructure.web import *
from spending_app.infrastructure.auth import login_required
from spending_app.bussiness.spending import SpendingService
from spending_app.bussiness.auth import AuthService
from spending_app.domain.spending import Spending
from spending_app.forms.spending import SpendingForm

mod = Blueprint('spending', __name__)

auth_service = inject.instance(AuthService)
spending_service = inject.instance(SpendingService)


@mod.before_request
def add_user_context():
    g.user_context = auth_service.get_user_context(get_token())


@mod.route('/')
@login_required
def index():
    model = spending_service.get_index(g.user_context.user_id)
    return render_template('spending/index.html', form=SpendingForm(), model=model)


@mod.route('/list')
@login_required
def spending_list():
    items = spending_service.get_list_by_user(g.user_context.user_id)
    items = [i.to_primitive() for i in items]
    return jsonify(spending=items)


@mod.route('/list_month/<int:year>/<int:month>')
@login_required
def spending_list_month(year, month):
    items = spending_service.get_by_month(g.user_context.user_id, year, month)
    items = [i.to_primitive() for i in items]
    return jsonify(spending=items)


@mod.route('/save', methods=['POST'])
@login_required
def save_spending():
    form = SpendingForm()

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    spending = Spending(form.data)
    spending.user_id = g.user_context.user_id

    spending_service.save(spending)

    return jsonify(status=True)


@mod.route('/remove', methods=['POST'])
@login_required
def remove_spending():
    user_id = g.user_context.user_id

    spending_id = request.get_json()['id']

    spending_service.delete(spending_id, user_id)

    return jsonify(status=True)


@mod.route('/stat/<int:year>/<int:month>', methods=['GET'])
@login_required
def get_statistic(year, month):
    user_id = g.user_context.user_id

    res = spending_service.get_statistic(user_id, year, month)
    res = [r.to_primitive() for r in res]

    return jsonify(stat=res)
