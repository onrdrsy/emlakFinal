import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';
import { FbServisService } from 'src/app/services/fbServis.service';

@Component({
  selector: 'app-ilanduzenle',
  templateUrl: './ilanduzenle.component.html',
  styleUrls: ['./ilanduzenle.component.scss']
})
export class IlanduzenleComponent implements OnInit {
  
  files: FileList;
  key: string;
  secKayit: Kayit;
  uid: string;

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
    public route: ActivatedRoute,
    public fbServis: FbServisService,
    public router: Router
    
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.route.params.subscribe(p => {
      this.key = p.key;
      this.ilangetir();
    })
  }

  ilangetir(){
    this.fbServis.ilanByKey(this.key).snapshotChanges().subscribe(data => {
        const y = { ...data.payload.toJSON(), key: this.key};
      this.secKayit = (y as Kayit);
      if (this.uid != this.secKayit.uid){
        this.router.navigate(['/yonet']);
      }
      //console.log(this.secKayit);
    });
  }

  Kaydet(){
    var tarih= new Date();
    this.secKayit.duzTarihi = tarih.getTime().toString();
    this.fbServis.ilanDuzenle(this.secKayit).then(d => {
      this.router.navigate(['/ilanlar/detay', this.key])
    });
  };
  DosyaSec(e){
    this.files= e.target.files;
  }
  Sil() {
    this.fbServis.ilanSil(this.key).then(d => {
      this.router.navigate(['/yonet']);
    });
  }
}
