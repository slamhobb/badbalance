from flask import Blueprint, redirect, render_template, request, session, url_for, g
from spending_app.bussiness.auth import AuthService
from spending_app.config import settings
from spending_app.forms.auth import LoginForm

token_name = settings['token_name']

auth = Blueprint('auth', __name__)

auth_service = AuthService()


@auth.before_request
def add_user_context():
    if token_name in session:
        g.user_context = auth_service.get_user_context(session[token_name])


@auth.route('/')
def login_page():
    return render_template('auth/index.html', form=LoginForm())


@auth.route('/login', methods=['POST'])
def login():
    form = LoginForm(request.form)

    if not form.validate_on_submit():
        return redirect(url_for('.login_page'))

    token = auth_service.authenticate(form.login.data, form.password.data)

    if token is not None:
        session[token_name] = token

    return redirect(url_for('.show_user'))


@auth.route('/logout')
def logout():
    session.pop(token_name, None)
    return redirect(url_for('.login_page'))


@auth.route('/show')
def show_user():
    user_context = getattr(g, 'user_context', None)
    if user_context is not None:
        return str(g.user_context.user_id)
    else:
        return 'Не авторизирован'


