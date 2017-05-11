from app import db
from flask import jsonify

class Piece(db.Model):
    id              = db.Column(db.Integer, primary_key=True)
    title           = db.Column(db.String(120))
    year_started    = db.Column(db.String(10))
    year_completed  = db.Column(db.String(10))
    artist          = db.Column(db.String(120))
    born            = db.Column(db.String(10))
    died            = db.Column(db.String(10))
    museum          = db.Column(db.String(120))
    museum_link     = db.Column(db.String(120))
    image_hr        = db.Column(db.String(120))
    image_1000      = db.Column(db.String(120))
    image_500       = db.Column(db.String(120))
    image_100       = db.Column(db.String(120))
    description     = db.Column(db.Text)

    def dict (self):
        dictionary = {
            'id'              : self.id or '',
            'title'           : self.title or '',
            'year_started'    : self.year_started or '',
            'year_completed'  : self.year_completed or '',
            'artist'          : self.artist or '',
            'born'            : self.born or '',
            'died'            : self.died or '',
            'museum'          : self.museum or '',
            'museum_link'     : self.museum_link or '',
            'image_hr'        : self.image_hr or '',
            'image_1000'      : self.image_1000 or '',
            'image_500'       : self.image_500 or '',
            'image_100'       : self.image_100 or '',
            'description'     : self.description or ''
        }
        return dictionary

    def __init__(self, title, year_started, year_completed, artist, born, died, museum, museum_link, description, image_hr=None, image_1000=None, image_500=None, image_100=None):
        self.title           = title
        self.year_started    = year_started
        self.year_completed  = year_completed
        self.artist          = artist
        self.born            = born
        self.died            = died
        self.museum          = museum
        self.museum_link     = museum_link
        self.description     = description
        self.image_hr        = image_hr
        self.image_1000      = image_1000
        self.image_500       = image_500
        self.image_100       = image_100

    def __repr__(self):
        return '<Piece {} {} by {}>'.format(self.id, self.title, self.artist)


class User(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    username    = db.Column(db.String(20), unique=True)
    password    = db.Column(db.String(120))

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return '<User {} {}>'.format(self.id, self.username)
