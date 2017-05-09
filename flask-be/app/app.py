from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from helpers import valid_credentials, save_image
from passlib.apps import custom_app_context as pwd_context
import os

# Create app
app = Flask(__name__)
app.config.from_object('config')
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static/uploads')

# Connect database and import models
db = SQLAlchemy(app)
from models import User, Piece

##########
# ROUTES #
##########
@app.route('/')
def hello():
    return 'Hello Universe!'

@app.route('/api/pieces/add', methods=['POST'])
def pieces_add():
    title           = request.form['title']
    year_started    = request.form['year_started']
    year_completed  = request.form['year_completed']
    artist          = request.form['artist']
    born            = request.form['born']
    died            = request.form['died']
    museum          = request.form['museum']
    museum_link     = request.form['museum_link']
    description     = request.form['description']

    image = request.files['image']

    piece = Piece(title, year_started, year_completed, artist, born, died, museum, museum_link, description)
    db.session.add(piece)
    db.session.commit()

    piece.hr_image, piece.small_image = save_image(image, piece.id, app.config['UPLOAD_FOLDER'])

    db.session.commit()

    print(piece)
    return jsonify({'id': piece.id})

@app.route('/init')
def init():
    db.drop_all()
    db.create_all()
    users = User.query.all()
    if len(users) == 0:
        password = pwd_context.hash('admin')
        admin = User('admin', password)
        db.session.add(admin)
        db.session.commit()

    return redirect('/')

if __name__ == '__main__':
    app.run()
