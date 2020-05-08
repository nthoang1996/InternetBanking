var express = require('express');

const router = express.Router();
router.route('/')
    .get(async function(req, res) {
        res.json({ message: "Ok" })

    })

module.exports = router;