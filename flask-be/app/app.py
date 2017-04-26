from flask import Flask, render_template, request
from helpers import acceptable_chars

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello Universe!'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username'].strip()
        password = request.form['password'].strip()
        error = None

        if not username or not password:
            error = 'Username and password are required'
        elif len(username) > 16 or len(password) > 16:
            error = 'Username and password cannot exceed 16 characters'
        elif not acceptable_chars(username) or not acceptable_chars(password):
            error = 'Username and password must consist of letters, numbers, and special characters: $#_.'

        if error:
            return render_template('login.html', error=error)
        else:
            return 'You\'re logged in!'

    return render_template('login.html')

if __name__ == '__main__':
    app.run()
