from flask_wtf import Form
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email


class RegistrationForm(Form):
    login = StringField('Логин', [DataRequired(), Email()])
    password = PasswordField('Пароль', [DataRequired()])
