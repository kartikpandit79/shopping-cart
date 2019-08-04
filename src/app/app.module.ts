import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShopingService } from './shopping-list/shoping.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RecipeService } from './recipe/recipe.service';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DataStorageService } from './shared/data-storage.service';
import { ResolverService } from './recipe/resolver.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

  ],
  providers: [ShopingService, RecipeService, DataStorageService, ResolverService, AuthGuard,
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
