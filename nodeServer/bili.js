const request = require("axios");
// console.log(request);

const headers = {
  "User-Agent": "bilibili Security Browser",
  cookie: `session=eyJ1aWQiOiIxMjgwODY5OSJ9.X5Q08w.bO3_sgoMaJH5zb8tSq-QEOlkwHg`,
};

//2dfdb6e7-1f245463-d597fa59-2ab07ad1
// request
//   .get("http://45.113.201.36/api/ctf/2", {
//     headers,
//   })
//   .then((data) => console.log(data));

request("http://45.113.201.36/api/ctf/2", {
  method: "get",
  headers,
}).then(function (response) {
  console.log(response.data);
});
