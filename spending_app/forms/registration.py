from spending_app.forms.base_form import BaseForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email


class RegistrationForm(BaseForm):
    login = StringField('Логин', [DataRequired(), Email()])
    password = PasswordField('Пароль', [DataRequired()])
