import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UsersFire } from '../../model/user.firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { Day } from '../../model/day';
import { Paket } from '../../model/paket';
declare var jQuery: any; // jquery
declare var $: any;
import * as firebase from 'firebase/app';
import { YogaService } from '../../services/service.component';
import { Retiros } from '../../model/retiros'
import { Inst } from '../../model/inst'
import { Sarkers } from '../../model/markers'

import { AgmCoreModule} from '@agm/core';




@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],

})

export class AdminComponent implements OnInit {

  public markers: Sarkers[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ];
  zoom: number = 8;
   public lat:number = 36.544148;
   public lng:number =-4.624943900000062;
    public int: Array<Inst> = new Array<Inst>();
    public retiro: Retiros;
    public day: Day;
    public list: FirebaseListObservable<any[]>;
    public user: Observable<firebase.User>;
    public dayOfWeek: number = 0;
    public week: string[] = ['monday', 'truesday', 'wednesday', 'thrusday', 'friday','saturday','sunday'];
    public monday: FirebaseListObservable<any[]>;
    public truesday: FirebaseListObservable<any[]>
    public wednesday: FirebaseListObservable<any[]>
    public thrusday: FirebaseListObservable<any[]>
    public friday: FirebaseListObservable<any[]>
        public saturday: FirebaseListObservable<any[]>
    public sunday: FirebaseListObservable<any[]>
    public retiroFirebase: FirebaseListObservable<any[]>

    public urls: string[] = [];
    public nameInstructor: string = '';
    public coment: string = '';
    public precio: string = '';
     public testimonios: string = '';
    public paquetes: string = '';
    public paquetesPrice:string = '';
    public descript: string = '';
    public paqut: Array<Paket>;
    public pics: string[] = [];
    public pics_2: string[] = [];
    public pics_3: string[] = [];
    public precios: string[] = [];
     public testimonio: string[] = [];
    public des: string[] = [];
    public paqModelo: Paket;
    public mar:Sarkers;
    constructor(
        private afAuth: AngularFireAuth,
        private af: AngularFireDatabase,
        private app: FirebaseApp,
        private yoga: YogaService
    ) {


     
        this.paqModelo = new Paket('', '');
        this.paqut = new Array<Paket>();
        this.user = afAuth.authState;
        this.retiro = new Retiros('', '', '', '', '', [], '', [], [], [],'',[], [],[], this.int);
        this.login();


       this.mar = new Sarkers(0,0,true)
        this.day = new Day('', '', [],'');


        this.user.subscribe((datas) => {

            console.log('usuario ', datas);
        });



    }




    ngOnInit() {

        this.monday = this.yoga.monday;
        this.truesday = this.yoga.truesday;
        this.wednesday = this.yoga.wednesday;
        this.thrusday = this.yoga.thrusday;
        this.friday = this.yoga.friday;
        this.saturday = this.yoga.saturday;
        this.sunday = this.yoga.sunday;
        this.retiroFirebase = this.yoga.retiros;
        

    this.yoga.p1$.subscribe((data)=>{

            this.pics_2.push(data);
    });
      this.yoga.p2$.subscribe((data)=>{

            this.pics_3.push(data);
    });

        this.yoga.i$.subscribe((data) => {

            this.int.push(data);

            console.log(this.yoga.Instructore);
            console.log(data);

        });

        this.yoga.p$.subscribe((data) => {
            this.pics.push(data);

        });

         this.yoga.t$.subscribe((data) => {

            this.testimonio.push(data);

        });

        this.yoga.r$.subscribe((data) => {

            this.precios.push(data);

        });
        this.yoga.pq$.subscribe((data) => {

              this.paqut.push(data);
            
           //    this.paqModel.name = ' ';
      //  this.paqModel.price = ' '
        },

            error => {


            });

    }



    login() {
        this.afAuth.auth.signInWithEmailAndPassword('dannybombastic@gmail.com', '659011563');
    }

    logout() {
        this.afAuth.auth.signOut();
    }



    addDay() {
        this.mar.lat = this.lat;
        this.mar.lng = this.lng;
        this.day.position.push(this.mar);
        this.list = this.af.list('/' + this.week[this.dayOfWeek]);
        this.list.push(this.day).then(key => {

            this.day.key = key.key;
            this.list.update(key, this.day).then(call => {

                this.day = new Day('', '', [],'')
            });

        });
    }

  //chooser for a day of the week
    diaSemana() {

        if (this.dayOfWeek == 6) {
            this.dayOfWeek = 0;
        } else {
            this.dayOfWeek++;
        }

    }

    clickNav() {
        //   $('#navq').toggle();
    }



    deleteEvent(parent: string, key: string) {

        this.af.list('/' + parent).remove(key);
        console.log(key);


    }




    subirFoto() {

        this.yoga.subirFotos(document)
    }

     subirCarousel() {

        this.yoga.subirFotosCarousel(document)
    }

    subirCarouseLast(){
          this.yoga.subirFotosCarousel_3(document)

    }


    subirInstructor() {


        this.yoga.subirFotosInstructores(document, this.coment,this.nameInstructor);
        this.coment = ' ';
        $("#file2").value = ' ';

    }

    addRetiro() {
        this.retiro.descripcion = this.des;
        this.yoga.subirRetiro(this.retiro);

    }

    subirPrecios() {

        this.yoga.subirPrecio(this.precio);
        this.precio = ' ';
    }

      subirTestimonio() {

        this.yoga.subirTestimonio(this.testimonios);
        this.testimonios = ' ';
    }

    subirPaquetes() {
    
        this.yoga.subirPaquetes(new Paket(this.paqModelo.name,this.paqModelo.price));
       this.paqModelo.name = ' ';
        this.paqModelo.price =' ';
     
    }


    subirDesc() {

        this.des.push(this.descript);
        this.descript = ' ';
        // $('.historia').append("<p> descript </p>")
        console.log(this.des);

    }

 
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: any) {
      this.lat = $event.coords.lat;
      this.lng = $event.coords.lng;
    this.markers[0] = new Sarkers($event.coords.lat,$event.coords.lng,true,"Estaremos por aqui");
  }
  
  markerDragEnd(m: Sarkers, $event: any) {
                this.lat = $event.coords.lat;;
                this.lng = $event.coords.lng;
                
    console.log('dragEnd', m, $event);
  }
   circleDragEnd($event: any) {
                this.lat = $event.coords.lat;;
                this.lng = $event.coords.lng;
                
    console.log('dragEnd', $event);
  }

borrarRetiro(key:string){

this.retiroFirebase.remove(key);

}


}



