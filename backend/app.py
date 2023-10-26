from aiohttp import web
import socketio

sio = socketio.AsyncServer(cors_allowed_origins='*')
app = web.Application()
sio.attach(app)

# we can define aiohttp endpoints just as we normally would with no change


# async def index(request):
#     with open('index.html') as f:
#         return web.Response(text=f.read(), content_type='text/html')


@sio.on('trigger')
async def trigger(sid, message):
    print("Socket ID: ", sid)

    # emit 20 messages with 50ms between each

    for i in range(20):
        await sio.emit('log', "log "+str(i))
        await sio.sleep(0.05)

# app.router.add_get('/', index)

if __name__ == '__main__':
    web.run_app(app)
