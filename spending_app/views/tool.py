import inject

from flask import Blueprint, jsonify
from spending_app.dao.tool.tool_dao import ToolDao
from spending_app.dao.auth.auth_token_dao import AuthTokenDao

mod = Blueprint('tool', __name__)

tool_dao = inject.instance(ToolDao)
auth_token_dao = inject.instance(AuthTokenDao)


@mod.route('/vacuum')
def vacuum():
    tool_dao.vacuum()

    return jsonify(status=True)


@mod.route('/analyze')
def analyze():
    tool_dao.analyze()

    return jsonify(status=True)


@mod.route('/reindex')
def reindex():
    tool_dao.reindex()

    return jsonify(status=True)


@mod.route('/deleteSessions')
def delete_sessions():
    auth_token_dao.delete_all()

    return jsonify(status=True)
