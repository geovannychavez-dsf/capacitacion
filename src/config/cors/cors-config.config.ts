import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const allowedOrigins = new Set(['http://localhost:3008', 'http://localhost:5173']);

export const CORS_CONFIG: CorsOptions = {
  origin: (origin: string, callback: (error: Error | null, allowed: boolean) => void) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};
