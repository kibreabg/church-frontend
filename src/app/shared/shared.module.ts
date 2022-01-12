import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { AgGridModule } from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from './confirm/confirm.component';


@NgModule({
  declarations: [
    LayoutComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    AgGridModule.withComponents([]),
    ToastrModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutComponent,
    AgGridModule,
    ToastrModule,
    ModalModule
  ]
})
export class SharedModule { }
