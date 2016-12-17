import os

_basedir = os.path.abspath(os.path.dirname(__file__))

DATA_BASE_CONNECTION_STRING = os.path.join(_basedir, 'bad_balance.db')

AUTH_TOKEN_NAME = 'bb-auth-token'

SECRET_KEY = b'\x14ov\x1f\xaa\x08C]\xf5o\x13\x0bB\x0e\x8ev\xfd#:\xd3\xc7\xec\xcb\xdf'
