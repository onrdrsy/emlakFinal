import { IlanduzenleComponent } from './components/ilanduzenle/ilanduzenle.component';
import { IlandetayComponent } from './components/ilandetay/ilandetay.component';
import { IlanekleComponent } from './components/ilanekle/ilanekle.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { IlanyonetComponent } from './components/ilanyonet/ilanyonet.component';
import { NavBarComponent } from './components/navBar/navBar.component';
import { HomeComponent } from './components/home/home.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KayitlarComponent,
    NavBarComponent,
    LoginComponent,
    SignupComponent,
    IlanekleComponent,
    IlanduzenleComponent,
    IlandetayComponent,
    IlanyonetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
