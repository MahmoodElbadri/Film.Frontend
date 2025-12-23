import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.includes('login') || req.url.includes('register')) return next(req);
  const token = localStorage.getItem('token');
  if(token) req = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  return next(req);
};
