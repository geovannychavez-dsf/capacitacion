import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import * as crypto from 'crypto';

export class RefreshTokenRepository {
  constructor(private readonly repo: Repository<RefreshToken>) {}

  private hash(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async save(userId: number, token: string, expiresAt: Date): Promise<void> {
    await this.repo.save({ userId, tokenHash: this.hash(token), expiresAt, revoked: false });
  }

  async findActive(token: string): Promise<RefreshToken | null> {
    return this.repo.findOne({
      where: { tokenHash: this.hash(token), revoked: false },
    });
  }

  async revokeByToken(token: string): Promise<void> {
    await this.repo.update({ tokenHash: this.hash(token) }, { revoked: true });
  }

  async revokeAllByUserId(userId: number): Promise<void> {
    await this.repo.update({ userId, revoked: false }, { revoked: true });
  }
}
