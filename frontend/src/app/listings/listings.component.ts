import { Component, OnInit } from '@angular/core';
import { Job } from '../job';
import { JobsService } from '../jobs.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsComponent } from '../job-details/job-details.component';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  jobs: Job[] = []
  loading: boolean = true

  constructor(
    public matDialog: MatDialog,
    private jobsService: JobsService
  ) { }

  ngOnInit(): void {
    this.jobsService.getJobs().subscribe(
      response => {
        this.jobs = response
        this.loading = false
      }
    )
  }

  openJobDetails(job: Job) {
    console.log(job);

    this.matDialog.open(JobDetailsComponent, { data: job })
  }
}
