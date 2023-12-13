var express = require("express");
var router = express.Router();

router.use(require("./routes/authentication"));
router.use(require("./routes/restricted"));
router.use(require("./routes/public"));

module.exports = router;
