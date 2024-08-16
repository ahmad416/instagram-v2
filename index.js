import express from "express";
import open from "open";


const app = express();

app.get("/", async (req, res) => {
    await open("https://google.com");
});

app.get("/health-check", (req, res) => {
    res.send("OK");
});

app.listen(10000, () => {
    console.log(`listening on port 10000`);
});