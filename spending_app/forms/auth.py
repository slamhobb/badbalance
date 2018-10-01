from spending_app.forms.base_form import BaseForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import DataRequired, Email


class LoginForm(BaseForm):
    login = StringField('Логин', [DataRequired(), Email()])
    password = PasswordField('Пароль', [DataRequired()])
    remember_me = BooleanField('Запомнить меня')
