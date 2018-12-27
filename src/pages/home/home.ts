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
    jobs: any;
    constructor(public http : Http, public loadingController:LoadingController, public navCtrl: NavController){
        this.jobs = '2';
    }

    ionViewWillEnter(){
    
    }

    ionViewDidLoad() {
      this.fetchJobList(this.jobs);
    }

    fetchJobList(job_type) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      //headers.append('Authorization', 'Basic Ok9AYWNsZUAxMjM=');
      //headers.append('AuthUser', '78909890');
      //headers.append('SecretKey','a8658f0d67890459');

      let loader = this.loadingController.create({
        content: "Loading..."
      });  
      loader.present();

      //this.http.get('https://pocvu.apps.eas.pcf.manulife.com/api/pending/agent')
      this.http.get('https://jobio.grabjobs.co/v3/seeker/job/list?filter_country=SG&last_num_job=0&flag=0&job_num=60&job_type=' + job_type)
      //this.http.get("http://localhost:8082/app1/api/home")
      //this.http.get('http://localhost:8083/api/pending/agent')
      //this.http.get('https://randomuser.me/api/?results=20')
      .map(res => res.json())
      .subscribe(data => {
        loader.dismiss();
        this.items = data["items"]; 
        console.log("success=" + JSON.stringify(data));
      }, (err) => {
        loader.dismiss();
        console.log("error=" + err);
      });
    
      /*this.http.get("http://localhost:8082/app1/api/home")
      .map(res => res.json())
      .subscribe(data =>
      {
        loader.dismiss();
        this.items = data["items"]; 
      });*/
    }

    itemClicked(item) {
      console.log("clicked agent key=" + item.agt_key);
      this.navCtrl.push(PolicyPage, {
        agt_key: item.agt_key,
        agt_rank: item.agt_rank
      });
    } 

    onSegmentChange() {
      console.log("job_type segment=" + this.jobs);
      this.fetchJobList(this.jobs);
    }
     

}
