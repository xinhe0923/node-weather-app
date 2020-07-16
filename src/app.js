const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port=process.env.PORT ||3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs"); //get handlebars set up
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Xinhe Yang",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about Me",
    name: "Xinhe Yang",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    helpText: "Do you need help?",
    name: "Xinhe Yang",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "you need to provide address",
    });
  }

  geocode(address, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longtitude, (error, forecastdata) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send(
        {
          forecast: forecastdata,
          location,
          address
        },
      );
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "xinhe yang",
    message: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "xinhe yang",
    message: "page not found",
  });
});

app.listen(port, () => {
  console.log("server is up on"+port);
}); //startup server, listen specific port
