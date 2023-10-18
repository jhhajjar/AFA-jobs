import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Job } from '../job';
import { MatDialogRef } from '@angular/material/dialog';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-addjobmodal',
  templateUrl: './addjobmodal.component.html',
  styleUrls: ['./addjobmodal.component.css']
})
export class AddjobmodalComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  newJob: Job

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
      contactEmail: '',
    }
  }

  publishJob() {
    if ((this.newJob.title) && (this.newJob.author) && (this.newJob.description) && (this.newJob.location) && (this.newJob.contactEmail)) {
      this.jobservice.postJob(this.newJob).subscribe(() => this.dialogRef.close())
    }
  }
}
