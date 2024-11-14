#!/usr/bin/env python3
"""4-app
Flask App translated in other language using babel.
"""

from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """Class configuration for language & timezone"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False

babel = Babel(app)


@babel.localeselector
def get_locale():
    """Selects language requested by client or default language"""
    lang = request.args.get('locale')
    if lang in app.config['LANGUAGES']:
        return lang
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """Default route"""
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run(debug=True)
