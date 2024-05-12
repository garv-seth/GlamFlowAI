from flask import Flask
from werkzeug.wrappers import Request, Response

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello from Flask!'

@app.route('/api')
def api():
    return 'Hello from Flask API!'

if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 5000, app)
