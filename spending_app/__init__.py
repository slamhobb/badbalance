from flask import Flask
from spending_app import dependency_injection
from spending_app.views.auth import mod as auth
from spending_app.views.spending import mod as spending
from spending_app.views.registration import mod as registration
from spending_app.views.redirect import mod as redirect

app = Flask(__name__)
app.secret_key = b'O\xe4\x0e\xcd\xf4\xb4\xa9\xa1\x17\xb9@\xd7\x89\x90xD_B\xc71~<T\xc2'

app.register_blueprint(spending, url_prefix='/spending')
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(registration, url_prefix='/registration')
app.register_blueprint(redirect, url_prefix='/redirect')
