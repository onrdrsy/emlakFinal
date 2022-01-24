import { Kayit } from 'src/app/models/kayit';
import { Injectable } from '@angular/core';
import { Dosya } from './../models/dosya';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StServisService {
basePath = "/Dosyalar";
constructor(
  public storage:AngularFireStorage,
  public db:AngularFireDatabase
) { }

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
this.db.list(this.basePath).push(kayit);
  }
}
