import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MembersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MembersRoutingModule
  ]
})
export class MembersModule { }
