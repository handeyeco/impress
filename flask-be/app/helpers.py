from PIL import Image
from flask import jsonify, url_for
import re
import os

# Takes a string and makes sure it only contains:
# letters, numbers, and special characters: $ # _ .
# Returns bool
def acceptable_chars(string):
    match = re.search('[^0-9A-Za-z\$\#\_\.]', string)
    return False if match else True

# Takes username and password as strings
# Checks to make sure they follow the credential specifications
# Returns bool and error as a string
def valid_credentials(username, password):
    error = None
    # Verify that username and password inputs are good
    if not username or not password:
        error = 'Username and password are required'
    elif len(username) > 16 or len(password) > 16:
        error = 'Username and password cannot exceed 16 characters'
    elif not acceptable_chars(username) or not acceptable_chars(password):
        error = 'Username and password must consist of letters, numbers, and special characters: $#_.'

    if not error:
        return (True, error)
    return (False, error)

# Helper function for converting pieces to JSON
# Takes a query result set of pieces and an optional sort field
# Returns sorted and jsonified list of dicts
def query_jsonify(query, sort='year_completed'):
    query_list = [i.dict() for i in query]
    query_list = sorted(query_list, key=lambda k: k[sort])
    return jsonify(query_list)

# Save image is going to take away some of the image processing from the route
# Requires image, piece.id, and path to save the images to
# Saves original image and image thumbnail
# Returns filenames for saved files
def save_image(image, id, path):
    filetype = image.filename.split('.').pop()
    filename_list = []

    # Save original ex. "4_original.jpg"
    filename = "{}_hr.{}".format(id, filetype)
    image.save(os.path.join(path, filename))
    filename_list.append(url_for('static', filename='uploads/{}'.format(filename)))

    # Convert image to PIL image
    image = Image.open(image)

    # Create thumbnails in three sizes
    thumbnail_sizes = [1000, 500, 100]
    for size in thumbnail_sizes:
        # Resize image
        image.thumbnail([size, size])
        # Name and save image
        filename = "{}_{}.{}".format(id, size, filetype)
        image.save(os.path.join(path, filename))
        # Add image name to list
        filename_list.append(url_for('static', filename='uploads/{}'.format(filename)))

    # Return filename list
    return filename_list
