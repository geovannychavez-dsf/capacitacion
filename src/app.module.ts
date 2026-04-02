import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CharactersModule } from './modules/characters/characters.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { DifusionModule } from './modules/difusion/difusion.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UsuariosModule,
    CharactersModule,
    AuthModule,
    DifusionModule,
  ],
})
export class AppModule {}
