import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  modalRef?: BsModalRef;
  message?: string;
  public onClose!: Subject<boolean>;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  openModal() {
    this.modalRef = this.modalService.show(ConfirmComponent, { class: 'modal-sm' });
  }

  confirm(): void {
    this.onClose.next(true);
    this.modalRef?.hide();
  }

  decline(): void {
    this.onClose.next(false);
    this.modalRef?.hide();
  }

}
