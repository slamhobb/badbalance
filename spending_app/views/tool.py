import inject

from flask import Blueprint, jsonify
from spending_app.dao.tool.tool_dao import ToolDao

mod = Blueprint('tool', __name__)

tool_dao = inject.instance(ToolDao)


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
