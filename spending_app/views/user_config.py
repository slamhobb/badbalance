import inject

from flask import render_template, Blueprint, jsonify, g, request

from spending_app.infrastructure.web import *
from spending_app.infrastructure.auth import login_required
from spending_app.bussiness.auth_service import AuthService
from spending_app.bussiness.cookie_config_service import CookieConfigService
from spending_app.bussiness.user_config_service import UserConfigService

mod = Blueprint('user-config', __name__)

auth_service = inject.instance(AuthService)
cookie_config_service = inject.instance(CookieConfigService)
user_config_service = inject.instance(UserConfigService)


@mod.before_request
def add_user_context():
    g.user_context = auth_service.get_user_context(get_token())


@mod.route('/')
@login_required
def index():
    return render_template('user_config/index.html')


@mod.route('/get')
@login_required
def get():
    user_id = g.user_context.user_id

    cookie_config = cookie_config_service.get(get_user_config())

    user_config = user_config_service.get(user_id)

    return jsonify(status=True,
                   cookie_config=cookie_config.to_dict(),
                   user_config=user_config.to_web_dict())


@mod.route('/save-separate-category', methods=['POST'])
@login_required
def save_separate_category():
    user_id = g.user_context.user_id

    user_config = user_config_service.get(user_id)
    user_config.separate_category_ids = request.json['separate_category_ids']
    user_config_service.save(user_config)

    return jsonify(status=True)


@mod.route('/save-spending-goal', methods=['POST'])
@login_required
def save_spending_goal():
    user_id = g.user_context.user_id

    user_config = user_config_service.get(user_id)
    user_config.spending_goal = request.json['spending_goal']
    user_config_service.save(user_config)

    return jsonify(status=True)


@mod.route('/set-default-fast-spending', methods=['POST'])
@login_required
def set_default_fast_spending():
    user_config = cookie_config_service.get(get_user_config())

    user_config.default_page_fast_spending = True

    set_user_config(user_config.to_dict())
    return jsonify(status=True)


@mod.route('/clear-default-fast-spending', methods=['POST'])
@login_required
def clear_default_fast_spending():
    user_config = cookie_config_service.get(get_user_config())

    user_config.default_page_fast_spending = False

    set_user_config(user_config.to_dict())
    return jsonify(status=True)


@mod.route('/delete-cookie-config', methods=['POST'])
@login_required
def delete_cookie_config():
    set_user_config(None)
    return jsonify(status=True)



