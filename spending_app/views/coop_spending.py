import inject

from flask import render_template, Blueprint, jsonify, g, request

from spending_app.infrastructure.web import get_token
from spending_app.infrastructure.auth import login_required
from spending_app.bussiness.auth_service import AuthService
from spending_app.bussiness.coop_spending_service import CoopSpendingService
from spending_app.domain.coop_spending import CoopSpending, CoopSpendingItem
from spending_app.forms.coop_spending_form import CoopSpendingForm, CoopSpendingItemForm

mod = Blueprint('coop-spending', __name__)

auth_service = inject.instance(AuthService)
coop_spending_service = inject.instance(CoopSpendingService)


@mod.before_request
def add_user_context():
    g.user_context = auth_service.get_user_context(get_token())


@mod.route('/')
@mod.route('/<int:coop_id>')
@login_required
def index(coop_id: int = None):
    return render_template('coop_spending/index.html', coop_id=coop_id)


@mod.route('/list')
@login_required
def get_coops():
    user_id = g.user_context.user_id

    coops = coop_spending_service.get_coops_by_user_id(user_id)
    coops = [coop.to_dict_web() for coop in coops]

    return jsonify(status=True, coops=coops)


@mod.route('/get-data/<int:coop_id>')
@login_required
def coop_data(coop_id: int):
    user_id = g.user_context.user_id

    coop = coop_spending_service.get_coop_by_id(coop_id, user_id)
    coop = coop.to_dict_web() if coop is not None else None

    items = coop_spending_service.get_coop_spending_items(coop_id, user_id)
    items = [i.to_dict_web() for i in items]

    return jsonify(status=True, coop=coop, items=items)


@mod.route('/add', methods=['POST'])
@login_required
def add_coop():
    form = CoopSpendingForm(formdata=None, data=request.get_json())

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    adict = dict(form.data)
    coop = CoopSpending.from_dict_web(adict)

    coop_spending_id = coop_spending_service.add_coop_spending(coop)

    return jsonify(status=True, id=coop_spending_id)


@mod.route('/add-item', methods=['POST'])
@login_required
def add_coop_item():
    form = CoopSpendingItemForm(formdata=None, data=request.get_json())

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    adict = dict(form.data)
    item = CoopSpendingItem.from_dict_web(adict)

    user_id = g.user_context.user_id

    coop_spending_item_id = coop_spending_service.add_coop_spending_item(item, user_id)

    return jsonify(status=True, id=coop_spending_item_id)
