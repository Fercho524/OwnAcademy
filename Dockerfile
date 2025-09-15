# Etapa 1: build con TypeScript
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y lock
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias (incluyendo devDependencies para compilar)
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript
RUN npm run build

# Etapa 2: ejecución ligera
FROM node:22-alpine AS runner

WORKDIR /usr/src/app

# Copiar solo lo necesario desde builder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Variables de entorno por defecto
ENV NODE_ENV=production

# Exponer el puerto de la app (se inyecta desde .env en docker-compose)
EXPOSE ${PORT}

# Comando de arranque
CMD ["node", "dist/index.js"]
