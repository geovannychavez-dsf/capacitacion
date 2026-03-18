
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

## ESTRUCTURA DE CARPETAS PRISMA

En la raíz del proyecto está la carpeta `prisma` con la siguiente estructura:

```
prisma/
└─── schema.prisma
```

El archivo `schema.prisma` contiene el esquema de todas las tablas de la base de datos.

En la raiz del proyecto esta el archivo de configuracion basica de  prisma 
prisma.config.ts

## ESTRUCTURA BASE DEL PROYECTO 

```
src/
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── providers/
│   │   └── user.providers.ts
│   ├── repository/
│   │   └── user.repository.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── prisma/
│   └── prisma.service.ts
├── app.module.ts
└── main.ts
```



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