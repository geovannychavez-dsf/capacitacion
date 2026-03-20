
## Variables de entorno bd

```bash
DATABASE_URL="sqlserver://SERVER;database=DBAConsulta;user=USER;password=PASSWORD;encrypt=true;trustServerCertificate=true"
HOSTDB=''
USERDB='s'
PASS=''
DATABASE=''
PORT=
```
## INSTALACION DEPENDENCIA Y MIRGRACION CON PRISMA 
```bash
npm install prisma @types/node @types/mssql --save-dev
npm install @prisma/client @prisma/adapter-mssql dotenv
```

## ACTUALIZAR BASE DE DATOS CON EL ESQUEMA PRISMA 
```bash
npx prisma db push
npx prisma generate --generate client 
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
├── usuarios/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   │   └── response-user.dto.ts
│   ├── providers/
│   │   └── user.providers.ts
│   ├── repository/
│   │   └── user.repository.ts
│   ├── entities/
│   │   └── User.entity.ts
│   ├── usuarios.controller.ts
│   ├── usuarios.service.ts
│   └── usuarios.module.ts
├── decoradores/
│   ├── usuario/
│   │   ├── get-user.docs.ts
│   │   ├── post-user.docs.ts
│   │   ├── update-user.docs.ts
├── header/
│   └── header.guard.ts
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

## CLAVE AUTENTICACIÓN BASICA 
USER: admin
PASS: admin

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

kebab-case: Archivos, carpetas, endPoints