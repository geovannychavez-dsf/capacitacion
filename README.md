
## Variables de entorno bd

```bash
DATABASE_URL="sqlserver://SERVER;database=DBAConsulta;user=USER;password=PASSWORD;encrypt=true;trustServerCertificate=true"
HOSTDB=''
USERDB='s'
PASS=''
DATABASE=''
PORT=3001
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

## ACTUALIZACIONES - ESTRCUTURA DE CARPETAS  PROVAIDER Y REPOSITORY PRISMA 

```src/
├── config/
│   ├── database/
│   │   ├── database.module.ts
│   │   └── database.providers.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   └── swagger/
│       └── swagger.confg.ts
```


##  CAMBIOS DE PROVIDER Y REPOSITORY PRISMA Y TYPEORM 

```
src/
├── usuarios/
│   ├── usuarios.controller.spec.ts
│   ├── usuarios.controller.ts
│   ├── usuarios.module.ts
│   ├── usuarios.service.spec.ts
│   └── usuarios.service.ts
├── providers/
│   ├── user-prisma.providers.ts
│   └── user-providers.ts
└── repository/
    ├── user-repository.interface.ts
    ├── prisma/
    │   ├── user-respository.ts
    │   └── user-transaction.ts
    └── typeorm/
        ├── user-respository.ts
        └── user-transaction.ts
```

## GENENRAR EL PRISMA CLIENTE 
```bash
npx prisma generate --generate client 
```

## GENARAR ACTUALIZAR BASE DE DATOS CON EL ESQUEMA PRISMA 
```bash
npx prisma db push
```

## AL GENERAR EL PRISMA CLIENTE SE CREA UNA CARPETA EN LA RAIZ DEL PROYECTO LLAMADA `node_modules/.prisma/client` CON LOS ARCHIVOS DE CONFIGURACION Y EL CLIENTE DE PRISMA
EN CASO DE NO SE CREAR LA CARPETA O EL CLIENTE DE PRISMA ES PORQUE HAY UN ERROR EN EL ARCHIVO `schema.prisma` O EN LA CONFIGURACION DE PRISMA


## CAMBIAR EN PARA PRISMA 
``` UBICACION DE LA INYECCION DE DEPENDENCIA EN EL SERVICE
src/
├── usuarios/
│   └── usuarios.service.ts
│   ├── usuarios.module.ts
├── providers/
│   ├── user-prisma.providers.ts

 
 ```
## CAMBIAR EN PARA TYORMM
``` UBICACION DE LA INYECCION DE DEPENDENCIA EN EL SERVICE 
 ```
 src/
├── usuarios/
│   └── usuarios.service.ts
│   ├── usuarios.module.ts
├── providers/
│   └── user-providers.ts
 private readonly userTransactionRepository: IUsertransactionPrismarepository


 @Module({
  imports: [DatabaseModule,PrismaModule],
  controllers: [UsersController],
  providers: [UsuariosService, HeaderGuard, ...userPrismaProviders],
})

  ```


## PARA TYPEORM 
 ```
 private readonly userTransactionRepository: IUsertransactionrepository

│   ├── usuarios.module.ts
 @Module({
  imports: [DatabaseModule,PrismaModule],
  controllers: [UsersController],
  providers: [UsuariosService, HeaderGuard, ...userProviders],
})

```


El archivo `schema.prisma` contiene el esquema de todas las tablas de la base de datos.

En la raiz del proyecto esta el archivo de configuracion basica de  prisma 
prisma.config.ts

## ESTRUCTURA BASE DEL PROYECTO 

```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── common/
│   ├── decoradores/
│   │   ├── order/
│   │   │   ├── get-order.docs.ts
│   │   │   ├── index.ts
│   │   │   ├── post-order.docs.ts
│   │   │   └── update-order.docs.ts
│   │   └── usuario/
│   │       ├── get-user.docs.ts
│   │       ├── index.ts
│   │       ├── post-user.docs.ts
│   │       └── update-user.docs.ts
│   ├── guard/
│   │   └── header/
│   │       ├── header-guard.spec.ts
│   │       └── header-guard.ts
│   ├── interceptor/
│   │   └── request-interceptor/
│   │       ├── request-interceptor.interceptor.spec.ts
│   │       └── request-interceptor.interceptor.ts
│   ├── middelaware/
│   │   └── middelware-cors/
│   │       ├── middelware-cors.middleware.spec.ts
│   │       └── middelware-cors.middleware.ts
│   └── types/
│       └── type-orm.ts
├── config/
│   ├── database/
│   │   ├── database.module.ts
│   │   └── database.providers.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   └── swagger/
│       └── swagger.confg.ts
└── modules/
    └── usuarios/
        ├── usuarios.controller.spec.ts
        ├── usuarios.controller.ts
        ├── usuarios.module.ts
        ├── usuarios.service.spec.ts
        ├── usuarios.service.ts
        ├── aplication/
        ├── dto/
        │   ├── order/
        │   │   ├── create-order.dto.ts
        │   │   ├── respose-order.dto.ts
        │   │   └── update-order.dto.ts
        │   └── user/
        │       ├── create-user.dto.ts
        │       ├── response-user.dto.ts
        │       ├── update-user.dto.ts
        │       └── user-order.dto.ts
        ├── entities/
        │   ├── order-entity.ts
        │   └── user-entity.ts
        ├── providers/
        │   ├── user-prisma.providers.ts
        │   └── user-providers.ts
        └── repository/
            ├── user-repository.interface.ts
            ├── prisma/
            │   ├── user-respository.ts
            │   └── user-transaction.ts
            └── typeorm/
                ├── user-respository.ts
                └── user-transaction.ts
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