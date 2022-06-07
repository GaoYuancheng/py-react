import requests
import json
from flask import request
import uuid
import os

UPLOAD_PATH = 'uploadFiles'


def getFile():
    '''
        @params file 文件
    '''
    if 'file' not in request.files:
        return json.dumps({'success': False})
    print(request.files['file'])
    files = request.files.getlist('file')
    for file in files:
        filename = random_filename(file.filename)
        file.save(os.path.join(UPLOAD_PATH, filename))
    return json.dumps({'success': True}, ensure_ascii=False)


def random_filename(filename):
    ext = os.path.splitext(filename)[1]
    new_filename = uuid.uuid4().hex + ext
    return new_filename

# if __name__ == "__main__":
