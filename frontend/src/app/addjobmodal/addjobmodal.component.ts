import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Job } from '../job';
import { MatDialogRef } from '@angular/material/dialog';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-addjobmodal',
  templateUrl: './addjobmodal.component.html',
  styleUrls: ['./addjobmodal.component.css']
})
export class AddjobmodalComponent {
  newJobForm: FormGroup;
  newJob: Job
  importanceOptions: string[] = [
    "Low Priority",
    "Medium Priority",
    "High Priority",
  ]

  constructor(
    public dialogRef: MatDialogRef<AddjobmodalComponent>,
    private jobservice: JobsService
  ) {
    this.newJob = {
      id: -1,
      title: '',
      description: '',
      author: '',
      location: '',
      importance: -1,
      createdAt: new Date(),
      contactEmail: '',
    }
    this.newJobForm = new FormGroup({
      formTitle: new FormControl('', Validators.required),
      formDescription: new FormControl('', Validators.required),
      formAuthor: new FormControl('', Validators.required),
      formLocation: new FormControl('', Validators.required),
      formImportance: new FormControl('', Validators.required),
      formContactEmail: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  publishJob() {
    if (this.newJobForm.valid) {
      this.newJob = {
        id: -1,
        title: this.newJobForm.get('formTitle')?.value,
        description: this.newJobForm.get('formDescription')?.value,
        author: this.newJobForm.get('formAuthor')?.value,
        location: this.newJobForm.get('formLocation')?.value,
        importance: this.importanceOptions.indexOf(this.newJobForm.get('formImportance')?.value),
        createdAt: new Date(),
        contactEmail: this.newJobForm.get('formContactEmail')?.value,
      }
      this.jobservice.postJob(this.newJob).subscribe(() => this.dialogRef.close())
    }
  }
}
