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
        id: "633d9312-816c-4bdf-a2fc-8e4127785253",
        content: "content1",
        created: Date.now()
    },

    {
        id: "633d9312-816c-4bdf-a2fc-8e4667785211",
        content: "content2",
        created: Date.now()
    },

    {
        id: "633d9312-816c-4bdf-a2fc-8e4667785255",
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
    let found = posts.filter((item) => item.id !== ctx.request.body.id);
    let json = {
        id: ctx.request.body.id,
        content: ctx.request.body.content,
        created: Date.now()
    };

    found.push(json);
    posts = found;
    ctx.response.body = posts;

});

router.delete('/posts/:id', async (ctx, next) => {
    let found = posts.filter((item)=> item.id !== ctx.params.id)
    posts = found;
    ctx.response.body = posts;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));
