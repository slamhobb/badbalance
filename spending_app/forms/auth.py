from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import DataRequired, Email


class LoginForm(FlaskForm):
    login = StringField('Логин', [DataRequired(), Email()])
    password = PasswordField('Пароль', [DataRequired()])
    remember_me = BooleanField('Запомнить меня')
