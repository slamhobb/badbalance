from flask import Flask
from spending_app.views.auth import mod as auth
from spending_app.views.spending import mod as main

app = Flask(__name__)
app.secret_key = b'O\xe4\x0e\xcd\xf4\xb4\xa9\xa1\x17\xb9@\xd7\x89\x90xD_B\xc71~<T\xc2'

app.register_blueprint(main)
app.register_blueprint(auth, url_prefix='/auth')

