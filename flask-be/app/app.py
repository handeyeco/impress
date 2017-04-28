from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from helpers import valid_credentials
from passlib.apps import custom_app_context as pwd_context
from flask_jwt import JWT, jwt_required, current_identity

# Create app
app = Flask(__name__)
app.config.from_object('config')
# Connect database
db = SQLAlchemy(app)

##########
# MODELS #
##########
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(120))

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return '<User {}>'.format(self.username)

##################
# AUTHENTICATION #
##################
def authenticate(username, password):
    valid, error = valid_credentials(username, password)
    if valid:
        user = User.query.filter_by(username=username).first()
        if user and pwd_context.verify(password, user.password):
            return user
    return None

def identity(payload):
    user_id = payload['identity']
    return User.query.filter_by(id=user_id).first()

jwt = JWT(app, authenticate, identity)

##########
# ROUTES #
##########
@app.route('/')
def hello():
    return 'Hello Universe!'

@app.route('/admin')
def admin():
    return "Admin Dashboard"

@app.route('/init')
def init():
    users = User.query.all()
    if len(users) == 0:
        password = pwd_context.hash('admin')
        admin = User("admin", password)
        db.session.add(admin)
        db.session.commit()

    return redirect(url_for('admin'))

if __name__ == '__main__':
    app.run()
