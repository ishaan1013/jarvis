from flask import Flask, render_template, Response, request, jsonify
from flask_socketio import SocketIO, emit
import logging
from sys import stdout

from main import GestureCamera

app = Flask(__name__)
app.logger.addHandler(logging.StreamHandler(stdout))
app.config['DEBUG'] = True
sio = SocketIO(app, cors_allowed_origins="*")
Cam = GestureCamera()

# helper functions to pass into handRec


async def emitPointer(x: float, y: float):
    await emit('pointer', {"x": x, "y": y})


async def emitMode(mode: str, start: bool):
    await emit('mode', {"mode": mode, "start": start})


async def emitClick():
    await emit('click')


async def emitMovement(type: str, object: str, x: float, y: float, z: float):
    await emit(type, {"id": object, "x": x, "y": y, "z": z})


@sio.on('trigger')
async def trigger(sid, message):
    print("Socket ID: ", sid, " at ", str(message))

    for i in range(400):
        print(i)
        await emit('rotate', {"id": "porsche", "x": 0.03, "y": 0.03, "z": 0.03})
        await sio.sleep(0.01)


@app.route("/test")
def test():
    return {
        "test": True,
    }


if __name__ == '__main__':
    sio.run(app)
