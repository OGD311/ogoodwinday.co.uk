from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/socials")
def socials():
    return render_template("socials.html")

if __name__ == "__main__": 
    app.run(debug=True, port="2020")
