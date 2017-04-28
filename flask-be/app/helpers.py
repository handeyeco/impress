import re

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
