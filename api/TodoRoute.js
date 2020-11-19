const db = require("../data/db_config");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const data = await db("todos");
    try {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send("There are no todos");
        }
    } catch (err) {
        console.log(err);
    }
});

router.post("/", async (req, res) => {
    const data = await db("todos").insert({
        name: req.body.name,
        created_at: req.body.created_at,
        completed: req.body.completed,
    });
    req.body.id = data[0];
    if (data) {
        res.status(200).send(req.body);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const data = await db("todos").where({ id }).del();
    if (data) {
        res.status(200).send(req.body);
    }
});

router.put("/:id/toggleComplete/:complete", async (req, res) => {
    const { id, complete } = req.params;
    const data = await db("todos")
        .where({ id })
        .update({ completed: complete });
    const updated_todo = await db("todos").where({ id });
    if (data) {
        res.status(200).send(updated_todo);
    }
});

module.exports = router;
