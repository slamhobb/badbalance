import inject

from flask import Blueprint, redirect, render_template, request, url_for, g

from spending_app.infrastructure.web import *
from spending_app.bussiness.auth import AuthService
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
    form = LoginForm(request.form)

    if not form.validate_on_submit():
        return redirect(url_for('.login_page', error=str(form.errors)))

    token, message = auth_service.authenticate(form.login.data, form.password.data)

    if token is not None:
        set_token(token)
    else:
        return redirect(url_for('.login_page', error=message))

    return redirect(url_for('redirect.redirect'))


@mod.route('/logout')
def logout():
    remove_token()
    return redirect(url_for('registration.index'))


@mod.route('/show')
def show_user():
    user_context = getattr(g, 'user_context', None)
    if user_context is not None:
        return str(g.user_context.user_id)
    else:
        return 'Не авторизирован'



