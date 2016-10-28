from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email


class RegistrationForm(FlaskForm):
    login = StringField('Логин', [DataRequired(), Email()])
    password = PasswordField('Пароль', [DataRequired()])
