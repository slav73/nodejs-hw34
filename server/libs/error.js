module.exports = async (ctx, next) => {
  console.log(ctx.response.message, "error.js");
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = "Something goes wrong: " + err.message;
    console.error(err, "что-то не так с URL");
  }
};
