# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Definir argumentos para build (opcionalmente fornecidos pelo CapRover)
ARG NEXT_PUBLIC_FUSIONAUTH_BASE_URL
ARG NEXT_PUBLIC_FUSIONAUTH_AUTH_TOKEN
ARG NEXT_PUBLIC_FUSIONAUTH_APPLICATION_ID
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

# Exportar os argumentos como variáveis de ambiente
ENV NEXT_PUBLIC_FUSIONAUTH_BASE_URL=${NEXT_PUBLIC_FUSIONAUTH_BASE_URL}
ENV NEXT_PUBLIC_FUSIONAUTH_AUTH_TOKEN=${NEXT_PUBLIC_FUSIONAUTH_AUTH_TOKEN}
ENV NEXT_PUBLIC_FUSIONAUTH_APPLICATION_ID=${NEXT_PUBLIC_FUSIONAUTH_APPLICATION_ID}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}

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
