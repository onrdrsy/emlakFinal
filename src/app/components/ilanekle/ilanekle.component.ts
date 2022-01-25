

import { Kayit } from './../../models/kayit';
import { Component, OnInit } from '@angular/core';
import { FbServisService } from 'src/app/services/fbServis.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ilanekle',
  templateUrl: './ilanekle.component.html',
  styleUrls: ['./ilanekle.component.scss']
})
export class IlanekleComponent implements OnInit {
  secKayit:Kayit = new Kayit();
  
  files: FileList;

  durumlar = [
    'Satılık', 'Kiralık', 'Günlük Kiralık'
  ];
  odalar = [
    '1+0', '1+1', '2+1', '3+1', '4+1', '5+2'
  ];
  katlar = [
    'Bodrum Kat', 'Giriş Kat', '1. Kat', '2. Kat', '3. Kat', '4. Kat', '5.Kat', 'Çatı Kat'
  ];
  iller = [
    'Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 
'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 
'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
  ]

  constructor(
    public fbservis:FbServisService,
    public router:Router,
  ) { }

  ngOnInit() {
  }
  Kaydet(){
    var user = JSON.parse(localStorage.getItem("user"));
    this.secKayit.uid = user.uid;
    this.secKayit.uyeAd = user.displayName;
    this.secKayit.uyeMail = user.email;
    var tarih = new Date();
    this.secKayit.ilanTarihi = tarih.getTime().toString();
    this.secKayit.duzTarihi = tarih.getTime().toString();
    this.secKayit.file = this.files[0];
    this.fbservis.DosyaYukleStorage(this.secKayit).subscribe( p => {
      this.router.navigate(['/ilanlar']);
      console.log(this.secKayit)
      console.log("Yüklendi");
    }, err => {
      console.log("Hata");
    });/*
    this.fbservis.ilanEkle(this.secKayit).then(d => {
      
    }); */

  }
  DosyaSec(e){
    this.files= e.target.files;
  }
  DosyaYukle(){
    
    
    this.fbservis.DosyaYukleStorage(this.secKayit).subscribe( p => {
      console.log("Yüklendi");
    }, err => {
      console.log("Hata");
    });
  }

}
