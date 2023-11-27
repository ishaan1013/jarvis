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

    for i in range(200):
        # await sio.emit(' log', "message" + str(i))
        await sio.emit('shift', {"x": 2, "y": 1})
        await sio.sleep(0.001)

app.router.add_get('/menu', menuHandler)

if __name__ == '__main__':
    web.run_app(app)
