const db = require("../data/db_config");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await db("todos");
    if (data) {
        res.status(200).send(data);
    }
});

router.post("/", async (req, res) => {
    console.log(req.body);
    const data = await db("todos").insert({
        name: req.body.name,
        created_at: req.body.created_at,
    });
    if (data) {
        res.status(200).send(req.body);
    }
});

module.exports = router;
