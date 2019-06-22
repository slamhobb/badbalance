from spending_app.forms.base_form import BaseForm
from wtforms import DateField, StringField, IntegerField
from wtforms.validators import DataRequired


class SpendingForm(BaseForm):
    id = IntegerField('Id')
    date = DateField('Дата', [DataRequired()])
    sum = IntegerField('Сумма', [DataRequired()])
    text = StringField('Описание')
    category_id = IntegerField('Категория', [DataRequired()])


class DeleteSpendingForm(BaseForm):
    id = IntegerField('Id')


class CategoryForm(BaseForm):
    id = IntegerField('Id')
    name = StringField('Название', [DataRequired()])


class DeleteCategoryForm(BaseForm):
    id = IntegerField('Id')
