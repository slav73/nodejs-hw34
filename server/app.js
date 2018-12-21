const Koa = require("koa");
const app = new Koa();
const static = require("koa-static");
const router = require("./routes");
const errorHandler = require("./libs/error");
const fs = require("fs");
const util = require("util");
const _path = require("path");
const rename = util.promisify(fs.rename);
const unlink = util.promisify(fs.unlink);
const config = require("./config/config.json");

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
app.use(errorHandler);
app.on("error", (err, ctx) => {
  log.error("server error", err, ctx);
  ctx.render("error", {
    status: ctx.response.status,
    error: ctx.response.message
  });
});

app.listen(3000, () => {
  if (!fs.existsSync(config.upload)) fs.mkdirSync(config.upload);
});
