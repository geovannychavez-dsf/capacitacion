import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { HttpModule } from '@nestjs/axios';
import { characterProviders } from './repository/providers/character.provider';
import { DatabaseModule } from 'src/config/database/database.module';
import { GuardGuardJWT } from '../auth/guard/guard.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from 'src/common/types/type-orm';

@Module({
  imports: [JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get(JWT_CONFIG.SECRET),
      signOptions: { expiresIn: config.get(JWT_CONFIG.EXPIRE,) },
    })
  }), DatabaseModule, HttpModule],
  providers: [CharactersService, GuardGuardJWT, ...characterProviders],
  controllers: [CharactersController],
  exports: [GuardGuardJWT]
})
export class CharactersModule { }
