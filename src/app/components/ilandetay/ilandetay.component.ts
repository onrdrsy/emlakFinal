import { FbServisService } from 'src/app/services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';

@Component({
  selector: 'app-ilandetay',
  templateUrl: './ilandetay.component.html',
  styleUrls: ['./ilandetay.component.scss']
})
export class IlandetayComponent implements OnInit {
  
  key: string;
  secKayit: Kayit;
  constructor(
    public route: ActivatedRoute,
    public fbServis: FbServisService,
    public router: Router
    
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.key = p.key;
      this.ilangetir();
    })
  }

  ilangetir(){
    this.fbServis.ilanByKey(this.key).snapshotChanges().subscribe(data => {
        const y = { ...data.payload.toJSON(), key: this.key};
      this.secKayit = (y as Kayit);
      //console.log(this.secKayit);
    });
  }


}
