import { Component, Input } from '@angular/core';
import {AgmMap} from "@agm/core";


@Component({
  selector: 'tab',
  styles: [`
    .pane{
      padding: 1em;
    }
  `],
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {

    
  @Input('tabTitle') title: string;
   @Input('map') map: AgmMap;
  @Input() active = false;

  constructor(){}
}