import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    items: any ;
    jobs: any;
    constructor(public http : Http, public loadingController:LoadingController, public navCtrl: NavController){
        this.jobs = '2';
    }

    ionViewWillEnter(){
    
    }

    ionViewDidLoad() {
      
    }

    login(username: any, password: any) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      //headers.append('Authorization', 'Basic Ok9AYWNsZUAxMjM=');
      //headers.append('AuthUser', '78909890');
      //headers.append('SecretKey','a8658f0d67890459');

      let loader = this.loadingController.create({
        content: "Loading Jobs..."
      });  
      loader.present();

      let postData = {
          "user" : "",
          "password" : "",
          "app_version" : "1.8",
          "os_version" : "11",
          "device" : "iOS"
      }

      this.http.post('https://jobio-staging.grabjobs.co/v3/seeker/login', postData)
      .map(res => res.json())
      .subscribe(data =>
      {
        loader.dismiss();
        this.items = data["items"]; 
      });
    }

    loginClicked() {
      /*this.navCtrl.push(PolicyPage, {
        agt_key: item.agt_key,
        agt_rank: item.agt_rank
      });*/
    } 
}
