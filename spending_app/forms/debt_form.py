from spending_app.forms.base_form import BaseForm
from wtforms import DateField, StringField, IntegerField
from wtforms.validators import DataRequired


class CreateDebtForm(BaseForm):
    name = StringField('Название', [DataRequired()])


class DeleteDebtForm(BaseForm):
    id = IntegerField('Id', [DataRequired()])


class DebtItemForm(BaseForm):
    id = IntegerField('Id')
    debt_id = IntegerField('DebtId', [DataRequired()])
    date = DateField('Дата', [DataRequired()])
    sum = IntegerField('Сумма', [DataRequired()])
    text = StringField('Описание', [DataRequired()])


class DeleteDebtItemForm(BaseForm):
    id = IntegerField('Id', [DataRequired()])
    debt_id = IntegerField('DebtId', [DataRequired()])
