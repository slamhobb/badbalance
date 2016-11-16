import inject

from functools import wraps

from flask import render_template, session, request, Blueprint,\
    flash, redirect, url_for, jsonify, make_response, g

from spending_app.infrastructure.web import *
from spending_app.bussiness.spending import SpendingService
from spending_app.bussiness.auth import AuthService
from spending_app.domain.spending import Spending
from spending_app.forms.spending import SpendingForm

mod = Blueprint('spending', __name__)

auth_service = inject.instance(AuthService)
spending_service = inject.instance(SpendingService)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_context = getattr(g, 'user_context', None)
        if user_context is None:
            return redirect(url_for('redirect.redirect'))
        return f(*args, **kwargs)
    return decorated_function


@mod.before_request
def add_user_context():
    token = get_token()
    if token is not None:
        g.user_context = auth_service.get_user_context(token)


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

    id = request.get_json()['id']

    spending_service.delete(id, user_id)

    return jsonify(status=True)


@mod.route('/stat/<int:year>/<int:month>', methods=['GET'])
@login_required
def get_statistic(year, month):
    user_id = g.user_context.user_id

    res = spending_service.get_statistic(user_id, year, month)
    res = [r.to_primitive() for r in res]

    return jsonify(stat=res)


@mod.route('/get_category_list', methods=['GET'])
@login_required
def get_category_list():
    user_id = g.user_context.user_id

    res = spending_service.get_category_list(user_id)
    res = [r.to_primitive() for r in res]

    return jsonify(categories=res)
