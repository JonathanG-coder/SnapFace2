import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../services/candidates.service';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CandidateSearchType } from '../../enums/candidate-search-type.enum';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';




@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,

  ],
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
  }[];

  constructor(private candidatesService: CandidatesService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.candidatesService.getCandidatesFromServer();
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
      { value: CandidateSearchType.LASTNAME, label: 'Nom' },
      { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
      { value: CandidateSearchType.COMPANY, label: 'Entreprise' }
    ];
  }


  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );
    this.candidates$ = combineLatest([
      search$,
      searchType$,
      this.candidatesService.candidates$
    ]).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
        .toLowerCase()
        .includes(search as string)))
    );
  }
}