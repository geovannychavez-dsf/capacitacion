import { Module } from '@nestjs/common';
import { PrismaService } from './prismaservice';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
