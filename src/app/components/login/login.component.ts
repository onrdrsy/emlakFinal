import { FbServisService } from 'src/app/services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sonuc } from 'src/app/models/sonuc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  sonuc : Sonuc = new Sonuc();
  constructor(
    public fbservis:FbServisService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  GirisYap(mail: string, parola: string){
    this.fbservis.OturumAc(mail, parola).then(d => {
      if (d.user){
        localStorage.setItem("user", JSON.stringify(d.user));
        this.router.navigate(['yonet']);
      }
    }, err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "Mail adresi veya Parola geçersizdir.";

    });
  }

}
