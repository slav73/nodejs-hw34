const Router = require("koa-router");
const router = new Router();
const koaBody = require("koa-body");
const controllers = require("../controllers");

router.get("/", controllers.index);

module.exports = router;
