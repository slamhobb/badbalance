from flask import session
from spending_app import config


def set_token(token, permanent):
    session[config.AUTH_TOKEN_NAME] = token
    session.permanent = permanent


def remove_token():
    session.pop(config.AUTH_TOKEN_NAME, None)


def get_token():
    if config.AUTH_TOKEN_NAME in session:
        return session[config.AUTH_TOKEN_NAME]
    return None


def set_user_config(user_config):
    session['userConfig'] = user_config


def get_user_config():
    if 'userConfig' in session:
        return session['userConfig']
    return None
