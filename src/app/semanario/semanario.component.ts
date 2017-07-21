import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
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

import {
  AgmCoreModule,
  AgmMap,
  GoogleMapsAPIWrapper,
  MapsAPILoader
} from "@agm/core";

@Component({
  selector: "semanario",
  templateUrl: "./semanario.component.html",
  styleUrls: ["semanario.component.css"]
})
export class SemanaComponent implements OnInit {
  @ViewChild(AgmMap) myPap: AgmMap;

  public monday: FirebaseListObservable<any[]>;
  public truesday: FirebaseListObservable<any[]>;
  public wednesday: FirebaseListObservable<any[]>;
  public thrusday: FirebaseListObservable<any[]>;
  public friday: FirebaseListObservable<any[]>;      
  public saturday: FirebaseListObservable<any[]>;
  public sunday: FirebaseListObservable<any[]>;
  public lat:number =  51.5088233;
    public lng:number = -0.1296787;
  public lunes: boolean = false;
  public martes: boolean = false;
  public miercoles: boolean = false;
  public jueves: boolean = false;
  public viernes: boolean = false;
  public sabados: boolean = false;
  public domingos: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private af: AngularFireDatabase,
    private app: FirebaseApp,
    private yoga: YogaService,
    public gMaps: GoogleMapsAPIWrapper
  ) {}

  ngOnInit() {
    this.monday = this.yoga.monday;
    this.truesday = this.yoga.truesday;
    this.wednesday = this.yoga.wednesday;
    this.thrusday = this.yoga.thrusday;
    this.friday = this.yoga.friday;
    this.saturday = this.yoga.saturday;
    this.sunday = this.yoga.sunday;
  }

  despliegaLunes() {
    this.lunes = !this.lunes;
  }
   despliegaMartes() {
    this.martes = !this.martes;
  }
   despliegaMiercoles() {
    this.miercoles = !this.miercoles;
  }
   despliegaJueves() {
    this.jueves = !this.jueves;
  }
   despliegaViernes() {
    this.viernes = !this.viernes;
  }
   despliegaSabados() {
    this.sabados = !this.sabados;
  }
   despliegaDomingos() {
    this.domingos = !this.domingos;
  }

  latPas(lat,lng){
 this.lat = lat;
 this.lng = lng;
    

  }

  crearMapa() {
    jQuery(document).ready(() => {});
  }
}
