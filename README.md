# NestJS con soporte para Prisma y TypeORM.

## Desarrollo

### Instalación

```bash
npm install
# Dependencias específicas de Prisma si son necesarias
npm install prisma @types/node @types/mssql --save-dev
npm install @prisma/client @prisma/adapter-mssql dotenv
```

### Ejecución de la aplicación

```bash
# desarrollo
$ npm run start

# modo watch (observación)
$ npm run start:dev

# modo producción
$ npm run start:prod
```

## Variables de Entorno

Crea un archivo `.env` en el directorio raíz con las siguientes variables:

### Configuración de JWT
```bash
JWT_EXPIRES_IN='1h'
REFRESH_EXPIRES_IN=1d
JWT_SECRET='tu_secreto_jwt'
REFRESH_SECRET='tu_secreto_refresh'

```

### Configuración cors y api externa
```bash
ALLOWED_ORIGINS='SWAGGER_URL,RONTENURL'
ALLOWED_HEADER='Content-Type,Authorization,...'
METHODS='GET,POST,....'
RICKMORTY_URL='URl_/api/character'
```

### Configuración de la Base de Datos
```bash
DATABASE_URL="sqlserver://SERVER;database=DBAConsulta;user=USUARIO;password=CONTRASEÑA"
HOSTDB='localhost'
USERDB='usuario'
PASS='contraseña'
DATABASE='nombre_bd'
PORT=3001
```

### APIs Externas
```bash
RICKMORTY_URL='https://rickandmortyapi.com/api/characters'
```

## Base de Datos (Prisma)

### Comandos Esenciales

```bash
# Actualizar esquema y subir cambios a la BD (sin migraciones)
npx prisma db push

# Generar el Cliente de Prisma
npx prisma generate

# Resetear la base de datos (elimina todos los datos y aplica el esquema)
npx prisma migrate reset

# Crear una nueva migración y aplicarla
npx prisma migrate dev
```

### Estructura y Configuración

El esquema de Prisma se encuentra en `prisma/schema.prisma`.
La configuración también está presente en `prisma.config.ts` en la raíz.

Al generar el cliente, este se ubicará en `node_modules/.prisma/client`. Si no se crea, verifica si hay errores en `schema.prisma`.

## Arquitectura del Proyecto

### Configuración del Módulo Prisma

Ubicado en `src/config/prisma/`:
- `prisma.module.ts`
- `prisma.service.ts`

### Cambio de Repositorio y Proveedor

El proyecto permite alternar entre repositorios de Prisma y TypeORM.

#### Usando Prisma
En `usuarios.module.ts`:
```typescript
@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsuariosService, HeaderGuard, ...userPrismaProviders],
})
```
En `usuarios.service.ts`:
```typescript
private readonly userTransactionRepository: IUsertransactionPrismarepository
```

#### Usando TypeORM
En `usuarios.module.ts`:
```typescript
@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsuariosService, HeaderGuard, ...userProviders],
})
```
En `usuarios.service.ts`:
```typescript
private readonly userTransactionRepository: IUsertransactionrepository
```

## Documentación de la API

El proyecto utiliza Swagger para la documentación de la API.

- **URLs:** `/docs` o `/docs/v2`
