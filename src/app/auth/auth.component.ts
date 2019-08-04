import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  isLoginMode = false;
  isLoading = false;
  error: string = null;
  subscrp: Subscription;

  constructor(private newAuthService: AuthService,
     private router: Router,
     private compFactoryResolv: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  onSwitchMode () {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(formData: NgForm) {
    if (!formData.valid) {
      return;
    }
    const email = formData.value.email;
    const password = formData.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.newAuthService.onLogin(email, password );
    } else {
      authObs = this.newAuthService.onSignUp(email, password );
    }
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMessageeee => {
        console.log(errorMessageeee);
        this.error = errorMessageeee;
        this.showErrorAlert(errorMessageeee);
        this.isLoading = false;
      }
    );

    formData.reset();

  }

  onHandleError() {
    this.error = null;
  }


  private showErrorAlert(error: string) {
    const cFResolver = this.compFactoryResolv.resolveComponentFactory(AlertComponent);

    const hostViewContRef = this.alertHost.viewContainerRef;
    hostViewContRef.clear();

    const compRef = hostViewContRef.createComponent(cFResolver);
    compRef.instance.message = error;
    this.subscrp = compRef.instance.close.subscribe( () => {
      this.subscrp.unsubscribe();
      hostViewContRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.subscrp) {
      this.subscrp.unsubscribe();
    }
  }


}
