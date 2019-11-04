import inject

from flask import render_template, Blueprint, jsonify, g

from spending_app.infrastructure.web import *
from spending_app.infrastructure.auth import login_required
from spending_app.bussiness.auth_service import AuthService
from spending_app.bussiness.user_config_service import UserConfigService

mod = Blueprint('user-config', __name__)

auth_service = inject.instance(AuthService)
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
    user_config = user_config_service.get(get_user_config())

    return jsonify(status=True, config=user_config.to_dict())

@mod.route('/set', methods=['POST'])
@login_required
def set():
    user_config = user_config_service.get(get_user_config())

    user_config.default_page_fast_spending = True

    set_user_config(user_config.to_dict())
    return jsonify(status=True)


@mod.route('/clear', methods=['POST'])
@login_required
def clear():
    user_config = user_config_service.get(get_user_config())

    user_config.default_page_fast_spending = False

    set_user_config(user_config.to_dict())
    return jsonify(status=True)


@mod.route('/delete', methods=['POST'])
@login_required
def delete():
    set_user_config(None)
    return jsonify(status=True)
