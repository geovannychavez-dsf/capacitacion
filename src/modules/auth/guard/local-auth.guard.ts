import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_CONFIG } from 'src/common/types/type-orm';

@Injectable()
export class LocalAuthGuard extends AuthGuard(JWT_CONFIG.PASSPOT_LOCAL) {}
