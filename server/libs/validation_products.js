module.exports = (ware, price, photo, size) => {
  let response;

  if (photo === "" || size === 0) {
    response = {
      mes: "Не загружена картинка",
      status: "Error"
    };
  }

  if (price === "") {
    response = {
      mes: "Не указана цена товара",
      status: "Error"
    };
  }

  if (ware === "") {
    response = {
      mes: "Не указано название товара",
      status: "Error"
    };
  }

  return response;
};
