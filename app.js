const express = require("express");
const app = express();
const config = require("config");
const path = require("path");
// const fs = require("fs").promises;
const mysql = require("mysql2");
const PORT = process.env.PORT || config.get("port")
const bodyParser = require("body-parser");


app.use(express.json({ extended: true }));
app.use(bodyParser.text());


async function start() {

   try {

      const pool = mysql.createPool({
         connectionLimit: config.get('connectionLimit'),
         host: config.get('host'),
         user: config.get('user'),
         database: config.get('database'),
         password: config.get('password'),
         dateStrings: true
      })

      app.use('/', require('./routes/post.routes')(pool));

      if (process.env.NODE_ENV === "production") {
         app.use("/", express.static(path.join(__dirname, "client", "build")))

         app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
         })
      }


   } catch (e) {
      ('server error', e.message);
      process.exit(1);
   }

   app.listen(PORT, () => (`app has been started on port ${PORT}`));

}

start()


