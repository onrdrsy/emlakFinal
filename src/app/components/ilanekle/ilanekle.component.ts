import { Dosya } from './../../models/dosya';
import { StServisService } from './../../services/stServis.service';
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
  dosyalar: Dosya[];
  files: FileList;

  constructor(
    public fbservis:FbServisService,
    public router:Router,
  ) { }

  ngOnInit() {
  }
  Kaydet(){
    var user = JSON.parse(localStorage.getItem("user"));
    this.secKayit.uid = user.uid;
    var tarih = new Date();
    this.secKayit.ilanTarihi = tarih.getTime().toString();
    this.secKayit.duzTarihi = tarih.getTime().toString();
    this.secKayit.file = this.files[0];
    this.fbservis.DosyaYukleStorage(this.secKayit).subscribe( p => {
      this.router.navigate(['/ilanlar']);
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
    var dosya = new Dosya();
    
    this.fbservis.DosyaYukleStorage(this.secKayit).subscribe( p => {
      console.log("Yüklendi");
    }, err => {
      console.log("Hata");
    });
  }

}
