const express = require("express");
const router = express.Router();
const public = require("../controllers/public");
const { checkValidationResult } = require("../functions/validations");
const { body, query } = require("express-validator");
const { isValidDate } = require("../functions/general");
// 3
router.post(
	"/public/enderecos",
	[
		body("CEP").isLength({ min: 8, max: 10 }),
		body("logradouro").isLength({ min: 1, max: 255 }),
		body("bairro").isLength({ min: 1, max: 255 }),
		body("cidade").isLength({ min: 1, max: 255 }),
		body("estado").isLength({ min: 1, max: 255 }),
		checkValidationResult,
	],
	public.novoEndereco
);

// 1.5
router.get(
	"/public/especialidades",
	public.obterEspecialidades
);

// 1.5
router.get(
	"/public/medicos",
	[
		query("especialidade").isLength({ min: 1, max: 255 }),
		checkValidationResult,
	],
	public.obterMedicos
);

// 1.5
router.get(
	"/public/horarios-agendados",
	[
		query("data").custom((value) => isValidDate(value)).withMessage('Data inválida. Formato esperado: YYYY-MM-DD'),
		query("codigoMedico").isInt(),
		checkValidationResult,
	],
	public.obterHorariosAgendados
);

// 1.5
router.post(
	"/public/agendamentos",
	[
		body("data").custom((value) => isValidDate(value)).withMessage('Data inválida. Formato esperado: YYYY-MM-DD'),
		body("horario").isInt({ min: 8, max: 17 }),
		body("nome").isLength({ min: 1, max: 255 }),
		body("email").isLength({ min: 1, max: 255 }),
		body("telefone").isLength({ min: 1, max: 255 }),
		body("codigoMedico").isInt(),

		checkValidationResult,
	],
	public.novoAgendamento
);

module.exports = router;
