import { Kayit } from './../models/kayit';
import { Uye } from '../models/uye';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';


import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FbServisService {
  private dbKayit = '/Ilanlar';
  private dbUye = '/Uyeler';
  basePath = "/Dosyalar";
  kayitRef: AngularFireList<Kayit> = null;
  uyeRef: AngularFireList<Uye> = null;

  constructor(
    public storage:AngularFireStorage,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.kayitRef = db.list(this.dbKayit);
    this.uyeRef = db.list(this.dbUye);
  }
  ///// LOGIN //////
  OturumAc(mail: string, parola: string){
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat(){
    return this.afAuth.signOut();
  }

  OturumKontrol(){
    if (localStorage.getItem("user")){
      return true
    }else{
      return false
    }
  }
 ///// LOGIN //////
 ///// SIGN UP ////
  UyeOl(uye: Uye){
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }
  UyeEkle(uye: Uye){
    return this.uyeRef.push(uye);
  }
 ///// SIGN UP ////
  

   /////İlanlar ////

  ilanListele(){
    return this.kayitRef;
  }
  ilanListeleByUID(uid: string){
    return this.db.list("/Ilanlar", q => q.orderByChild("uid").equalTo(uid));
  }
  ilanByKey(key: string){
    return this.db.object("/Ilanlar/"+key);
  }

  ilanEkle(kayit: Kayit) {
    return this.kayitRef.push(kayit)
  }
  ilanDuzenle(kayit: Kayit) {
    return this.kayitRef.update(kayit.key, kayit)
  }
  ilanSil(key: string){
    return this.kayitRef.remove(key);
  }
    /////İlanlar ////

    ////// dosya yükleme //////

    
  DosyaYukleStorage(kayit:Kayit){
    const dosyaYol=this.basePath + "/" + kayit.file.name;
    const storageRef = this.storage.ref(dosyaYol);
    const yukleTask = this.storage.upload(dosyaYol,kayit.file);
    yukleTask.snapshotChanges().pipe(
      finalize(()=>{
        storageRef.getDownloadURL().subscribe(downloadURL => {
          kayit.fotoURL = downloadURL;
          kayit.dadi = kayit.file.name;
          this.DosyaVeriYaz(kayit);
        })
      })
    ).subscribe();
    return yukleTask.percentageChanges();
  }
  DosyaVeriYaz(kayit: Kayit){
this.db.list(this.dbKayit).push(kayit);
  }
}
