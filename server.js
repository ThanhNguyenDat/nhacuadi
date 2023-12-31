const path = require("path");

const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`server running on port ${port}`));
