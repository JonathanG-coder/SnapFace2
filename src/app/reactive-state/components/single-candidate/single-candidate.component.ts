import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidatesService } from '../../services/candidates.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-candidate',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './single-candidate.component.html',
  styleUrl: './single-candidate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidateComponent {


  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  constructor(private candidatesService: CandidatesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.candidatesService.getCandidateById(+params['id']))
    );
  }

  onGoBack() {
    this.router.navigateByUrl('/reactive-state/candidates');
  }

  onRefuse() {
    this.candidate$.pipe(
        take(1),
        tap(candidate => {
            this.candidatesService.refuseCandidate(candidate.id);
            this.onGoBack();
        })
    ).subscribe();
}
  
  onHire() {
    throw new Error('Method not implemented.');
  }





}
