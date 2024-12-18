#!/usr/bin/env python3
"""0-app
Flask App that that outputs page title and header.
"""

from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def index():
    """Default route"""
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run(debug=True)
