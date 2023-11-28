from aiohttp import web
import socketio

sio = socketio.AsyncServer(cors_allowed_origins='*')
app = web.Application()
sio.attach(app)


async def menuHandler(request):

    open_param = request.rel_url.query.get('open', 'false')

    if open_param.lower() == 'true':
        await sio.emit('openMenu')
    elif open_param.lower() == 'false':
        await sio.emit('closeMenu')

    res = {"status": "success"}
    return web.json_response(res)


@sio.on('trigger')
async def trigger(sid, message):
    print("Socket ID: ", sid, " at ", str(message))

    for i in range(800):
        # await sio.emit(' log', "message" + str(i))
        await sio.emit('translate', {"id": "goose", "x": 0.001, "y": 0.001})
        await sio.emit('rotate', {"id": "goose", "x": 0.01, "y": 0.01, "z": 0.01})
        await sio.emit('log', "id: goose")
        await sio.sleep(0.01)

app.router.add_get('/menu', menuHandler)

if __name__ == '__main__':
    web.run_app(app)
