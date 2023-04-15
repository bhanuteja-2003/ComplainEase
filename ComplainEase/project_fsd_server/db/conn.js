const mongoose = require("mongoose");
const DB =
  "mongodb+srv://navaneeth:rsyr3107@cluster0.mlzpebc.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection start to DB"))
  .catch((error) => console.log(error.messsage));
