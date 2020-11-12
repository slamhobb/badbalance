import inject

from flask import render_template, Blueprint, jsonify, g

from spending_app.infrastructure.web import get_token
from spending_app.infrastructure.auth import login_required
from spending_app.bussiness.auth_service import AuthService
from spending_app.bussiness.coop_spending_service import CoopSpendingService

mod = Blueprint('cooperative-spending', __name__)

auth_service = inject.instance(AuthService)
coop_spending_service = inject.instance(CoopSpendingService)


@mod.before_request
def add_user_context():
    g.user_context = auth_service.get_user_context(get_token())


@mod.route('/')
@login_required
def index():
    return render_template('cooperative_spending/index.html')


@mod.route('/get')
@login_required
def get():
    user_id = g.user_context.user_id

    coops = coop_spending_service.get_coop_spending(user_id)
    coops = [coop.to_dict_web() for coop in coops]

    return jsonify(status=True, coops=coops)


@mod.route('/get_items/<int:coop_spending_id>')
@login_required
def get_items(coop_spending_id):
    user_id = g.user_context.user_id

    items = coop_spending_service.get_coop_spending_items(coop_spending_id, user_id)
    items = [i.to_dict_web() for i in items]

    return jsonify(Status=True, items=items)
