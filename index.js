const express = require("express");
const path = require("path");
const weatherController = require("./controllers/weatherController");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/weather", weatherController.getWeather);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
