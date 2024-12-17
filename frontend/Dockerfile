# Usar a imagem base do Node.js para construir o frontend
FROM node:20.11-slim AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar dependências sem cache para o build
RUN npm install

# Copiar todos os arquivos do projeto
COPY . .

# Build da aplicação React
RUN npm run build

# Usar a imagem do Nginx para servir o build do React
FROM nginx:stable-alpine

# Copiar o build gerado para a pasta padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta padrão do Nginx
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
