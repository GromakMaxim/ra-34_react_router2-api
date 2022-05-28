const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({json: true}));

let posts = [
    {
        id: "1",
        content: "content1",
        created: Date.now()
    },

    {
        id: "2",
        content: "content2",
        created: Date.now()
    },

    {
        id: "3",
        content: "content3",
        created: Date.now()
    },
];
let nextId = 4;

const router = new Router();

router.get('/posts', async (ctx, next) => {
    ctx.response.body = posts;
});

router.post('/posts', async (ctx, next) => {
    let found = posts.filter((item) => item.id === ctx.request.body.id);
    console.log(found)
    if (found.length === 0) {
        let json = {
            id: ctx.request.body.id,
            content: ctx.request.body.content,
            created: Date.now()
        };

        posts.push(json);
    } else {

    }

    ctx.response.body = posts;

});

router.delete('/posts/:id', async (ctx, next) => {
    const postId = Number(ctx.params.id);
    const index = posts.findIndex(o => o.id === postId);
    if (index !== -1) {
        posts.splice(index, 1);
    }
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));
