const http = require("http");
const { MongoClient } = require("mongodb");
const Db_URL = "mongodb://localhost:27017";
let mongoclient, db;
(async () => {
  mongoclient = new MongoClient(Db_URL);
  await mongoclient.connect((err, client) => {
    db = mongoclient.db("nodejs");
  });
})();
http
  .createServer((req, res) => {
    const { url } = req;
    let method = req.method.toLowerCase();

    switch (url) {
      case "/users/list":
        if (method == "get") {
          db.collection("users")
            .find({})
            .toArray((error, result) => {
              if (!error) return res.write(JSON.stringify(result));
              return res.end("Error for some error");
            });
        }
        break;
      default:
        break;
    }
  })
  .listen(2500, () => {
    console.log("http://localhost:2500");
  });
