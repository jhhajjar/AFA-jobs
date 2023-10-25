import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from './job';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  backendURL = "http://localhost:8080"

  getJobs(): Observable<Job[]> {
    const jobs = this.httpClient.get<Job[]>(`${this.backendURL}/allJobs`)
    return jobs
  }

  getJob(id: number): Observable<Job> {
    const job = this.httpClient.get<Job>(`${this.backendURL}/job/${id}`)
    return job
  }

  postJob(newJob: Job): Observable<Job> {
    console.log(newJob);

    return this.httpClient.post<Job>(`${this.backendURL}/createJob`, newJob)
  }
}
