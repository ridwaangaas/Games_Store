const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT;
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/pay", async (req, res) => {
  console.log(req.body.token);
  try {
    await Stripe.charges.create({
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "cad",
    });
    res.sendStatus(200); // send HTTP 200 response to client
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // send HTTP 500 response to client
  }
});

app.get("/newapi", async (req, res) => {
  const response = await axios.get(
    "http://store.steampowered.com/api/featuredcategories"
  );
  const originalData = response.data;

  // Extract the items
  let items = originalData.specials.items;

  // Map to the new structure
  let newStructure = await Promise.all(
    items.map(async (item) => {
      // Get the details for this app
      const detailsResponse = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${item.id}&cc=us&l=en`
      );
      const details = detailsResponse.data[item.id].data;

      return {
        _id: item.id,
        title: item.name,
        isNew: !item.discounted,
        oldPrice: (item.original_price / 100).toString(), // convert to dollars
        price: (item.final_price / 100).toString(), // convert to dollars
        description: details.short_description, // get from details
        category: details.type, // get from details
        image: item.large_capsule_image, // or 'small_capsule_image' or 'header_image'
        rating: null, // not available
      };
    })
  );

  res.json(newStructure);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
