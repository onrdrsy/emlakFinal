import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Kayit } from 'src/app/models/kayit';
import { map } from 'rxjs/operators'
import { Sonuc } from 'src/app/models/sonuc';
import { FbServisService } from 'src/app/services/fbServis.service';

@Component({
  selector: 'app-ilanyonet',
  templateUrl: './ilanyonet.component.html',
  styleUrls: ['./ilanyonet.component.scss']
})
export class IlanyonetComponent implements OnInit {
  adsoyad:string;
  uid: string;
  kayitlar: Kayit[];

  constructor(
    public fbServis: FbServisService,
    public router : Router
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.ilanListele();
  }
  ilanListele(){
    this.fbServis.ilanListeleByUID(this.uid).snapshotChanges().subscribe(data => {
      this.kayitlar =[];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key};
        this.kayitlar.push(y as Kayit);
      });
    });
  }
  

}
