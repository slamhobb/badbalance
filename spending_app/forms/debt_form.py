from spending_app.forms.base_form import BaseForm
from wtforms import DateField, StringField, IntegerField
from wtforms.validators import DataRequired


class DebtItemForm(BaseForm):
    id = IntegerField('id')
    debt_id = IntegerField('debt_id', [DataRequired()])
    date = DateField('Дата', [DataRequired()])
    sum = IntegerField('Сумма', [DataRequired()])
    text = StringField('Описание', [DataRequired()])


class CreateDebtForm(BaseForm):
    name = StringField('Название', [DataRequired()])


class DeleteDebtForm(BaseForm):
    id = IntegerField('id', [DataRequired()])


class DeleteDebtItemForm(BaseForm):
    id = IntegerField('id', [DataRequired()])
    debt_id = IntegerField('debt_id', [DataRequired()])
