import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RetiroComponent } from './retiros/retiro.component';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { SemanaComponent } from './semanario/semanario.component'

import { AgmCoreModule } from '@agm/core';

import { YogaService } from '../services/service.component';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';




export const firebaseConfig = {
    apiKey: "AIzaSyBVVu7lWgEoxQzhKWf_2QBvGu6ZJSBcFeQ",
    authDomain: "yoga-650ca.firebaseapp.com",
    databaseURL: "https://yoga-650ca.firebaseio.com",
    projectId: "yoga-650ca",
    storageBucket: "yoga-650ca.appspot.com",
    messagingSenderId: "27449788265"


}; 
 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    RetiroComponent,
    SemanaComponent

    

 
  ],
  imports: [
    BrowserModule,
    FormsModule,
     NgbModule.forRoot(),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routing,
    AgmCoreModule.forRoot({apiKey:'AIzaSyBVVu7lWgEoxQzhKWf_2QBvGu6ZJSBcFeQ'}),
    ScrollToModule.forRoot()
   
 
 





  ],
  providers: [ AngularFireAuthModule,appRoutingProviders, YogaService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
