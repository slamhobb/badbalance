import locale
locale.setlocale(locale.LC_ALL, "ru_RU.UTF-8")

from .dependency_injection import configure_inject
configure_inject()

from flask import Flask
from flask_wtf.csrf import CSRFProtect

from spending_app import config
from spending_app.views.auth import mod as auth
from spending_app.views.spending import mod as spending
from spending_app.views.statistic import mod as statistic
from spending_app.views.registration import mod as registration
from spending_app.views.redirect import mod as redirect
from spending_app.views.category import mod as category
from spending_app.views.incoming import mod as incoming
from spending_app.views.debt import mod as debt
from spending_app.views.tool import mod as tool
from spending_app.views.user_config import mod as user_config
from spending_app.views.cooperative_spending import mod as cooperative_spending


def create_app():
    app = Flask(__name__)
    csrf = CSRFProtect()
    csrf.init_app(app)

    app.secret_key = config.SECRET_KEY

    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(registration)
    app.register_blueprint(redirect, url_prefix='/redirect')
    app.register_blueprint(spending, url_prefix='/spending')
    app.register_blueprint(statistic, url_prefix='/statistic')
    app.register_blueprint(category, url_prefix='/category')
    app.register_blueprint(incoming, url_prefix='/incoming')
    app.register_blueprint(debt, url_prefix='/debt')
    app.register_blueprint(tool, url_prefix='/tool')
    app.register_blueprint(user_config, url_prefix='/user-config')
    app.register_blueprint(cooperative_spending, url_prefix='/cooperative-spending')

    return app
