import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { CandidatesService } from './services/candidates.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveStateRoutingModule,
    SharedModule
  ],
  providers: [
    CandidatesService
  ]
})
export class ReactiveStateModule { }