from spending_app.forms.base_form import BaseForm
from wtforms import DateField, StringField, IntegerField, FieldList, FormField
from wtforms.validators import DataRequired


class CoopSpendingUserForm(BaseForm):
    id = IntegerField('Id пользователя', [DataRequired()])
    name = StringField('Имя пользователя', [DataRequired()])
    avatar = StringField('Название аватара', [DataRequired()])


class CoopSpendingForm(BaseForm):
    id = IntegerField('id')
    name = StringField('Название кооператива', [DataRequired()])
    users = FieldList(FormField(CoopSpendingUserForm), 'Пользователи', [DataRequired()])


class CoopSpendingDebtForm(BaseForm):
    user_id = IntegerField('Идентификатор пользователя должника', [DataRequired()])
    sum = IntegerField('Сумма долга', [DataRequired()])


class CoopSpendingPayForm(BaseForm):
    user_id = IntegerField('Идентификатор оплатившего пользователя')
    sum = IntegerField('Сумма оплаты', [DataRequired()])
    debts = FieldList(FormField(CoopSpendingDebtForm), 'Должники')


class CoopSpendingTransfer(BaseForm):
    from_user_id = IntegerField('Идентификатор пользователя отправителя', [DataRequired()])
    to_user_id = IntegerField('Идентификатор пользователя получателя', [DataRequired()])
    sum = IntegerField('Сумма перевода', [DataRequired()])


class CoopSpendingItemForm(BaseForm):
    id = IntegerField('id')
    coop_spending_id = IntegerField('CoopSpendingId', [DataRequired()])
    date = DateField('Дата', [DataRequired()])
    text = StringField('Описание', [DataRequired()])
    type = StringField('Тип', [DataRequired()])
    pays = FieldList(FormField(CoopSpendingPayForm), 'Оплаты')
    transfers = FieldList(FormField(CoopSpendingTransfer), 'Переводы')
