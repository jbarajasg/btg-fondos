import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error inesperado';

      if (error.status === 0) {
        errorMessage = 'Error de conexión. Verifica tu internet.';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Solicitud incorrecta';
      } else if (error.status === 500) {
        errorMessage = 'Error interno del servidor';
      }
      return throwError(() => new Error(errorMessage));
    }),
  );
};
