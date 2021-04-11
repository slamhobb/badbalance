from os import path
from base64 import b64decode
from json import load

_basedir = path.abspath(path.dirname(__file__))

_config_path = path.join(_basedir, '..', '..', 'badbalance-cfg', 'config.json')


def _get_config():
    with open(_config_path, 'r') as f:
        return load(f)


config = _get_config()

DATA_BASE_CONNECTION_STRING = config['DATA_BASE_PATH']
AUTH_TOKEN_NAME = config['AUTH_TOKEN_NAME']
SECRET_KEY = b64decode(config["SECRET_KEY_BASE64"].encode())
