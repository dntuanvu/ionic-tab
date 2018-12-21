import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, Item  } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'page-policy-detail',
  templateUrl: 'policy_detail.html'
})

export class PolicyDetailPage {

    item: PendingPolicy ;
    unit_code: any;
    branch_code: any;
    financial_planner_name: any;
    policy_no: any;
    estimated_nac: any;
    estimated_comm: any;
    fp_share: any;
    pending_days: any;
    policy_owner: any;
    last_update: any;
    curr: any;

    constructor(private navParam: NavParams, public http : Http, public loadingController:LoadingController, public navCtrl: NavController){
        
    }

    ionViewDidLoad() {
        this.unit_code = this.navParam.get("unit_code");
        this.branch_code = this.navParam.get("branch_code");
        this.financial_planner_name = this.navParam.get("financial_planner_name");
        this.policy_no = this.navParam.get("policy_no");
        this.estimated_nac = this.navParam.get("estimated_nac");
        this.estimated_comm = this.navParam.get("estimated_comm");
        this.fp_share = this.navParam.get("fp_share");
        this.pending_days = this.navParam.get("pending_days");
        this.policy_owner = this.navParam.get("policy_owner");
        this.last_update = this.navParam.get("last_update");
        this.curr = this.navParam.get("curr");
    }
}

class PendingPolicy {
    unit_code: any;
    branch_code: any;
    financial_planner_name: any;
    policy_no: any;
    estimated_nac: any;
    estimated_comm: any;
    fp_share: any;
    pending_days: any;
    policy_owner: any;
    last_update: any;
    curr: any;
}
