import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams  } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PolicyDetailPage } from '../policy_detail/policy_detail';
@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html'
})
export class PolicyPage {

    agent: any ;
    items: any ;
    constructor(private navParam: NavParams, public http : Http, public loadingController:LoadingController, public navCtrl: NavController){
        
    }

    ionViewDidLoad() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        //headers.append('Authorization', 'Basic Ok9AYWNsZUAxMjM=');
        //headers.append('AuthUser', '78909890');
        //headers.append('SecretKey','a8658f0d67890459');

        let loader = this.loadingController.create({
            //content: "Loading pending policy..."
            content: "Loading Jobs..."
        });  
        loader.present();

        let postData = {
            "agt_key": this.navParam.get("agt_key"),
            "head_agt_key": this.navParam.get("agt_key"),
            "rank": this.navParam.get("agt_rank"),
            "flag" : 0
        }   

        let options = new RequestOptions({ headers: headers });
        this.http.post('https://pocvu.apps.eas.pcf.manulife.com/api/pending/search', postData, options)
        .map(res => res.json())
        .subscribe(data =>
        {
            loader.dismiss();
            this.items = data["policy"]["pending"]; 
            console.log('GET RESPONSE',this.items +"");
        });
    }

    itemClicked(item) {
        console.log("Policy Number:" + item.policy_no);
        this.navCtrl.push(PolicyDetailPage, {
            "unit_code" : item.unit_code,
            "branch_code" : item.branch_code, 
            "financial_planner_name" : item.financial_planner_name,
            "policy_no" : item.policy_no,
            "estimated_nac" : item.estimated_nac,
            "estimated_comm" : item.estimated_comm,
            "fp_share" : item.fp_share,
            "pending_days" : item.pending_days,
            "policy_owner" : item.policy_owner, 
            "last_update" : item.last_update,
            "curr" : item.curr
        })
    }

}
