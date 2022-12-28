import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';

interface IAuthorizationResponse {
  id: string;
  email: string;
  firstName: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly httpService: HttpService) {}

  async use(
    req: Request,
    res: Response<any, IAuthorizationResponse>,
    next: NextFunction,
  ) {
    const response = await firstValueFrom(
      this.httpService
        .get<IAuthorizationResponse>(`http://localhost:3002/authorization`, {
          headers: {
            Authorization: req.headers.authorization,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw 'An error happened!';
          }),
        ),
    );

    if (!response.data) {
      throw new UnauthorizedException();
    }

    res.locals = response.data;
    next();
  }
}
