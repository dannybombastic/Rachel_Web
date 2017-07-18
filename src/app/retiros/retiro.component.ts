import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersFire } from '../../model/user.firebase';
declare var jQuery: any; // jquery
declare var $: any;

import { YogaService } from '../../services/service.component';



@Component({
    selector: 'retiro',
    templateUrl: './retiro.component.html',
    styleUrls:['retiro.component.css']
})

export class RetiroComponent implements OnInit {


   public retiroFirebase: FirebaseListObservable<any[]>
      public user: Observable<firebase.User>;
    constructor(
        private afAuth: AngularFireAuth,
        private af: AngularFireDatabase,
        private app: FirebaseApp,
        private yoga:YogaService
    ) { 
          this.retiroFirebase = this.af.list('retiros');
   this.user = afAuth.authState;
          this.login();

           this.user.subscribe((datas) => {

            console.log('usuario ', datas);
        });
    }

    ngOnInit() { }


     login() {
        this.afAuth.auth.signInWithEmailAndPassword('dannybombastic@gmail.com', '659011563');
    }

    logout() {
        this.afAuth.auth.signOut();
    }


contact(){
  this.yoga.contact = true;

}

}