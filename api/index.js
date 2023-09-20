const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());

// connecting to the mongodb
mongoose
  .connect(
    "mongodb+srv://vikasvpattar18:quadb@cluster0.rfulgnb.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.log(err);
  });

// creating a Schema in mongodb
const datSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  last: {
    type: String,
  },
  buy: {
    type: String,
  },
  sell: {
    type: String,
  },
  volume: {
    type: String,
  },
  base_unit: {
    type: String,
  },
});

// creating the collection in mongodb
const Data = mongoose.model("data", datSchema);

let response = {};
// This function will fetch the data from api and stores the data in database
async function getData() {
  // apiData will fetch the data from api
  const apiData = await fetch("https://api.wazirx.com/api/v2/tickers");

  // response will hold the apiData and converts it into json form
  response = await apiData.json();

  // to take only ten inputs I have used form in loop
  let count = 0;
  for (const key in response) {
    if (count < 10) {
      // it saves the data in db
      const saveData = new Data({
        name: response[key].name,
        last: response[key].last,
        buy: response[key].buy,
        sell: response[key].sell,
        volume: response[key].volume,
        base_unit: response[key].base_unit,
      });
      saveData.save();
    }
    count++;
  }
}
getData();

// this will serve the data to frontend
app.get("/api", async (req, res) => {
  try {
    const crypto = await Data.find({});
    res.send(crypto);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(4000, () => {
  console.log("server started");
});
