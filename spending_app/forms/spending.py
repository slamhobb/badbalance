from flask_wtf import FlaskForm
from wtforms import DateField, DecimalField, StringField, IntegerField
from wtforms.validators import DataRequired


class SpendingForm(FlaskForm):
    id = IntegerField('Id')
    date = DateField('Дата', [DataRequired()])
    sum = DecimalField('Сумма', [DataRequired()])
    text = StringField('Описание')
    category = IntegerField('Категория', [DataRequired()])
