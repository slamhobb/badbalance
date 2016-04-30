import inject

from flask import Blueprint, g, url_for
from flask import redirect as flask_redirect

from spending_app.infrastructure.web import *
from spending_app.bussiness.auth import AuthService

mod = Blueprint('redirect', __name__)

auth_service = inject.instance(AuthService)


@mod.before_request
def get_context():
    token = get_token()
    if token is not None:
        g.user_context = auth_service.get_user_context(token)


@mod.route('/')
def redirect():
    user_context = getattr(g, 'user_context', None)
    if user_context is None:
        return flask_redirect(url_for('auth.login_page'))
    return flask_redirect(url_for('spending.index'))
