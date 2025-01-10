import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../services/candidates.service';
import { Observable } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {

  loading$!: Observable<boolean>;
candidates$!: Observable<Candidate[]>;

constructor(private candidatesService: CandidatesService) {}

ngOnInit(): void {
  this.initObservables();
  this.candidatesService.getCandidatesFromServer();
}

private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    this.candidates$ = this.candidatesService.candidates$;
}


}