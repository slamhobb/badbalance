import inject

from flask import Blueprint, url_for
from flask import redirect as flask_redirect

from spending_app.infrastructure.web import get_token, get_user_config
from spending_app.bussiness.auth_service import AuthService
from spending_app.bussiness.cookie_config_service import CookieConfigService


mod = Blueprint('redirect', __name__)

auth_service = inject.instance(AuthService)
cookie_config_service = inject.instance(CookieConfigService)


@mod.route('/')
def redirect():
    user_context = auth_service.get_user_context(get_token())
    if not user_context.is_authenticated:
        return flask_redirect(url_for('auth.login_page'))

    cookie_config = cookie_config_service.get(get_user_config())
    if cookie_config.default_page_fast_spending:
        return flask_redirect(url_for('spending.fast'))

    return flask_redirect(url_for('spending.index'))
