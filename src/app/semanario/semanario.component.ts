import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { UsersFire } from "../../model/user.firebase";
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from "angularfire2/database";
import { FirebaseApp } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { Day } from "../../model/day";
import { Paket } from "../../model/paket";
declare var jQuery: any; // jquery
declare var $: any;
import * as firebase from "firebase/app";
import { YogaService } from "../../services/service.component";
import { Retiros } from "../../model/retiros";
import { Inst } from "../../model/inst";
import { Sarkers } from "../../model/markers";

import { AgmCoreModule } from "@agm/core";

@Component({
  selector: "semanario",
  templateUrl: "./semanario.component.html",
  styleUrls: ["semanario.component.css"]
})
export class SemanaComponent implements OnInit {
  public monday: FirebaseListObservable<any[]>;
  public truesday: FirebaseListObservable<any[]>;
  public wednesday: FirebaseListObservable<any[]>;
  public thrusday: FirebaseListObservable<any[]>;
  public friday: FirebaseListObservable<any[]>;
  public saturday: FirebaseListObservable<any[]>;
  public sunday: FirebaseListObservable<any[]>;

  constructor(
    private afAuth: AngularFireAuth,
    private af: AngularFireDatabase,
    private app: FirebaseApp,
    private yoga: YogaService
  ) {



  }

  ngOnInit() {

        this.monday = this.yoga.monday;
        this.truesday = this.yoga.truesday;
        this.wednesday = this.yoga.wednesday;
        this.thrusday = this.yoga.thrusday;
        this.friday = this.yoga.friday;
        this.saturday = this.yoga.saturday;
        this.sunday = this.yoga.sunday;


  }
}
