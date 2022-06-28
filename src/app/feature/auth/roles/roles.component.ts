import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/core/models/Role';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private modalService: BsModalService
  ) { }

  public modalRef?: BsModalRef;
  public role = new Role();
  public roles!: Role[];
  @ViewChild('rolesGrid') rolesGrid!: AgGridAngular;
  @ViewChild('confirmModal') confirmModal!: ConfirmComponent;
  public rolesForm = new FormGroup({
    roleName: new FormControl('', Validators.required),
  });

  public columnDefs: ColDef[] = [
    { field: '', headerName: 'Select', width: 80, checkboxSelection: true },
    { field: 'name', headerName: 'Role Name' }
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
    this.getRoles();
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
    const selectedRows = this.rolesGrid.api.getSelectedRows();
    this.getRole(selectedRows[0].id);
  }

  getRole(id: string) {
    return this.authService.getRole(id).subscribe(
      (theRole) => {
        this.rolesForm.patchValue({
          roleName: theRole.name
        });
        this.role = theRole;
      });

  }

  getRoles() {
    return this.authService.getRoles().subscribe(
      (theRoles) => {
        this.roles = theRoles;
      }
    );
  }

  saveRole() {
    if (this.rolesForm.valid) {
      this.role.name = this.rolesForm.get('roleName')?.value;

      if (this.role.id != '') {
        return this.authService.updateRole(this.role).subscribe(
          (result) => {
            this.toastrService.success('Role updated successfully!', 'Updated!');
            this.getRoles();
            this.rolesForm.reset({
            });
          },
          (errorResponse) => {
            this.toastrService.error('An Error Occured!', errorResponse.error.title);
          });
      } else {
        return this.authService.addRole(this.role).subscribe(
          (roleId) => {
            this.role.id = roleId;
            this.toastrService.success('Role added successfully!', 'Saved!');
            this.getRoles();
            this.rolesForm.reset({
            });
          },
          (errorResponse) => {
            this.toastrService.error('An Error Occured!', errorResponse.error.title);
          });
      }
    } else {
      return this.validateAllFormFields(this.rolesForm);
    }
  }

  deleteRole() {
    this.modalRef = this.modalService.show(ConfirmComponent, { class: 'modal-sm' });
    this.modalRef.content.onClose.subscribe(
      (response: any) => {
        if (response == true) {
          this.authService.deleteRole(this.role.id).subscribe(
            (result) => {
              if (result.succeeded) {
                this.toastrService.success('Role deleted successfully!', 'Deleted!');
                this.getRoles();
                this.rolesForm.reset({
                  roleName: ''
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
