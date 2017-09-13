import inject

from flask import request, Blueprint, jsonify, g

from spending_app.infrastructure.web import get_token
from spending_app.infrastructure.auth import login_required
from spending_app.bussiness.incoming import IncomingService
from spending_app.bussiness.auth import AuthService
from spending_app.domain.incoming import Incoming
from spending_app.forms.incoming import IncomingForm

mod = Blueprint('incoming', __name__)

incoming_service = inject.instance(IncomingService)
auth_service = inject.instance(AuthService)


@mod.before_request
def add_user_context():
    g.user_context = auth_service.get_user_context(get_token())


@mod.route('/save', methods=['POST'])
@login_required
def save():
    form = IncomingForm()

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    incoming = Incoming(form.data)
    incoming.user_id = g.user_context.user_id

    incoming_id = incoming_service.save(incoming)

    return jsonify(status=True, data=incoming_id)


@mod.route('/remove', methods=['POST'])
@login_required
def remove():
    user_id = g.user_context.user_id

    incoming_id = request.get_json()['id']

    incoming_service.delete(incoming_id, user_id)

    return jsonify(status=True)


@mod.route('/list/<int:year>/<int:month>')
@login_required
def get_list(year, month):
    user_id = g.user_context.user_id

    items = incoming_service.get_list(user_id, year, month)
    items = [i.to_primitive() for i in items]

    return jsonify(status=True, data=items)
