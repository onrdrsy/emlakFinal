import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sonuc } from 'src/app/models/sonuc';
import { Uye } from 'src/app/models/uye';
import { FbServisService } from 'src/app/services/fbServis.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  sonuc : Sonuc = new Sonuc();
  secUye: Uye = new Uye();
  constructor(
    public fbservis:FbServisService,
    public router:Router
  ) { }


  ngOnInit() {
  }

  KayitOl(){
    this.fbservis.UyeOl(this.secUye).then(d => {
      d.user.updateProfile({
        displayName: this.secUye.adsoyad
      }).then();
      this.secUye.uid = d.user.uid;
      localStorage.setItem("user", JSON.stringify(d.user));
      this.UyeEkle();
    }, err => {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Mail adresi veya Parola geçersizdir.";
      });
  }
  UyeEkle(){
    this.fbservis.UyeEkle(this.secUye).then(d => {
      this.router.navigate(['/ilanlar']);
    })
  }
}
