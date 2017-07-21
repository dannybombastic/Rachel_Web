import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from "angularfire2/database";
import { FirebaseApp } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";

import { Inst } from "../model/inst";
import { Retiros } from "../model/retiros";
import { Paket } from "../model/paket";
declare var jQuery: any; // jquery
declare var $: any;
import * as firebase from "firebase";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()
export class YogaService {
  public instructor_subido = new Subject<Inst>();
  public i$ = this.instructor_subido.asObservable();
  public contact: boolean = false;
  public pic_retiro = new Subject<string>();
  public p$ = this.pic_retiro.asObservable();
  public pic_retiro_2 = new Subject<string>();
  public p1$ = this.pic_retiro_2.asObservable();
  public pic_retiro_3 = new Subject<string>();
  public p2$ = this.pic_retiro_3.asObservable();

  public retiro_testimonios = new Subject<string>();
  public t$ = this.retiro_testimonios.asObservable();
  public retiro_precios = new Subject<string>();
  public r$ = this.retiro_precios.asObservable();
  public retiro_paquetes = new Subject<Paket>();
  public pq$ = this.retiro_paquetes.asObservable();

  public monday: FirebaseListObservable<any[]>;
  public truesday: FirebaseListObservable<any[]>;
  public wednesday: FirebaseListObservable<any[]>;
  public thrusday: FirebaseListObservable<any[]>;
  public friday: FirebaseListObservable<any[]>;
  public saturday: FirebaseListObservable<any[]>;
  public sunday: FirebaseListObservable<any[]>;
  public retiros: FirebaseListObservable<any[]>;

  public paqModel: Paket;
  public fotos: string[] = [];
  public fotos_2: string[] = [];
  public fotos_3: string[] = [];
  public precios: string[] = [];
  public testi: string[] = [];
  public paquetes: Array<Paket>;
  public Instructore: Array<Inst>;
  public strRef: any = "";
  public int: Inst;
  public mapas: boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    private _app: FirebaseApp
  ) {
    this.paqModel = new Paket("", "");
    this.paquetes = new Array<Paket>();
    this.Instructore = new Array<Inst>();

    this.strRef = firebase.storage(this._app).ref("images");
    this.monday = this.af.list("/monday");
    this.truesday = this.af.list("/truesday");
    this.wednesday = this.af.list("/wednesday");
    this.thrusday = this.af.list("/thrusday");
    this.friday = this.af.list("/friday");
    this.retiros = this.af.list("retiros");
    this.saturday = this.af.list("/saturday");
    this.sunday = this.af.list("/sunday");
  }

  subirFotos(element: HTMLDocument): string[] {
    for (let selectedFile of [
      (<HTMLInputElement>element.getElementById("file")).files[0]
    ]) {
      console.log(selectedFile);
      // Make local copies of services because "this" will be clobbered
      var date = new Date();
      var hor =
        date.getDate() + " " + date.getMilliseconds() + " " + date.getTime();
      let folder = "imagenes";
      let path = `/${folder}/${selectedFile.name + "rachel" + hor}`;
      var iRef = this.strRef.child(path);

      iRef.put(selectedFile).then(
        snapshot => {
          this.fotos.push(snapshot.downloadURL);
          this.pic_retiro.next(snapshot.downloadURL);

          console.log(
            "Uploaded a blob or file! Now storing the reference at",
            `/${folder}/images/`
          );
        },
        error => {
          console.log(<any>error);
        }
      );
    }
    return this.fotos;
  }

  subirFotosCarousel(element: HTMLDocument): string[] {
    for (let selectedFile of [
      (<HTMLInputElement>element.getElementById("file3")).files[0]
    ]) {
      console.log(selectedFile);
      // Make local copies of services because "this" will be clobbered
      var date = new Date();
      var hor =
        date.getDate() + " " + date.getMilliseconds() + " " + date.getTime();
      let folder = "imagenes";
      let path = `/${folder}/${selectedFile.name + "rachel" + hor}`;
      var iRef = this.strRef.child(path);

      iRef.put(selectedFile).then(
        snapshot => {
          this.fotos_2.push(snapshot.downloadURL);
          this.pic_retiro_2.next(snapshot.downloadURL);

          console.log(
            "Uploaded a blob or file! Now storing the reference at",
            `/${folder}/images/`
          );
        },
        error => {
          console.log(<any>error);
        }
      );
    }
    return this.fotos;
  }

  subirFotosCarousel_3(element: HTMLDocument): string[] {
    for (let selectedFile of [
      (<HTMLInputElement>element.getElementById("file4")).files[0]
    ]) {
      console.log(selectedFile);
      // Make local copies of services because "this" will be clobbered
      var date = new Date();
      var hor =
        date.getDate() + " " + date.getMilliseconds() + " " + date.getTime();
      let folder = "imagenes";
      let path = `/${folder}/${selectedFile.name + "rachel" + hor}`;
      var iRef = this.strRef.child(path);

      iRef.put(selectedFile).then(
        snapshot => {
          this.fotos_3.push(snapshot.downloadURL);
          this.pic_retiro_3.next(snapshot.downloadURL);

          console.log(
            "Uploaded a blob or file! Now storing the reference at",
            `/${folder}/images/`
          );
        },
        error => {
          console.log(<any>error);
        }
      );
    }
    return this.fotos;
  }

  subirFotosInstructores(
    element: HTMLDocument,
    coment: string,
    name: string
  ): string[] {
    this.int = new Inst("", "", "");
    let selectedFile = (<HTMLInputElement>element.getElementById("file2"))
      .files[0];
    console.log(selectedFile);
    // Make local copies of services because "this" will be clobbered
    var date = new Date();
    var hor =
      date.getDate() + " " + date.getMilliseconds() + " " + date.getTime();

    let folder = "imagenes";
    let path = `/${folder}/${selectedFile.name + "rachel" + hor}`;
    var iRef = this.strRef.child(path);

    iRef.put(selectedFile).then(
      snapshot => {
        this.int.coment = coment;
        this.int.pic = snapshot.downloadURL;
        this.int.name = name;
        this.Instructore.push(this.int);
        this.instructor_subido.next(this.int);
        console.log(
          "Uploaded a blob or file! Now storing the reference at",
          `/${folder}/images/`
        );
      },
      error => {
        console.log(<any>error);
      }
    );

    return this.fotos;
  }

  subirRetiro(retiro: Retiros) {
    retiro.inst = [];

    retiro.inst = this.Instructore;
    retiro.fotos = this.fotos;
    retiro.precio = this.precios;
    retiro.fotos_dos = this.fotos_3;
    retiro.fotos_tres = this.fotos_3;
    retiro.paquetes = this.paquetes;
    retiro.precio = this.precios;
    retiro.testimonios = this.testi;
    retiro.key = this.retiros.push(retiro).key;
    this.retiros.update(retiro.key, retiro);
  }

  subirPrecio(precio: string) {
    this.precios.push(precio);
    this.retiro_precios.next(precio);
  }
  subirTestimonio(testimonio: string) {
    this.testi.push(testimonio);
    this.retiro_testimonios.next(testimonio);
  }

  subirPaquetes(paquete: Paket) {
    this.paquetes.push(new Paket(paquete.name, paquete.price));
    this.retiro_paquetes.next(paquete);
  }
}
