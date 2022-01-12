import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  modalRef?: BsModalRef;
  message?: string;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  openModal() {
    this.modalRef = this.modalService.show(ConfirmComponent, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

}
