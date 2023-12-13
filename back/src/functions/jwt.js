const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

	var token = req.cookies.jwt; // get token from cookie
	if (!token) { // if hasn't token from cookie, get from authorization header
		const header = req.headers["authorization"];
		if (typeof header !== "undefined") {
			const bearer = header.split(" ");
			token = bearer[1];
		} else return res.status(401).json({ msg: "Por favor, faça login" });
	}
	jwt.verify(token, process.env.TOKEN_SECRET, (err, jwtData) => {
		if (err) res.status(401).json({ msg: "Por favor, faça login" });
		else {
			req.token = token;
			req.jwtData = jwtData;
			next();
		}
	});
};

module.exports = {
	auth
};
