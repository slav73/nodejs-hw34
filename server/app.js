const Koa = require("koa");
const app = new Koa();
const static = require("koa-static");
const router = require("./routes");

app.use(static("./public"));

const Pug = require("koa-pug");

const pug = new Pug({
  viewPath: "./views",
  pretty: false,
  basedir: "path/for/pug/extends",
  noCache: true,
  app: app // equals to pug.use(app) and app.use(pug.middleware)
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
