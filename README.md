
## Variables de entorno bd

```bash
DATABASE_URL="sqlserver://SERVER;database=DBAConsulta;user=USER;password=PASSWORD;encrypt=true;trustServerCertificate=true"
```
## INSTALACION DEPENDENCIA Y MIRGRACION CON PRISMA 
```bash
npm install prisma @types/node @types/mssql --save-dev
npm install @prisma/client @prisma/adapter-mssql dotenv

```
## ARCHIVO DE CONFIGURACION PRISMA 
en la carpeta prisma el squema de las tablas
|__prisma
   |__schema.prisma
En la raiz del proyecto esta el archivo de configuracion basica de  prisma 
prisma.config.ts

## GENERAR ESQUEMA EN BASE A LA ULTIMA MIGRACION
```bash
npx prisma db push 
```

## RUTA SWAGGER 
 /docs
 /docs/v2

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```