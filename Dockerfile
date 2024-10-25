# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto para o contêiner
COPY . .

# Execute o build do Next.js
RUN npm run build

# Exponha a porta que o Next.js irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação Next.js
CMD ["npm", "run", "start"]
