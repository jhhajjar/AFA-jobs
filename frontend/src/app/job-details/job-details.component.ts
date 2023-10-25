import { Component, Inject, Input } from '@angular/core';
import { Job } from '../job';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {
  jobInFocus: Job
  formattedDate: string
  urgency: string
  importanceOptions: string[] = [
    "Low Priority",
    "Medium Priority",
    "High Priority",
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: Job) {
    this.jobInFocus = this.data
    this.formattedDate = new Date(this.jobInFocus.createdAt).toDateString()
    this.urgency = this.importanceOptions[this.jobInFocus.importance]
  }
}
