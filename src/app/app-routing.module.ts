import { IlanduzenleComponent } from './components/ilanduzenle/ilanduzenle.component';
import { IlandetayComponent } from './components/ilandetay/ilandetay.component';
import { IlanekleComponent } from './components/ilanekle/ilanekle.component';
import { IlanyonetComponent } from './components/ilanyonet/ilanyonet.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuthGuard,redirectUnauthorizedTo} from '@angular/fire/auth-Guard';
import { SignupComponent } from './components/signup/signup.component';

const redirectLogin = () => redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ilanlar', component: KayitlarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
 
  {path: 'ilanlar/detay/:key', component: IlandetayComponent},
// üye////
  {path: 'yonet', component: IlanyonetComponent, canActivate:[AngularFireAuthGuard], data:{
    authGuardPipe:redirectLogin
  }},

  {path: 'ilan-ver', component: IlanekleComponent, canActivate:[AngularFireAuthGuard], data:{
    authGuardPipe:redirectLogin
  }},
  
  {path: 'ilanlar/duzenle/:key', component: IlanduzenleComponent, canActivate:[AngularFireAuthGuard], data:{
    authGuardPipe:redirectLogin
  }}
]; 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
