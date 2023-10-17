import { Component, OnInit } from '@angular/core';
import { Job } from '../job';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  jobs: Job[] = []

  constructor(
    private jobsService: JobsService
  ) { }

  ngOnInit(): void {
    this.jobsService.getJobs().subscribe(
      response => {
        this.jobs = response
      }
    )
  }


}
