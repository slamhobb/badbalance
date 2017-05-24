from baseForm import BaseForm
from wtforms import DateField, DecimalField, StringField, IntegerField
from wtforms.validators import DataRequired


class SpendingForm(BaseForm):
    id = IntegerField('Id')
    date = DateField('Дата', [DataRequired()])
    sum = DecimalField('Сумма', [DataRequired()])
    text = StringField('Описание')
    category_id = IntegerField('Категория', [DataRequired()])


class CategoryForm(BaseForm):
    id = IntegerField('Id')
    name = StringField('Название', [DataRequired()])
