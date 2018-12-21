const db = require("../models/db");
const validation = require("../libs/validation_products");
const _path = require("path");
const fs = require("fs");
const util = require("util");
const rename = util.promisify(fs.rename);
const unlink = util.promisify(fs.unlink);

module.exports.index = async ctx => {
  const products = db.getState().products || [];
  const skills = db.getState().skills || [];

  ctx.render("pages/index", { items: products, skill: skills });
};

module.exports.login = async ctx => {
  ctx.render("pages/login");
};

module.exports.admin = async ctx => {
  ctx.render("pages/admin");
};

module.exports.uploadProduct = async ctx => {
  console.log("controller connected");
  const { name: ware, price, photo } = ctx.request.body;

  //вот здесь не получается добраться до ctx.request.files.photo
  //const { name, size, path } = ctx.request.files.photo;
  console.log(ctx.request.files);

  //соответственно, дальнейшая валидация не получается - поскольку непонятно, какие параметры передавать на валидацию

  //   const valid = validation_products(ware, price, 200, 100);
  //   if (valid) {
  //     await unlink(path);
  //     ctx.body = valid;
  //   }
  let fileName = _path.join(
    process.cwd(),
    "public",
    "./assets/img/products",
    photo
  );
  console.log(fileName);

  //const errUpload = await rename(path, fileName);
  //   if (errUpload) {
  //     return (ctx.body = {
  //       mes: "При работе с картинкой произошла ошибка на сервере",
  //       status: "Error"
  //     });
  //   }
  db.get("products")
    .push({
      src: _path.join("./assets/img/products", photo),
      name: ware,
      price: price
    })
    .write();
  ctx.body = {
    mes: "Проект успешно добавлен",
    status: "OK"
  };
};
