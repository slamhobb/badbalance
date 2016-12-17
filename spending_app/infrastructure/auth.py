from functools import wraps
from flask import g, redirect, url_for


class UserContext:
    def __init__(self, user_id, login, is_authenticated):
        self.user_id = user_id
        self.login = login
        self.is_authenticated = is_authenticated


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_context = getattr(g, 'user_context', None)
        if user_context is None or not user_context.is_authenticated:
            return redirect(url_for('redirect.redirect'))
        return f(*args, **kwargs)
    return decorated_function
