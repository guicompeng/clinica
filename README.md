
# Grupo 9 - Laboratório de Engenharia de Software I

## TP - Clínica médica

## Integrantes
- 20213002091 - DIOGO EMANUEL ANTUNES SANTOS
- 20203005008 - FELIPE SILVA FARIA
- 20203020283 - GUILHERME DE ASSIS LIMA
- 20213004828 - PEDRO HENRIQUE ROCHA DE CASTRO

## Rodar o Back-end
1. Instale o docker
https://docs.docker.com/get-docker/

2. Clonar repositório e entrar na pasta
```cd back/```

3. Execute o comando
Se o docker instalado é antigo (v1):
```
 docker-compose up --build
```
Se o docker instalado é novo (v2):
```
 docker compose up --build
```
4. Acesse a documentação no navegador
- Após rodar este projeto, a documentação com Swagger estará disponível no link abaixo.
- http://localhost:3001/api-docs/
- Para chamar qualquer api, é só expandi-la e clicar em "Try it out".
- Para requisições restritas (apenas funcionários podem fazer), antes é necessário clicar em "Post /authentication" e depois em "Try it out"


## Rodar o Front-end
1. Antes de rodar o front-end, verifique se está rodando o back-end
2. Instale o node.js: https://nodejs.org/en/download/current
3. Entre na pasta ```cd front/```
4. Execute no terminal ```npm install```
5. Execute no terminal ```npm start```
6. Entre em http://localhost:3000

Usuário padrão para fazer login no sistema:
- email: a@gmail.com
- senha: 123456
