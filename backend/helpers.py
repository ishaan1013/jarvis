from flask_socketio import SocketIO


def emitPointer(sio: SocketIO, x: float, y: float):
    # ('pointer', {"x": x, "y": y})
    # print("EMITTING pointer", {"x": x, "y": y})
    sio.emit('pointer', {"x": x, "y": y})


def emitMode(sio: SocketIO, mode: str, start: bool):
    sio.emit('mode', {"mode": mode, "start": start})


def emitClick(sio: SocketIO):
    sio.emit('click')


def emitMovement(sio: SocketIO, type: str, object: str, x: float, y: float, z: float):
    sio.emit(type, {"id": object, "x": x, "y": y, "z": z})
