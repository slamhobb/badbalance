import inject

from flask import Blueprint, redirect, render_template, request, url_for, g

from spending_app.infrastructure.web import *
from spending_app.bussiness.auth_service import AuthService
from spending_app.forms.auth import LoginForm

mod = Blueprint('auth', __name__)

auth_service = inject.instance(AuthService)


@mod.before_request
def add_user_context():
    g.user_context = auth_service.get_user_context(get_token())


@mod.route('/')
def login_page():
    error_message = request.args.get('error', '')
    return render_template('auth/index.html', form=LoginForm(), error_message=error_message)


@mod.route('/login', methods=['POST'])
def login():
    form = LoginForm()

    if not form.validate_on_submit():
        return redirect(url_for('.login_page', error=str(form.errors)))

    token, message = auth_service.authenticate(form.login.data, form.password.data)

    if token is None:
        return redirect(url_for('.login_page', error=message))

    set_token(token, form.remember_me.data)
    return redirect(url_for('redirect.redirect'))


@mod.route('/logout')
def logout():
    token = get_token()
    user_id = g.user_context.user_id

    auth_service.logout(token, user_id)
    remove_token()
    return redirect(url_for('registration.index'))
