import { Uye } from './../../models/uye';
import { Sonuc } from './../../models/sonuc';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { Kayit } from 'src/app/models/kayit';

@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.scss']
})
export class KayitlarComponent implements OnInit {
  
  kayitlar: any;
  uyeler: any;
  secKayit:Kayit = new Kayit();
  sonuc: Sonuc = new Sonuc();
  uyeAd: Uye = new Uye();
  uid: string;
  constructor(
    public fbServis: FbServisService
  ) { }

  ngOnInit() {
    if (localStorage.getItem("user")){
      var user = JSON.parse(localStorage.getItem("user"));
      this.uid = user.uid;
    }
    this.secKayit.key = null;
    this.UyeListele();
    this.ilanListele();
  }
  ilanListele(){
    this.fbServis.ilanListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kayitlar = data;
    });
  }
  UyeListele(){
    this.fbServis.UyeListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.uyeler = data;
    });
    console.log()
  }
  Kaydet(){
    var tarih =new Date();
    
    if (this.secKayit.key == null) {
      this.secKayit.ilanTarihi = tarih.getTime().toString();
      this.fbServis.ilanEkle(this.secKayit).then(()=> {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "İlan Eklendi";
      });
    }
    else {
      this.fbServis.ilanEkle(this.secKayit).then(()=> {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "İlan Eklendi";
      });
    }
  }
}
