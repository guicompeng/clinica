-- Criar o banco de dados

DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'clinica') THEN
    CREATE DATABASE clinica;
  END IF;
END $$;

-- Usar o banco de dados
\c clinica;

-- Criar a tabela Pessoa
CREATE TABLE Pessoa (
    Codigo SERIAL PRIMARY KEY,
    Nome VARCHAR(255),
    Email VARCHAR(255),
    Telefone VARCHAR(15),
    CEP VARCHAR(10),
    Logradouro VARCHAR(255),
    Bairro VARCHAR(255),
    Cidade VARCHAR(255),
    Estado VARCHAR(2)
);

-- Criar a tabela Funcionario
CREATE TABLE Funcionario (
    DataContrato DATE,
    Salario DECIMAL(10, 2),
    SenhaHash VARCHAR(255),
    Codigo SERIAL PRIMARY KEY,
    FOREIGN KEY (Codigo) REFERENCES Pessoa(Codigo)
);

-- Criar a tabela Paciente
CREATE TABLE Paciente (
    Peso VARCHAR(255),
    Altura VARCHAR(255),
    TipoSanguineo VARCHAR(5),
    Codigo SERIAL PRIMARY KEY,
    FOREIGN KEY (Codigo) REFERENCES Pessoa(Codigo)
);

-- Criar a tabela Medico
CREATE TABLE Medico (
    Especialidade VARCHAR(255),
    CRM VARCHAR(15),
    Codigo SERIAL PRIMARY KEY,
    FOREIGN KEY (Codigo) REFERENCES Funcionario(Codigo)
);

-- Criar a tabela ProntuarioEletronico
CREATE TABLE ProntuarioEletronico (
    Anamnese TEXT,
    Medicamentos TEXT,
    Atestados TEXT,
    Exames TEXT,
    CodigoPaciente SERIAL,
    Codigo SERIAL PRIMARY KEY,
    FOREIGN KEY (CodigoPaciente) REFERENCES Paciente(Codigo)
);

-- Criar a tabela Agenda
CREATE TABLE Agenda (
    Codigo SERIAL PRIMARY KEY,
    Data DATE,
    Horario INTEGER,
    Nome VARCHAR(255),
    Email VARCHAR(255),
    Telefone VARCHAR(15),
    CodigoMedico SERIAL,
    FOREIGN KEY (CodigoMedico) REFERENCES Medico(Codigo)
);

-- Criar a tabela BaseDeEnderecos
CREATE TABLE BaseDeEnderecos (
    Codigo SERIAL PRIMARY KEY,    CEP VARCHAR(10),
    Logradouro VARCHAR(255),
    Bairro VARCHAR(255),
    Cidade VARCHAR(255),
    Estado VARCHAR(2)
);

INSERT INTO BaseDeEnderecos (CEP, Logradouro, Bairro, Cidade, Estado)
VALUES 
    ('30.190-050', 'Rua C', 'Bairro C', 'Cidade C', 'MG'),
    ('30.310-290', 'Rua D', 'Bairro D', 'Cidade D', 'RS');

INSERT INTO Pessoa (Codigo, Nome, Email, Telefone, CEP, Logradouro, Bairro, Cidade, Estado)
VALUES 
    (1, 'João Silva', 'a@gmail.com', '(11) 98765-4321', '12.345-678', 'Rua A', 'Centro', 'Cidade A', 'SP'),
    (2, 'Maria Oliveira', 'b@gmail.com', '(22) 12345-6789', '54.321-876', 'Rua B', 'Bairro B', 'Cidade B', 'RJ'),
    (3, 'Carlos Oliveira', 'c@gmail.com', '(33) 98765-4321', '98.765-432', 'Rua C', 'Centro', 'Cidade C', 'MG');

INSERT INTO Funcionario (DataContrato, Salario, SenhaHash, Codigo)
VALUES 
    ('2022-01-01', 5000.00, '123456', 1),
    ('2022-02-01', 6000.00, '123456', 2);


INSERT INTO Paciente (Peso, Altura, TipoSanguineo, Codigo)
VALUES 
    ('70kg', '1,75m', 'A+', 3);

INSERT INTO ProntuarioEletronico (Anamnese, Medicamentos, Atestados, Exames, CodigoPaciente)
VALUES 
    ('Histórico de pressão alta', 'Aspirina', 'Apto para atividades físicas', 'Exame de sangue OK', 3);

INSERT INTO Medico (Especialidade, CRM, Codigo)
VALUES 
    ('Cardiologia', '12345', 1),
    ('Dermatologia', '67890', 2);

INSERT INTO Agenda (Data, Horario, Nome, Email, Telefone, CodigoMedico)
VALUES 
    ('2023-12-20', 9, 'Consulta João', 'joao@gmail.com', '(11) 1111-1111', 1),
    ('2023-12-20', 14, 'Consulta Maria', 'maria@gmail.com', '(22) 2222-2222', 2);
