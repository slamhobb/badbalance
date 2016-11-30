import inject

from functools import wraps

from flask import render_template, redirect, url_for, g, jsonify, request, Blueprint

from spending_app.infrastructure.web import *
from spending_app.bussiness.auth import AuthService
from spending_app.bussiness.spending import SpendingService
from spending_app.domain.category import Category
from spending_app.forms.spending import CategoryForm

mod = Blueprint('category', __name__)

auth_service = inject.instance(AuthService)
spending_service = inject.instance(SpendingService)


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
    return render_template('category/index.html', form=CategoryForm())


@mod.route('/get_list', methods=['GET'])
@login_required
def get_list():
    user_id = g.user_context.user_id

    res = spending_service.get_category_list(user_id)
    res = [r.to_primitive() for r in res]

    return jsonify(categories=res)


@mod.route('/save', methods=['POST'])
@login_required
def save():
    form = CategoryForm()

    category = Category(form.data)
    category.user_id = g.user_context.user_id

    spending_service.save_category(category)

    return jsonify(status=True)


@mod.route('/delete', methods=['POST'])
def remove():
    user_id = g.user_context.user_id

    id = request.get_json()['id']

    spending_service.delete_category(id, user_id)

    return jsonify(status=True)
