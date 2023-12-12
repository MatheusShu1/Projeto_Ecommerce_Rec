# Use a imagem oficial do Node.js
FROM node:14

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração e dependências do backend
COPY package*.json ./

# Instale as dependências do backend
RUN npm install

# Copie os arquivos do código-fonte do backend
COPY ./node_modules ./node_modules
COPY ./backend ./backend

EXPOSE 8000



