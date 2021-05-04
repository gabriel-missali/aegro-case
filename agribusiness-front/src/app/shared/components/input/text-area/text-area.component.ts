import { Component } from '@angular/core';
import { FieldCommonComponent } from '../field-common.component';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent extends FieldCommonComponent {

  constructor() {
    super();
  }

}
