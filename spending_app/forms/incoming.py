from spending_app.forms.baseForm import BaseForm
from wtforms import DateField, IntegerField, StringField
from wtforms.validators import DataRequired


class IncomingForm(BaseForm):
    id = IntegerField('Id')
    date = DateField('Дата', [DataRequired()])
    sum = IntegerField('Сумма', [DataRequired()])
    text = StringField('Описание', [DataRequired()])
