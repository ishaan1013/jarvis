from flask_socketio import SocketIO


def emitPointer(sio: SocketIO, x: float, y: float, z: float):
    sio.emit('pointer', {"x": x, "y": y, "z": z})


def emitMode(sio: SocketIO, mode: str | None):
    sio.emit(
        'mode', {"mode": mode if mode is not None else "none"})


def emitClick(sio: SocketIO):
    sio.emit('click')


def emitMovement(sio: SocketIO, type: str, object: str, x: float, y: float, z: float):
    sio.emit(type, {"id": object, "x": x, "y": y, "z": z})
