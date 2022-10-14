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
import { ApiService } from "./api.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private router: Router, private apiService: ApiService) {}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (this.apiService.isLoggedIn()) {
			request = request.clone({
				setHeaders: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});
		}
		return next.handle(request).pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse && error.status === 401) {
					localStorage.clear();
					this.router.navigate(["/auth/login"]);
				}
				return throwError(() => error);
			})
		);
	}
}
