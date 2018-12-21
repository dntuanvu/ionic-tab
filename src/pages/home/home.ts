import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { PolicyPage } from '../policy/policy';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    items: any ;
    constructor(public http : Http, public loadingController:LoadingController, public navCtrl: NavController){
        
    }

    ionViewWillEnter(){
    
    }

    ionViewDidLoad() {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      //headers.append('Authorization', 'Basic Ok9AYWNsZUAxMjM=');
      //headers.append('AuthUser', '78909890');
      //headers.append('SecretKey','a8658f0d67890459');

      let loader = this.loadingController.create({
        content: "Loading agents..."
      });  
      loader.present();

      let options = new RequestOptions({ headers: headers });
      this.http.get('https://pocvu.apps.eas.pcf.manulife.com/api/pending/agent')
      .map(res => res.json())
      .subscribe(data =>
      {
        loader.dismiss();
        this.items = data["agents"]; 
        console.log('GET RESPONSE',this.items +"");
      });
    }

    itemClicked(item) {
      console.log("clicked agent key=" + item.agt_key);
      this.navCtrl.push(PolicyPage, {
        agt_key: item.agt_key,
        agt_rank: item.agt_rank
      });
    } 
     

}
