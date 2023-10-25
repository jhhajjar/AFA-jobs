import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingsComponent } from './listings/listings.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { JobsService } from './jobs.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AddjobmodalComponent } from './addjobmodal/addjobmodal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobDetailsComponent } from './job-details/job-details.component';
import { PreviewPipe } from './preview';

@NgModule({
  declarations: [
    AppComponent,
    ListingsComponent,
    ToolbarComponent,
    SidepanelComponent,
    AddjobmodalComponent,
    JobDetailsComponent,
    PreviewPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    JobsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
