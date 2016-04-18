from flask import Blueprint, redirect, render_template, request, session, url_for, g
from spending_app import config
from spending_app.bussiness.auth import AuthService
from spending_app.forms.auth import LoginForm

mod = Blueprint('auth', __name__)

auth_service = AuthService()


@mod.before_request
def add_user_context():
    if config.AUTH_TOKEN_NAME in session:
        g.user_context = auth_service.get_user_context(session[config.AUTH_TOKEN_NAME])


@mod.route('/')
def login_page():
    return render_template('auth/index.html', form=LoginForm())


@mod.route('/login', methods=['POST'])
def login():
    form = LoginForm(request.form)

    if not form.validate_on_submit():
        return redirect(url_for('.login_page'))

    token = auth_service.authenticate(form.login.data, form.password.data)

    if token is not None:
        session[config.AUTH_TOKEN_NAME] = token

    return redirect(url_for('spending.index'))


@mod.route('/logout')
def logout():
    session.pop(config.AUTH_TOKEN_NAME, None)
    return redirect(url_for('.login_page'))


@mod.route('/show')
def show_user():
    user_context = getattr(g, 'user_context', None)
    if user_context is not None:
        return str(g.user_context.user_id)
    else:
        return 'Не авторизирован'



