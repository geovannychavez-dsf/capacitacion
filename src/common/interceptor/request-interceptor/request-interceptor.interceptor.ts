 
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T;
  status: boolean;
  message: string;
}
@Injectable()
export class RequestInterceptorInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: T) => ({
        status: true,
        data: data,
        message: 'Operacion exitosa',
      })),
    );
  }
}
