# Usa una imagen base de Node.js. Es buena práctica especificar la versión.
# node:20-alpine es una imagen ligera y eficiente.
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor.
# Aquí es donde se copiará el código de tu aplicación.
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o yarn.lock)
# Esto permite que Docker use la caché de capas para las dependencias,
# lo que acelera las reconstrucciones si solo cambia el código fuente.
COPY package*.json ./

# Instala las dependencias de Node.js.
# --omit=dev asegura que las dependencias de desarrollo no se instalen en producción.
RUN npm install --omit=dev

# Copia el resto del código de tu aplicación al directorio de trabajo.
COPY . .

# Expone el puerto en el que tu aplicación Node.js escuchará.
# Render usará esto para enrutar el tráfico. Asegúrate de que coincida con el puerto de tu Express app.
EXPOSE 3000

# Define el comando para iniciar tu aplicación cuando el contenedor se ejecute.
# 'npm start' es común si tu package.json tiene un script "start".
CMD ["npm", "start"]
