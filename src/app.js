const express = require("express");
const app = express();
const PATH = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/img", express.static(PATH.join(__dirname, "./public/img")));

const db = require("../models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({message: "Hello World"});
});

require("../routes/product.route")(app);
require("../routes/order.route")(app);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
