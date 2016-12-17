import inject

from flask import render_template, Blueprint, g

from spending_app.infrastructure.web import *
from spending_app.infrastructure.auth import login_required
from spending_app.bussiness.auth import AuthService

mod = Blueprint('statistic', __name__)

auth_service = inject.instance(AuthService)


@mod.before_request
def add_user_context():
    g.user_context = auth_service.get_user_context(get_token())


@mod.route('/')
@login_required
def index():
    return render_template('statistic/index.html')

