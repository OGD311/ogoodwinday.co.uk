from flask import Flask, render_template, stream_template
import github as gh
from dateutil import parser

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/projects")
def projects():
    return stream_template("projects.html", repos=gh.get_user_repositories('OGD311'), get_language_color=gh.get_language_color)

@app.template_filter('string_to_datetime')
def string_to_datetime(s):
    return parser.isoparse(s)

@app.route("/socials")
def socials():
    return render_template("socials.html")

if __name__ == "__main__": 
    app.run(debug=True, port="2020")
