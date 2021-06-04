import inject

from flask import render_template, Blueprint, jsonify, g

from spending_app.infrastructure.web import get_token
from spending_app.infrastructure.auth import login_required
from spending_app.bussiness.auth_service import AuthService
from spending_app.bussiness.spending_service import SpendingService
from spending_app.bussiness.category_service import CategoryService
from spending_app.bussiness.user_config_service import UserConfigService
from spending_app.domain.spending import Spending
from spending_app.forms.spending import SpendingForm, DeleteSpendingForm


mod = Blueprint('spending', __name__)

auth_service = inject.instance(AuthService)
spending_service = inject.instance(SpendingService)
category_service = inject.instance(CategoryService)
user_config_service = inject.instance(UserConfigService)


@mod.before_request
def add_user_context():
    g.user_context = auth_service.get_user_context(get_token())


@mod.route('/')
@login_required
def index():
    return render_template('spending/index.html')


@mod.route('/fast')
@login_required
def fast():
    return render_template('spending/fast.html')


@mod.route('/list_month/<int:year>/<int:month>')
@login_required
def spending_list_month(year, month):
    user_id = g.user_context.user_id

    items = spending_service.get_by_month(user_id, year, month)
    items = [i.to_dict() for i in items]

    cats = category_service.get_category_list(user_id)
    cats = [c.to_dict() for c in cats]

    user_config = user_config_service.get(user_id)

    return jsonify(
        status=True,
        spending=items,
        categories=cats,
        separate_category_ids=user_config.separate_category_ids,
        spending_goal=user_config.spending_goal
    )


@mod.route('/save', methods=['POST'])
@login_required
def save_spending():
    form = SpendingForm()

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    adict = dict(form.data)
    adict['user_id'] = g.user_context.user_id

    spending = Spending.from_dict(adict)

    id = spending_service.save(spending)

    return jsonify(status=True, id=id)


@mod.route('/remove', methods=['POST'])
@login_required
def remove_spending():
    form = DeleteSpendingForm()

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    user_id = g.user_context.user_id
    spending_id = form.data['id']

    spending_service.delete(spending_id, user_id)

    return jsonify(status=True)


@mod.route('/stat/<int:year>/<int:month>', methods=['GET'])
@login_required
def get_statistic(year, month):
    user_id = g.user_context.user_id

    result = spending_service.get_statistic(user_id, year, month)
    result = [r.to_dict() for r in result]

    return jsonify(status=True, stat=result)
