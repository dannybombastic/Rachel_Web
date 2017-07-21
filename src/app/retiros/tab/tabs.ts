import { Component, ContentChildren, QueryList, AfterContentInit,EventEmitter,Output,ViewChild } from '@angular/core';
import { Tab } from './tab';

import {YogaService} from '../../../services/service.component';
@Component({
  selector: 'tabs',
  template:`
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a (click)="repaint();" href="#">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styleUrls:['tabstyle.css']
})
export class Tabs implements AfterContentInit {

  @ContentChildren(Tab) tabs: QueryList<Tab>;
   
 public yogas:YogaService;
  constructor(yoga:YogaService){
    this.yogas = yoga;

  }
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
     
  }
  
  selectTab(tab: Tab){
    
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
   // this.repaint();
    // activate the tab the user has clicked on.
    tab.active = true;
   tab.map.triggerResize();
  }

  repaint(){
      
   this.yogas.mapas = !this.yogas.mapas;
    
  }


}
