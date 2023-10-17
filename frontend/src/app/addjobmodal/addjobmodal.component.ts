import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addjobmodal',
  templateUrl: './addjobmodal.component.html',
  styleUrls: ['./addjobmodal.component.css']
})
export class AddjobmodalComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

}
