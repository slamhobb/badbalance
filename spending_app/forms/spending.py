from flask_wtf import Form
from wtforms import DateField, DecimalField, StringField
from wtforms.validators import DataRequired


class SpendingForm(Form):
    date = DateField('Дата', [DataRequired()])
    sum = DecimalField('Сумма', [DataRequired()])
    text = StringField('Описание')
    category = StringField('Категория', [DataRequired()])
