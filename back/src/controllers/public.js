const { pool } = require("../functions/db");

/**
 * @swagger
 * /public/enderecos:
 *  post:
 *    summary: 1.3 cadastro de endereços (Novo Endereço);
 *    tags:
 *      - Public
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              CEP:
 *                type: string
 *              logradouro:
 *                type: string
 *              bairro:
 *                type: string
 *              cidade:
 *                type: string
 *              estado:
 *                type: string
 *            required:
 *              - CEP
 *              - logradouro
 *              - bairro
 *              - cidade
 *              - estado
 *            example:
 *              CEP: "30190050"
 *              logradouro: "Rua dos Goitacazes"
 *              bairro: "Centro"
 *              cidade: "Belo Horizonte"
 *              estado: "MG"
 *    responses:
 *      "200":
 *        description: OK
 */
const novoEndereco = async (req, res) => {
	await pool.query("INSERT INTO BaseDeEnderecos (CEP, logradouro, bairro, cidade, estado) VALUES ($1, $2, $3, $4, $5)", [req.body.CEP, req.body.logradouro, req.body.bairro, req.body.cidade, req.body.estado]);
	res.sendStatus(204);
};

/**
 * @swagger
 * /public/especialidades:
 *  get:
 *    summary: Listar especialidades
 *    tags:
 *      - Public
 *    responses:
 *      "200":
 *        description: OK
 */
const obterEspecialidades = async (req, res) => {
	const especialidades = (await pool.query("SELECT DISTINCT Especialidade FROM Medico")).rows;
	const arr = especialidades.map(item => item.especialidade);
	return res.json(arr);
};

/**
 * @swagger
 * /public/medicos:
 *  get:
 *    summary: Listar medicos
 *    tags:
 *      - Public
 *    parameters:
 *      - in: query
 *        name: especialidade
 *        schema:
 *          type: string
 *        example: Cardiologia
 *    responses:
 *      "200":
 *        description: OK
 */


const obterMedicos = async (req, res) => {
	const medicos = (await pool.query("SELECT p.nome as nome, m.crm as crm, m.codigo as codigo FROM Medico m JOIN Pessoa p ON m.codigo = p.codigo WHERE Especialidade = $1", [req.query.especialidade])).rows;
	return res.json(medicos);
};

/**
 * @swagger
 * /public/horarios-agendados:
 *  get:
 *    summary: Listar horarios agendados
 *    tags:
 *      - Public
 *    parameters:
 *      - in: query
 *        name: data
 *        schema:
 *          type: string
 *        example: 2023-01-10
 *      - in: query
 *        name: codigoMedico
 *        schema:
 *          type: integer
 *        example: 1
 *    responses:
 *      "200":
 *        description: OK
 */


const obterHorariosAgendados = async (req, res) => {
	const horariosAgendados = (await pool.query("SELECT horario FROM Agenda WHERE CodigoMedico = $1 AND data = $2", [req.query.codigoMedico, req.query.data])).rows;
	const arr = horariosAgendados.map(item => item.horario);
	return res.json(arr);
};


/**
 * @swagger
 * /public/agendamentos:
 *  post:
 *    summary: 1.5 Agendar consulta
 *    tags:
 *      - Public
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              data:
 *                type: string
 *              horario:
 *                type: integer
 *              nome:
 *                type: string
 *              email:
 *                type: string
 *              telefone:
 *                type: string
 *              codigoMedico:
 *                type: integer
 *            required:
 *              - data
 *              - horario
 *              - nome
 *              - email
 *              - telefone
 *              - codigoMedico
 *            example:
 *              data: "2023-12-15"
 *              horario: 10
 *              nome: "Carlos Souza"
 *              email: "d@gmail.com"
 *              telefone: "31989669989"
 *              codigoMedico: 1
 *    responses:
 *      "200":
 *        description: OK
 */
const novoAgendamento = async (req, res) => {
	await pool.query("INSERT INTO Agenda (data, horario, nome, email, telefone, codigoMedico) VALUES ($1, $2, $3, $4, $5, $6)", [req.body.data, req.body.horario, req.body.nome, req.body.email, req.body.telefone, req.body.codigoMedico]);
	res.sendStatus(204);
};

module.exports = {
	novoEndereco,
	obterEspecialidades,
	obterMedicos,
	obterHorariosAgendados,
	novoAgendamento
};
