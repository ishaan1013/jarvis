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

    for i in range(400):
        # for i in range(5):
        print(i)
        # await sio.emit('translate', {"id": "porsche", "x": 0.001, "y": 0.001})
        # await sio.emit('translate', {"id": "porsche", "x": 0.2, "y": 0.4})
        await sio.emit('rotate', {"id": "porsche", "x": 0.03, "y": 0.03, "z": 0.03})
        # await sio.emit('log', "id: porsche")
        await sio.sleep(0.01)
        # await sio.sleep(1)

app.router.add_get('/menu', menuHandler)

if __name__ == '__main__':
    web.run_app(app)
