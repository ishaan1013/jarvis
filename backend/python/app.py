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
    print("Socket ID: ", sid, " at ", str(message))

    for i in range(200):
        # await sio.emit(' log', "message" + str(i))
        await sio.emit('shift', {"x": 2, "y": 1})
        await sio.sleep(0.001)

# app.router.add_get('/', index)

if __name__ == '__main__':
    web.run_app(app)
