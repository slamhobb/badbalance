import inject

from flask import Blueprint, request, jsonify, render_template

from spending_app.infrastructure.web import *
from spending_app.forms.registration import RegistrationForm
from spending_app.domain.user import User
from spending_app.bussiness.registration import RegistrationService
from spending_app.bussiness.auth import AuthService

mod = Blueprint('registration', __name__)


reg_service = inject.instance(RegistrationService)
auth_service = inject.instance(AuthService)


@mod.route('/')
def index():
    return render_template('registration/index.html', form=RegistrationForm())


@mod.route('/register', methods=['POST'])
def register():
    form = RegistrationForm(request.form)

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    user = User(form.data)

    user_id = reg_service.register_user(user)

    token = auth_service.authenticate(user.login, user.password)

    if token is None:
        return jsonify(status=False)

    set_token(token)
    return jsonify(status=True, user_id=user_id)
