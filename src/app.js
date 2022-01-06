const express = require("express");
const path = require("path");
const hbs = require("hbs");
const getGeoCode = require("./utils/geocode");
const forCast = require("./utils/forcast");

const app = express();
const port = process.env.PORT || 3000


// Define Path for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Hayder Aly",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page for you only !",
    name: "Jutt Brother",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page in HBS",
    name: "Hayder Aly Jutt Goriya ",
    headerTitle: "Hbs title in partials",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide a location to check weather forecast ...",
    });
  }

  getGeoCode(address, (error, getCodeData) => {
    if (error) {
      return res.send({ error });
    }
    forCast(getCodeData, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        data: forecastData,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term ...",
    });
    return;
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page Not Found",
  });
});


app.listen(port, () => {
  console.log("Server is up to port 3000.");
});
