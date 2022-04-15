import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private modalService: BsModalService
  ) { }

  public modalRef?: BsModalRef;
  public user = new User();
  public users!: User[];
  @ViewChild('usersGrid') usersGrid!: AgGridAngular;
  @ViewChild('confirmModal') confirmModal!: ConfirmComponent;
  public usersForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
  });

  public columnDefs: ColDef[] = [
    { field: '', checkboxSelection: true },
    { field: 'userName', headerName: 'User Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phoneNumber', headerName: 'Phone Number' }
  ];
  public gridOptions = {
    // PROPERTIES
    pagination: true,
    paginationAutoPageSize: true,
    rowSelection: 'single',

    // EVENTS
    // Add event handlers
    //onRowClicked: event => null,
    //onGridReady: event => null,
    //firstDataRendered: event => this.servicesGrid.gridOptions.columnApi.autoSizeAllColumns(),

  };

  ngOnInit(): void {
    this.getUsers();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSelectionChanged(params: any) {
    const selectedRows = this.usersGrid.api.getSelectedRows();
    this.getUser(selectedRows[0].id);
  }

  getUser(id: string) {
    return this.authService.getUser(id).subscribe(
      (theUser) => {
        this.usersForm.patchValue({
          userName: theUser.userName,
          email: theUser.email,
          phoneNumber: theUser.phoneNumber
        });
        this.user = theUser;
      });

  }

  getUsers() {
    return this.authService.getUsers().subscribe(
      (theUsers) => {
        this.users = theUsers;
        this.user = new User();
      });
  }

  saveUser() {
    if (this.usersForm.valid) {
      this.user.userName = this.usersForm.get('userName')?.value;
      this.user.email = this.usersForm.get('email')?.value;
      this.user.phoneNumber = this.usersForm.get('phoneNumber')?.value;

      if (this.user.id != '') {
        return this.authService.updateUser(this.user).subscribe(
          (result) => {
            this.toastrService.success('Church App User updated successfully!', 'Updated!');
            this.getUsers();
            this.usersForm.reset({
            });
          },
          (errorResponse) => {
            this.toastrService.error('An Error Occured!', errorResponse.error.title);
          });
      } else {
        return this.authService.addUser(this.user).subscribe(
          (userId) => {
            this.user.id = userId;
            this.toastrService.success('Church App User added successfully!', 'Saved!');
            this.getUsers();
            this.usersForm.reset({
            });
          },
          (errorResponse) => {
            this.toastrService.error('An Error Occured!', errorResponse.error.title);
          });
      }
    } else {
      return this.validateAllFormFields(this.usersForm);
    }
  }

  deleteUser() {
    this.modalRef = this.modalService.show(ConfirmComponent, { class: 'modal-sm' });
    this.modalRef.content.onClose.subscribe(
      (response: any) => {
        if (response == true) {
          this.authService.deleteUser(this.user.id).subscribe(
            (result) => {
              if (result.succeeded) {
                this.toastrService.success('Uer deleted successfully!', 'Deleted!');
                this.getUsers();
                this.usersForm.reset({
                  userName: '', email: '', phoneNumber: ''
                });
              }
            },
            (errorResponse) => {
              this.toastrService.error('Something went wrong', errorResponse.error);
            });

          this.modalRef?.hide();
        } else {
          this.modalRef?.hide();
        }
      });
  }

}
