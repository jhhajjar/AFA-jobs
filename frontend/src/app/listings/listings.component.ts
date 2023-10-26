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
  jobsOnScreen: Job[] = []
  allJobsBackup: Job[] = []
  loading: boolean = true
  sortBy: string = ""
  keywords: string = ""

  constructor(
    public matDialog: MatDialog,
    private jobsService: JobsService
  ) { }

  ngOnInit(): void {
    this.jobsService.getJobs().subscribe(
      response => {
        this.jobsOnScreen = response
        this.allJobsBackup = response
        this.loading = false
      }
    )
  }

  openJobDetails(job: Job) {
    this.matDialog.open(JobDetailsComponent, { data: job })
  }

  applyFilters() {
    if ((this.sortBy) || (this.keywords)) {
      this.applyKeywordsFilter()
      this.sortJobs()
    } else {
      this.jobsOnScreen = this.allJobsBackup
    }
  }

  applyKeywordsFilter() {
    this.jobsOnScreen = this.allJobsBackup.filter((job) => {
      return ((job.description.toLowerCase().includes(this.keywords)) || (job.title.toLowerCase().includes(this.keywords)))
    })
  }

  sortJobs() {
    if (this.sortBy == "Date Posted") {
      console.log("Sortiny by date posted");
      this.jobsOnScreen = this.allJobsBackup.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    }
    else if (this.sortBy == "Importance") {
      console.log("Sortiny by importance");
      this.jobsOnScreen = this.allJobsBackup.sort((a, b) => (a.importance > b.importance ? -1 : 1))
    }
  }

}
