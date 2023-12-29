import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.password) {
          const response = JSON.parse(JSON.stringify(data));
          console.log({ response });
          delete response['password'];
          console.log(response);
          return response;
        }
        return data;
      }),
    );
  }
}
