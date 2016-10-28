import inject

from functools import wraps

from flask import render_template, session, request, Blueprint,\
    flash, redirect, url_for, jsonify, make_response, g

from spending_app.infrastructure.web import *
from spending_app.bussiness.auth import AuthService

mod = Blueprint('statistic', __name__)

auth_service = inject.instance(AuthService)


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


@mod.route('/')
@login_required
def index():
    return render_template('statistic/index.html')

