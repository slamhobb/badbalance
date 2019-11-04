import inject

from flask import Blueprint, url_for
from flask import redirect as flask_redirect

from spending_app.infrastructure.web import *
from spending_app.bussiness.auth_service import AuthService
from spending_app.bussiness.user_config_service import UserConfigService

mod = Blueprint('redirect', __name__)

auth_service = inject.instance(AuthService)
user_config_service = inject.instance(UserConfigService)


@mod.route('/')
def redirect():
    user_context = auth_service.get_user_context(get_token())
    if not user_context.is_authenticated:
        return flask_redirect(url_for('auth.login_page'))

    user_config = user_config_service.get(get_user_config())
    if user_config.default_page_fast_spending:
        return flask_redirect(url_for('spending.fast'))

    return flask_redirect(url_for('spending.index'))
