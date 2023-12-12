# Use a imagem oficial do Node.js
FROM node:14

# Crie e defina o diretório de trabalho para o frontend
WORKDIR /app/frontend

# Copie os arquivos de configuração e dependências do frontend
COPY package*.json .

# Instale as dependências do frontend
RUN npm i --force

# Copie os arquivos do código-fonte do frontend
COPY ./ .

# Exponha a porta 3000 (ou a porta que seu aplicativo Node.js está ouvindo)
EXPOSE 3000