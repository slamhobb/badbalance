from functools import wraps

from flask import render_template, session, request, Blueprint,\
    flash, redirect, url_for, jsonify, make_response, g

from spending_app import config
from spending_app.bussiness.spending import SpendingService
from spending_app.bussiness.auth import AuthService
from spending_app.domain.spending import Spending
from spending_app.forms.spending import SpendingForm

mod = Blueprint('spending', __name__)

auth_service = AuthService()
spending_service = SpendingService()


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_context = getattr(g, 'user_context', None)
        if user_context is None:
            return redirect(url_for('auth.login_page', next=request.url))
        return f(*args, **kwargs)
    return decorated_function


@mod.before_request
def add_user_context():
    token_name = config.AUTH_TOKEN_NAME
    if token_name in session:
        g.user_context = auth_service.get_user_context(session[token_name])


@mod.route('/need_login')
def need_login():
    return 'Необходима аутентификация'


@mod.route('/')
@login_required
def index():
    return render_template('spending/index.html', form=SpendingForm())


@mod.route('/list')
@login_required
def spending_list():
    data = spending_service.get_list_by_user(g.user_context.user_id)
    return render_template('spending/spending_table.html', spending_list=data)


@mod.route('/add', methods=['POST'])
@login_required
def add_spending():
    form = SpendingForm(request.form)

    if not form.validate_on_submit():
        return make_response()

    spending = Spending(form.data)
    spending.user_id = g.user_context.user_id

    spending_service.save(spending)

    return make_response()
