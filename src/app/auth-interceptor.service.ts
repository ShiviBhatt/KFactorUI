import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

 constructor() { }

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   var updatedHeaders: any = {'Content-Type': 'application/json; charset=UTF-8'};
   updatedHeaders.Authorization = 'Bearer ' + localStorage.getItem('token');
   var clonedRequest = request.clone({
     setHeaders: updatedHeaders
   });
   return next.handle(clonedRequest).catch(error => {
     if (error instanceof HttpErrorResponse) {
         switch ((<HttpErrorResponse>error).status) {
             case 401:
               return this.handle401(request, next);
             default:
               return next.handle(clonedRequest);
         }
     } else {
         return Observable.throw(error);
     }
   });
 }

 handle401(request: HttpRequest<any>, next: HttpHandler) {
   return next.handle(request);
 }

}