from functools import wraps

from flask import render_template, session, request, Blueprint,\
    flash, redirect, url_for, jsonify, make_response, g

from spending_app.config import settings
from spending_app.bussiness.spending import SpendingService
from spending_app.bussiness.auth import AuthService
from spending_app.domain.spending import Spending
from spending_app.forms.spending import SpendingForm

main = Blueprint('spending', __name__)

auth_service = AuthService()
spending_service = SpendingService()


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_context = getattr(g, 'user_context', None)
        if user_context is None:
            return redirect(url_for('.need_login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function


@main.before_request
def add_user_context():
    token_name = settings['token_name']
    if token_name in session:
        g.user_context = auth_service.get_user_context(session[token_name])


@main.route('/need_login')
def need_login():
    return 'Необходима аутентификация'


@main.route('/')
@login_required
def index():
    return render_template('index.html', form=SpendingForm())


@main.route('/list')
@login_required
def spending_list():
    data = spending_service.get_list_by_user(g.user_context.user_id)
    return render_template('spending_table.html', spending_list=data)


@main.route('/add', methods=['POST'])
def add_spending():
    form = SpendingForm(request.form)

    if not form.validate_on_submit():
        return make_response()

    spending = Spending(form.data)
    spending.user_id = g.user_context.user_id

    spending_service.save(spending)

    return make_response()


@main.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            flash('You were logged in')
            return redirect(url_for('show_entries'))
    return render_template('login.html', error=error)


@main.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('You were logged out')
    return redirect(url_for('show_entries'))


@main.route('/get')
def get_cookie():
    print(request.cookies)
    return jsonify(request.cookies)


@main.route('/set')
def set_cookie():
    value = request.args.get('value')
    name = request.args.get('name')

    resp = make_response(jsonify({
        name: value
    }))
    resp.set_cookie(name, value)
    return resp


@main.route('/del')
def del_cookie():
    name = request.args.get('name')
    resp = make_response(jsonify(result=name))
    resp.set_cookie(name, '', expires=0)
    return resp


@main.route('/gets')
def get_session():
    val = session['dimon']
    return jsonify(res=val)


@main.route('/sets')
def set_session():
    value = request.args.get('value')
    name = request.args.get('name')

    session[name] = value
    resp = make_response(jsonify({
        name: value
    }))
    return resp


@main.route('/dels')
def del_session():
    name = request.args.get('name')
    resp = make_response(jsonify(result=name))
    resp.set_cookie(name, '', expires=0)
    return resp
