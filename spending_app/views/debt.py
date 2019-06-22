import inject

from flask import render_template, request, Blueprint, g, jsonify

from spending_app.infrastructure.web import *
from spending_app.infrastructure.auth import login_required
from spending_app.bussiness.auth_service import AuthService
from spending_app.bussiness.debt_service import DebtService
from spending_app.domain.debt_domain import DebtItem
from spending_app.forms.debt_form import DebtItemForm, CreateDebtForm, DeleteDebtForm, DeleteDebtItemForm

mod = Blueprint('debt', __name__)

auth_service = inject.instance(AuthService)
debt_service = inject.instance(DebtService)


@mod.before_request
def add_user_context():
    g.user_context = auth_service.get_user_context(get_token())


@mod.route('/')
@login_required
def index():
    return render_template('debt/index.html')


@mod.route('/list', methods=['GET'])
@login_required
def get_debts():
    list = debt_service.get_items_for_not_closed_debts(g.user_context.user_id)

    return jsonify(status=True, items=list)


@mod.route('/add', methods=['POST'])
def create_debt():
    form = CreateDebtForm()

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    user_id = g.user_context.user_id
    name = form.data['name']

    debt_id = debt_service.add_debt(user_id, name)

    return jsonify(status=True, id=debt_id)


@mod.route('/remove', methods=['POST'])
@login_required
def delete_debt():
    form = DeleteDebtForm()

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    user_id = g.user_context.user_id
    debt_id = form.data['id']

    success = debt_service.delete_debt(debt_id, user_id)

    if not success:
        return jsonify(status=False, message='Сначала удалите все записи внутри долга')

    return jsonify(status=True)


@mod.route('/add_item', methods=['POST'])
@login_required
def save_debt_item():
    form = DebtItemForm()

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    adict = dict(form.data)

    debt_item = DebtItem.from_dict(adict)

    user_id = g.user_context.user_id

    debt_item_id = debt_service.add_debt_item(debt_item, user_id)

    return jsonify(status=True, id=debt_item_id)


@mod.route('/remove_item', methods=['POST'])
@login_required
def delete_debt_item():
    form = DeleteDebtItemForm()

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    user_id = g.user_context.user_id
    debt_item_id = form.data['id']
    debt_id = form.data['debt_id']

    debt_service.delete_debt_item(debt_item_id, debt_id, user_id)

    return jsonify(status=True)
