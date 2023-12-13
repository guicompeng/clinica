# Use a imagem oficial do Node.js 20.5.1
FROM node:20.5.1

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o diretório de trabalho
COPY . .

# Instale o wait-for-it
RUN apt-get update && apt-get install -y wait-for-it

# Exponha a porta do aplicativo (ajuste conforme necessário)
EXPOSE 3001

# Comando para iniciar o aplicativo após esperar pelo banco de dados
CMD ["wait-for-it", "db:5432", "--", "npm", "start"]