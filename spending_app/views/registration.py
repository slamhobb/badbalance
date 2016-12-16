import inject

from flask import Blueprint, request, jsonify, render_template, redirect, url_for, g

from spending_app.infrastructure.web import *
from spending_app.forms.registration import RegistrationForm
from spending_app.domain.user import UserData
from spending_app.bussiness.registration import RegistrationService
from spending_app.bussiness.auth import AuthService

mod = Blueprint('registration', __name__)


reg_service = inject.instance(RegistrationService)
auth_service = inject.instance(AuthService)


@mod.before_request
def get_context():
    token = get_token()
    if token is not None:
        g.user_context = auth_service.get_user_context(token)


# @mod.route('/')
# def index():
#     return render_template('registration/index.html', form=RegistrationForm())


@mod.route('/')
def index():
    user_context = getattr(g, 'user_context', None)
    if user_context is not None:
        return redirect(url_for('spending.index'))
    return render_template('registration/cover.html')


@mod.route('/registration')
def registration():
    error_message = request.get('error', '')
    return render_template('registration/registration.html', form=RegistrationForm(), error_message=error_message)


@mod.route('/register', methods=['POST'])
def register():
    form = RegistrationForm()

    if not form.validate_on_submit():
        return redirect(url_for('.registration', error=jsonify(form.errors)))

    user_data = UserData(form.data)

    user_id, reg_message = reg_service.register_user(user_data)

    if user_id is None:
        return redirect(url_for('.registration', error=reg_message))

    token, auth_message = auth_service.authenticate(user_data.login, user_data.password)

    if token is None:
        return redirect(url_for('auth.login_page'))

    set_token(token)
    return redirect(url_for('redirect.redirect'))
