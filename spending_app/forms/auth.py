from flask_wtf import Form
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email


class LoginForm(Form):
    login = StringField('login', [DataRequired(), Email()])
    password = PasswordField('password', [DataRequired()])
