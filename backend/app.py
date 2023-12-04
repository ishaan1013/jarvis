from flask import Flask, render_template, Response, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import logging
from sys import stdout

from helpers import emitPointer, emitMode, emitClick, emitMovement

from camera import GestureCamera

app = Flask(__name__)
CORS(app)
app.logger.addHandler(logging.StreamHandler(stdout))
app.config['DEBUG'] = True
sio = SocketIO(app, cors_allowed_origins="*")
Cam = GestureCamera(app, sio, emitPointer, emitMode, emitClick, emitMovement)


@sio.on('trigger')
def trigger(json):
    for i in range(400):
        emitMovement(sio, 'rotate', "goose", 0.03, 0.03, 0.06)
        # emitPointer(sio, 0.001, 0.001)
        sio.sleep(0.01)


@app.route("/test")
def test():
    return {
        "test": True,
    }


if __name__ == '__main__':
    sio.run(app, debug=True, port=8000)
