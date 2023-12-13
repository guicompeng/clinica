const { pool } = require("../functions/db");


/**
 * @swagger
 * /restricted/perfil:
 *  get:
 *    summary: Visualizar perfil do usuario logado
 *    tags:
 *      - Restricted
 *    responses:
 *      "200":
 *        description: OK
 */

const perfil = async (req, res) => {
    var funcionario = (await pool.query("SELECT * FROM Pessoa p JOIN Funcionario f ON p.codigo = f.codigo LEFT JOIN Medico m ON f.codigo = m.codigo WHERE p.Codigo = $1", [req.jwtData.codigo])).rows[0];
	return res.json(funcionario);
};

/**
 * @swagger
 * /restricted/prontuarios:
 *  post:
 *    summary: 3. Cadastramento de prontuario
 *    tags:
 *      - Restricted
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              codigoPaciente: 3
 *              anamnese: "Início dos Sintomas: Há 2 semanas Características da Dor: Localizada na região epigástrica, dor tipo queimação, intensidade moderada"
 *              medicamentos: "Dipirona"
 *              atestados: "Atestado de 5 dias a partir do dia 07/12/2023"
 *              exames: "B12, hemograma"
 *    responses:
 *      "200":
 *        description: OK
 */
const novoProntuario = async (req, res) => {
    const paciente = (await pool.query("SELECT * FROM Paciente WHERE Codigo = $1", [req.body.codigoPaciente])).rows[0];
    if(!paciente)  return res.status(400).json({ msg: "Não existe paciente com o código informado" });
    await pool.query("INSERT INTO ProntuarioEletronico (CodigoPaciente, Anamnese, Medicamentos, Atestados, Exames) VALUES ($1, $2, $3, $4, $5)", [req.body.codigoPaciente, req.body.anamnese, req.body.medicamentos, req.body.atestados, req.body.exames]);
    res.sendStatus(204);
};

/**
 * @swagger
 * /restricted/funcionarios:
 *  post:
 *    summary: 3. Cadastramento de funcionarios
 *    tags:
 *      - Restricted
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              nome: "Abelar Silva"
 *              email: "abelar@gmail.com"
 *              telefone: "31989999999"
 *              CEP: "30190050"
 *              logradouro: "Rua dos Goitacazes"
 *              bairro: "Centro"
 *              cidade: "Belo Horizonte"
 *              estado: "MG"
 *              dataContrato: "2023-12-05"
 *              salario: "5000"
 *              senha: "123456"
 *              eMedico: true
 *              especialidade: "Cardiologia"
 *              CRM: "54321"
 *    responses:
 *      "200":
 *        description: OK
 */
//
const novoFuncionario = async (req, res) => {
    const pessoa = await pool.query("INSERT INTO Pessoa (nome, email, telefone, CEP, logradouro, bairro, cidade, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *", [req.body.nome, req.body.email, req.body.telefone, req.body.CEP, req.body.logradouro, req.body.bairro, req.body.cidade, req.body.estado]);
    await pool.query("INSERT INTO Funcionario (Codigo, DataContrato, Salario, SenhaHash) VALUES ($1, $2, $3, $4)", [pessoa.rows[0].codigo, req.body.dataContrato, req.body.salario, req.body.senha]);
    if(req.body.eMedico == true || req.body.eMedico == "true") {
        await pool.query("INSERT INTO Medico (Codigo, Especialidade, CRM) VALUES ($1, $2, $3)", [pessoa.rows[0].codigo, req.body.especialidade, req.body.CRM]);
    }
    res.sendStatus(204);
};

/**
 * @swagger
 * /restricted/pacientes:
 *  post:
 *    summary: 3. Cadastramento de pacientes
 *    tags:
 *      - Restricted
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
 *              - nome
 *              - email
 *              - telefone
 *              - CEP
 *              - logradouro
 *              - bairro
 *              - cidade
 *              - estado
 *              - peso
 *              - altura
 *              - tipoSanguineo
 *            example:
 *              nome: "Abelar Silva"
 *              email: "abelar@gmail.com"
 *              telefone: "31989999999"
 *              CEP: "30190050"
 *              logradouro: "Rua dos Goitacazes"
 *              bairro: "Centro"
 *              cidade: "Belo Horizonte"
 *              estado: "MG"
 *              peso: "70kg"
 *              altura: "1,70"
 *              tipoSanguineo: "O+"
 *    responses:
 *      "200":
 *        description: OK
 */
