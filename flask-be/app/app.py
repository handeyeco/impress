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

@app.route('/api/piece/delete/<id>', methods=['POST'])
def piece_delete(id):
    piece = Piece.query.get(id)
    db.session.delete(piece)
    db.session.commit()

    upload = app.config['UPLOAD_FOLDER']
    file_list = [f for f in os.listdir(upload)]
    for f in file_list:
        if id == f.split('_')[0]:
            os.remove(os.path.join(upload, f))

    pieces = Piece.query.all()
    pieces = [i.dict() for i in pieces]
    return jsonify(pieces)

@app.route('/api/piece/edit/<id>', methods=['POST'])
def piece_edit(id):
    p = Piece.query.get(id)

    # Grab params from request
    p.title           = request.form['title']
    p.year_started    = request.form['year_started']
    p.year_completed  = request.form['year_completed']
    p.artist          = request.form['artist']
    p.born            = request.form['born']
    p.died            = request.form['died']
    p.museum          = request.form['museum']
    p.museum_link     = request.form['museum_link']
    p.description     = request.form['description']

    db.session.commit()

    pieces = Piece.query.all()
    pieces = [i.dict() for i in pieces]
    return jsonify(pieces)

@app.route('/api/piece/image/<id>', methods=['POST'])
def piece_image(id):
    piece = Piece.query.get(id)
    image = request.files['image']

    # Delete old image from record
    upload = app.config['UPLOAD_FOLDER']
    file_list = [f for f in os.listdir(upload)]
    for f in file_list:
        if id == f.split('_')[0]:
            os.remove(os.path.join(upload, f))

    # Save the new image and a new thumbnail image
    hr_image, small_image = save_image(image, piece.id, upload)
    piece.hr_image, piece.small_image = url_for('static', filename='uploads/{}'.format(hr_image)), url_for('static', filename='uploads/{}'.format(small_image))
    #
    # Once we have the filenames for the images, save them to the db
    db.session.commit()

    # Grab a list of all the pieces
    # Create a list of dicts of the piece information
    # And return that list as a JSON object
    pieces = Piece.query.all()
    pieces = [i.dict() for i in pieces]
    return jsonify(pieces)

@app.route('/api/pieces')
def pieces():
    pieces = Piece.query.all()
    pieces = [i.dict() for i in pieces]
    return jsonify(pieces)

@app.route('/api/pieces/add', methods=['POST'])
def pieces_add():
    # Grab params from request
    title           = request.form['title']
    year_started    = request.form['year_started']
    year_completed  = request.form['year_completed']
    artist          = request.form['artist']
    born            = request.form['born']
    died            = request.form['died']
    museum          = request.form['museum']
    museum_link     = request.form['museum_link']
    description     = request.form['description']
    image           = request.files['image']

    # Create a new Piece object and save it to the db
    piece = Piece(title, year_started, year_completed, artist, born, died, museum, museum_link, description)
    db.session.add(piece)
    db.session.commit()

    # Once we have the Piece ID, save the image and a thumbnail image
    hr_image, small_image = save_image(image, piece.id, app.config['UPLOAD_FOLDER'])
    piece.hr_image, piece.small_image = url_for('static', filename='uploads/{}'.format(hr_image)), url_for('static', filename='uploads/{}'.format(small_image))

    # Once we have the filenames for the images, save them to the db
    db.session.commit()

    # Grab a list of all the pieces
    # Create a list of dicts of the piece information
    # And return that list as a JSON object
    pieces = Piece.query.all()
    pieces = [i.dict() for i in pieces]
    return jsonify(pieces)

@app.route('/init')
def init():
    # Reinitialize databases
    db.drop_all()
    db.create_all()

    # Delete ALL files from upload directory
    upload = app.config['UPLOAD_FOLDER']
    file_list = [f for f in os.listdir(upload)]
    for f in file_list:
        os.remove(os.path.join(upload, f))

    # Create new admin user
    users = User.query.all()
    if len(users) == 0:
        password = pwd_context.hash('admin')
        admin = User('admin', password)
        db.session.add(admin)
        db.session.commit()

    return redirect('/')

if __name__ == '__main__':
    app.run()
