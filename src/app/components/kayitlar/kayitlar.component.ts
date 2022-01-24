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
  secKayit:Kayit = new Kayit();
  sonuc: Sonuc = new Sonuc();
  uid: string;
  constructor(
    public fbServis: FbServisService
  ) { }

  ngOnInit() {
    
    this.secKayit.key = null;
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
  Detay(){
    
  }
}
