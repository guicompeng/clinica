const express = require("express");
const router = express.Router();
const restricted = require("../controllers/restricted");
const { checkValidationResult } = require("../functions/validations");
const { body, query } = require("express-validator");
const { auth } = require("../functions/jwt");
const { isValidDate } = require("../functions/general");

router.get(
	"/restricted/perfil",
	auth,
	restricted.perfil
);

// 1. Cadastramento do prontuário eletrônico do paciente
router.post(
	"/restricted/prontuarios",
	auth,
	[
		body("codigoPaciente").isLength({ min: 1, max: 255 }),
		body("anamnese").isLength({ min: 1, max: 255 }),
		body("medicamentos").isLength({ min: 1, max: 255 }),
		body("atestados").isLength({ min: 1, max: 255 }),
		body("exames").isLength({ min: 1, max: 255 }),
		checkValidationResult,
	],
	restricted.novoProntuario
);

// 2. Cadastramento de funcionários da clínica
router.post(
	"/restricted/funcionarios",
	auth,
	[
		// nome, email, telefone, CEP, logradouro, bairro, cidade, estado, DataContrato, Salario e Senha, Especialidade e CRM
		body("nome").isLength({ min: 1, max: 255 }),
		body("email").isLength({ min: 1, max: 255 }),
		body("telefone").isLength({ min: 1, max: 255 }),
		body("CEP").isLength({ min: 8, max: 10 }),
		body("logradouro").isLength({ min: 1, max: 255 }),
		body("bairro").isLength({ min: 1, max: 255 }),
		body("cidade").isLength({ min: 1, max: 255 }),
		body("estado").isLength({ min: 1, max: 255 }),
		body("dataContrato").custom((value) => isValidDate(value)).withMessage('Data inválida. Formato esperado: YYYY-MM-DD'),
		body("salario").isLength({ min: 1, max: 255 }),
		body("senha").isLength({ min: 1, max: 255 }),
		body("eMedico").isBoolean(),
		body("especialidade")
            .if((value, { req }) => req.body.eMedico) // Se eMedico for true, então a validação é aplicada
            .isLength({ min: 1, max: 255 })
            .withMessage('Campo especialidade é obrigatório para médicos'),
        body("CRM")
            .if((value, { req }) => req.body.eMedico) // Se eMedico for true, então a validação é aplicada
            .isLength({ min: 1, max: 255 })
            .withMessage('Campo CRM é obrigatório para médicos'),
		checkValidationResult,
	],
	restricted.novoFuncionario
);

// 3. Cadastramento de pacientes
router.post(
	"/restricted/pacientes",
	auth,
	[
		// nome, email, telefone, CEP, logradouro, bairro, cidade, estado, peso, altura e tipo sanguíneo
		body("nome").isLength({ min: 1, max: 255 }),
		body("email").isLength({ min: 1, max: 255 }),
		body("telefone").isLength({ min: 1, max: 255 }),
		body("CEP").isLength({ min: 8, max: 10 }),
		body("logradouro").isLength({ min: 1, max: 255 }),
		body("bairro").isLength({ min: 1, max: 255 }),
		body("cidade").isLength({ min: 1, max: 255 }),
		body("estado").isLength({ min: 1, max: 255 }),
		body("peso").isLength({ min: 1, max: 255 }),
		body("altura").isLength({ min: 1, max: 255 }),
		body("tipoSanguineo").isLength({ min: 1, max: 2 }),

		checkValidationResult,
	],
	restricted.novoPaciente
);

// 4. Listagem dos funcionários cadastrados
router.get(
	"/restricted/funcionarios",
	auth,
	restricted.listarFuncionarios
);

router.get(
	"/restricted/pacientes",
	auth,
	restricted.listarPacientes
);

// Buscar endereco pelo CEP
router.get(
	"/restricted/buscar-endereco",
	auth,
	[
		query("CEP").isLength({ min: 8, max: 10 }),
		checkValidationResult,
	],
	restricted.buscarEndereco
);

// 6. Listar endereços
router.get(
	"/restricted/enderecos",
	auth,
	restricted.listarEnderecos
);


// 7. Listagem de todos os agendamentos de consultas realizados pelos clientes
router.get(
	"/restricted/agendamentos",
	auth,
	restricted.listarAgendamentos
);

// 8. Listagem dos agendamentos de consultas apenas do funcionário logado caso ele seja um médico
router.get(
	"/restricted/meus-agendamentos",
	auth,
	restricted.meusAgendamentos
);

module.exports = router;
