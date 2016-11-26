import inject

from functools import wraps

from flask import render_template, redirect, url_for, g, jsonify, Blueprint

from spending_app.infrastructure.web import *
from spending_app.bussiness.auth import AuthService
from spending_app.bussiness.category import CategoryService

mod = Blueprint('category', __name__)

auth_service = inject.instance(AuthService)
category_service = inject.instance(CategoryService)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_context = getattr(g, 'user_context', None)
        if user_context is None:
            return redirect(url_for('redirect.redirect'))
        return f(*args, **kwargs)
    return decorated_function


@mod.before_request
def add_user_context():
    token = get_token()
    if token is not None:
        g.user_context = auth_service.get_user_context(token)


@mod.route('/', methods=['GET'])
@login_required
def index():
    return render_template('category/index.html')


@mod.route('/get_list', methods=['GET'])
@login_required
def get_list():
    user_id = g.user_context.user_id

    res = category_service.get_category_list(user_id)
    res = [r.to_primitive() for r in res]

    return jsonify(categories=res)
