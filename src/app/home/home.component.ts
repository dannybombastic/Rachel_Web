import { Component, OnInit,ViewChild,Inject,Injectable } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { FirebaseApp } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import {  Http, Response, Headers, RequestOptions, RequestMethod} from "@angular/http";
import { Email } from "../../model/email";
import { YogaService } from "../../services/service.component";
import { ScrollToService } from 'ng2-scroll-to-el';

declare var jQuery: any; // jquery
declare var $: any;

import * as firebase from "firebase/app";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

   

  public configDatas: string = "";
  public telefono: string = "";
  public nombre: string = "";
  public emailFrom:string = '';
  public title: string = "hola";
  public user: Observable<firebase.User>;
  public list: FirebaseListObservable<any[]>;
  public truesday: FirebaseListObservable<any[]>;
  public wednesday: FirebaseListObservable<any[]>;
  public thrusday: FirebaseListObservable<any[]>;
  public friday: FirebaseListObservable<any[]>;
  public email: Email;


  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    private app: FirebaseApp,
    private ht: Http,
    private route: ActivatedRoute,
    private yoga: YogaService,
    private scrollService: ScrollToService
  
  ) {


console.log('hecho');
    
             
         
                if (this.yoga.contact) {
    jQuery(document).ready(() => {
                this.scrollService.scrollTo(document.getElementById('contact'),2000,-120); 
             });
                 }
                this.yoga.contact = false;
    this.email = new Email("", "", "", "");
    this.login();
    //this.Send();

    this.user = this.afAuth.authState;
    this.user.subscribe(data => {
      console.log(data);
    });

   
  }

  ngOnInit() {
         
    this.list = this.af.list("/monday");
    this.truesday = this.af.list("/truesday");
    this.wednesday = this.af.list("/wednesday");
    this.thrusday = this.af.list("/thrusday");
    this.friday = this.af.list("/friday");

    /*
        this.list = this.af.list('/users',{preserveSnapshot:true});
        this.list.subscribe(snap=>{
                snap.forEach(element => {
                    this.userFire.push(<UsersFire>element.val());
                });
            console.log(this.userFire);
        });
           */
  }

  clickNav() {
   $('#contact').scroll();
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(
      "dannybombastic@gmail.com",
      "659011563"
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  // sendin an email via http and nodemailer STMP

  Send() {
    let body = {
      from: this.email.from,
      to: this.email.to,
      subject: this.email.subject,
      text: this.email.text
    };

   this.email.text =this.email.text.concat( ", TLF:  " + this.telefono + " NAME :" + this.nombre+",   "+this.emailFrom );

    this.email.to = "dannybombastic@gmail.com";

    let json = this.email;
    let params = json;
    let headers = new Headers({ "Content-Type": "application/json" });

    this.ht.post("http://31.220.111.56:3000/emails", params, { headers: headers }).subscribe( result => {

          console.log("res----", result);
      
        },
      
      
  error => {

          console.log(<any>error);

        }
      );

    console.log(this.email);
  }

  choosSubject() {
    this.email.subject = this.configDatas;
    console.log(this.configDatas);
  }

  navegar() {}
}
