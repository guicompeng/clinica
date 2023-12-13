const { pool } = require("../functions/db");
const jwt = require("jsonwebtoken");
const ONE_YEAR = 31536000000;

/**
 * @swagger
 * /authentication:
 *  post:
 *    summary: Faz login (Funcionario)
 *    tags:
 *      - Authentication
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - email
 *              - password
 *            example:
 *              email: a@gmail.com
 *              password: "123456"
 *    responses:
 *      "200":
 *        description: OK
 */
const login = async (req, res) => {
	var pessoa = (await pool.query("SELECT * FROM Pessoa WHERE email = $1", [req.body.email])).rows[0];
	if (!pessoa) {
		return res.status(400).json({ msg: "Email inválido" });
	}
	var funcionario = (await pool.query("SELECT * FROM Funcionario WHERE Codigo = $1 AND SenhaHash = $2", [pessoa.codigo, req.body.password])).rows[0];
	if (!funcionario) {
		return res.status(400).json({ msg: "Senha inválida" });
	}
	var medico = (await pool.query("SELECT * FROM Medico WHERE Codigo = $1", [pessoa.codigo])).rows[0];

	jwt.sign({ codigo: funcionario.codigo }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN }, (err, token) => {
		return res.cookie("jwt", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none"
		}).cookie("isLogged", true, {
			maxAge: ONE_YEAR,
			sameSite: "strict"
		}).cookie("isDoctor", medico ? true : false, {
			maxAge: ONE_YEAR,
			sameSite: "strict"
		}).json({ token: token });
	});
};

/**
 * @swagger
 * /authentication:
 *  delete:
 *    summary: Faz logout (Funcionario)
 *    tags:
 *      - Authentication
 *    responses:
 *      "204":
 *        description: No Content
 */
const logout = async (req, res) => {
	return res.clearCookie("jwt").sendStatus(204);
};

module.exports = {
	login,
	logout
};
