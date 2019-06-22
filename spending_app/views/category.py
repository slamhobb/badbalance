import inject

from flask import render_template, g, jsonify, Blueprint

from spending_app.infrastructure.web import *
from spending_app.infrastructure.auth import login_required
from spending_app.bussiness.auth_service import AuthService
from spending_app.bussiness.spending_service import SpendingService
from spending_app.domain.category import Category
from spending_app.forms.spending import CategoryForm, DeleteCategoryForm

mod = Blueprint('category', __name__)

auth_service = inject.instance(AuthService)
spending_service = inject.instance(SpendingService)


@mod.before_request
def add_user_context():
    g.user_context = auth_service.get_user_context(get_token())


@mod.route('/', methods=['GET'])
@login_required
def index():
    return render_template('category/index.html', form=CategoryForm())


@mod.route('/get_list', methods=['GET'])
@login_required
def get_list():
    user_id = g.user_context.user_id

    result = spending_service.get_category_list(user_id)
    result = [r.to_dict() for r in result]

    return jsonify(status=True, categories=result)


@mod.route('/save', methods=['POST'])
@login_required
def save():
    form = CategoryForm()

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    adict = dict(form.data)
    adict['user_id'] = g.user_context.user_id

    category = Category.from_dict(adict)

    id = spending_service.save_category(category)

    return jsonify(status=True, id=id)


@mod.route('/delete', methods=['POST'])
def remove():
    form = DeleteCategoryForm()

    if not form.validate_on_submit():
        return jsonify(status=False, message=form.errors)

    user_id = g.user_context.user_id
    category_id = form.data['id']

    spending_service.delete_category(category_id, user_id)

    return jsonify(status=True)
