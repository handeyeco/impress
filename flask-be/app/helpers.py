import re

def acceptable_chars(string):
    match = re.search('[^0-9A-Za-z\$\#\_\.]', string)
    return False if match else True
