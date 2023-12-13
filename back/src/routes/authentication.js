const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");
const { auth } = require("../functions/jwt");
const { checkValidationResult } = require("../functions/validations");
const { body } = require("express-validator");

// Do login
router.post(
	"/authentication",
	[
		body("email").isEmail().normalizeEmail(),
		body("password").isLength({ min: 3 }),
		checkValidationResult,
	],
	authentication.login
);

router.delete(
	"/authentication",
	auth,
	authentication.logout
);

module.exports = router;
