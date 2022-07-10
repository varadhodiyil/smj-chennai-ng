import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private router: Router) {}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		request = request.clone({
			setHeaders: {
				Authorization: `Token ${localStorage.getItem("token")}`,
			},
		});
		return next.handle(request).pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse && error.status === 401) {
					this.router.navigate(["/auth/login"]);
				}
				return throwError(() => error);
			})
		);
	}
}
