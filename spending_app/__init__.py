from flask import Flask
from spending_app.views.auth import auth
from spending_app.views.spending import main

app = Flask(__name__)

app.secret_key = b'\xd4"\x86\x89\x1f\xdd0\x85A\x18\xed\x8a\x1b\xda\xe9\xf8\x16j\x84\xcd\xa8y=v'

app.register_blueprint(main)
app.register_blueprint(auth, url_prefix='/auth')