//
const novoPaciente = async (req, res) => {
    const pessoa = await pool.query("INSERT INTO Pessoa (nome, email, telefone, CEP, logradouro, bairro, cidade, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *", [req.body.nome, req.body.email, req.body.telefone, req.body.CEP, req.body.logradouro, req.body.bairro, req.body.cidade, req.body.estado]);
    await pool.query("INSERT INTO Paciente (codigo, peso, altura, tipoSanguineo) VALUES ($1, $2, $3, $4)", [pessoa.rows[0].codigo, req.body.peso, req.body.altura, req.body.tipoSanguineo]);
    res.sendStatus(204);
};

/**
 * @swagger
 * /restricted/funcionarios:
 *  get:
 *    summary: 4. Listar funcionarios
 *    tags:
 *      - Restricted
 *    responses:
 *      "200":
 *        description: OK
 */

const listarFuncionarios = async (req, res) => {
	const funcionarios = (await pool.query("SELECT p.*, f.DataContrato as datacontrato, f.salario as salario FROM Pessoa p JOIN Funcionario f ON p.Codigo = f.Codigo")).rows;
	return res.json(funcionarios);
};

/**
 * @swagger
 * /restricted/pacientes:
 *  get:
 *    summary: 5. Listar pacientes
 *    tags:
 *      - Restricted
 *    responses:
 *      "200":
 *        description: OK
 */

const listarPacientes = async (req, res) => {
	const pacientes = (await pool.query("SELECT * FROM Pessoa p JOIN Paciente pac ON p.Codigo = pac.Codigo")).rows;
	return res.json(pacientes);
};


/**
 * @swagger
 * /restricted/enderecos:
 *  get:
 *    summary: 5. Listar endereços
 *    tags:
 *      - Restricted
 *    responses:
 *      "200":
 *        description: OK
 */

const listarEnderecos = async (req, res) => {
	const pacientes = (await pool.query("SELECT * FROM BaseDeEnderecos")).rows;
	return res.json(pacientes);
};


/**
 * @swagger
 * /restricted/buscar-endereco:
 *  get:
 *    summary: Buscar endereco pelo CEP
 *    tags:
 *      - Restricted
 *    parameters:
 *      - in: query
 *        name: CEP
 *        schema:
 *          type: string
 *        example: 30190050
 *    responses:
 *      "200":
 *        description: OK
 */

const buscarEndereco = async (req, res) => {
	const endereco = (await pool.query("SELECT * FROM BaseDeEnderecos WHERE CEP = $1", [req.query.CEP])).rows[0];
	return res.json(endereco || {});
};

/**
 * @swagger
 * /restricted/agendamentos:
 *  get:
 *    summary: 7. Listagem de todos os agendamentos de consultas realizados pelos clientes
 *    tags:
 *      - Restricted
 *    responses:
 *      "200":
 *        description: OK
 */

const listarAgendamentos = async (req, res) => {
	const agenda = (await pool.query("SELECT * FROM Agenda")).rows;
	return res.json(agenda);
};

/**
 * @swagger
 * /restricted/meus-agendamentos:
 *  get:
 *    summary: 8. Listagem dos agendamentos de consultas apenas do funcionário logado caso ele seja um médico
 *    tags:
 *      - Restricted
 *    responses:
 *      "200":
 *        description: OK
 */

const meusAgendamentos = async (req, res) => {
    const meuPerfilMedico = (await pool.query("SELECT * FROM Medico WHERE Codigo = $1", [req.jwtData.codigo])).rows[0];
    if(!meuPerfilMedico) return res.status(400).json({ msg: "Funcionário não é médico" });
	const agenda = (await pool.query("SELECT * FROM Agenda WHERE CodigoMedico = $1", [req.jwtData.codigo])).rows;
	return res.json(agenda);
};

module.exports = {
    perfil,
    novoProntuario,
    novoFuncionario,
    novoPaciente,
    listarFuncionarios,
    listarPacientes,
    listarEnderecos,
    buscarEndereco,
    listarAgendamentos,
    meusAgendamentos
};
