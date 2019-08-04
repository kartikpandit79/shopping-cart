import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered ?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new Subject<User>();
  user = new BehaviorSubject<User>(null);
  private tokenExpiryTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router ) { }

  onSignUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe( (catchError(this.handleError)),
    (tap (respData => {
      this.handleAuthentication(respData.email,
        respData.localId,
        respData.idToken,
        +respData.expiresIn);
    })
    ));
  }

  onLogin (email: string, password: string) {
   return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }).pipe((catchError(this.handleError)),
      (tap (respData => {
        this.handleAuthentication(respData.email,
          respData.localId,
          respData.idToken,
          +respData.expiresIn);
      })
      ));
  }

  autoLogin() {
    const userData2: {
      email: string, id: string, _token: string, _tokenExp: string
    } = JSON.parse(localStorage.getItem('usrData'));
    if (!userData2) {
      return;
    }
    const loadedUser = new User(userData2.email,
       userData2.id,
        userData2._token,
        new Date(userData2._tokenExp));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expDur = new Date(userData2._tokenExp).getTime() - new Date().getTime();
      this.autoLogout(expDur);
    }

  }

  onLogout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('usrData');
    if (this.tokenExpiryTimer) {
      clearTimeout(this.tokenExpiryTimer);
    }
    this.tokenExpiryTimer = null;
  }

  autoLogout(expDuration: number) {
    console.log(expDuration);
  this.tokenExpiryTimer = setTimeout( () => {
      this.onLogout();
    }, expDuration);
  }

  private handleAuthentication (email: string, id: string, token: string, expiration: number) {
    const expData = new Date (new Date().getTime() + expiration * 1000 );
    console.log('expiration data:' );
      console.log( expData);

      const userNew =
      new User (email,
                id,
                token,
                expData);

      this.user.next(userNew);
      this.autoLogout(expiration * 1000);
      localStorage.setItem('usrData', JSON.stringify(userNew));
  }

  private handleError(errorR: HttpErrorResponse) {
    console.log(errorR);
    let errorMessage = 'An unknown error occured';
    if (!errorR.error || !errorR.error.error) {
      return throwError(errorMessage) ;
    } else {
      switch ( errorR.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This Email already present - Try Login';
        break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This Email does not exist, please try Login first!';
        break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Password entered is not correct! try again';
        break;
      }
       return throwError(errorMessage);
    }
  }

}
