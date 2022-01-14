import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/core/models/Service';
import { ServicesService } from 'src/app/core/services/services.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(
    private servicesService: ServicesService,
    private toastrService: ToastrService,
    private modalService: BsModalService
  ) { }

  public modalRef?: BsModalRef;
  public service = new Service();
  @ViewChild('servicesGrid') servicesGrid!: AgGridAngular;
  @ViewChild('confirmModal') confirmModal!: ConfirmComponent;
  public services!: Service[];
  public servicesForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  public columnDefs: ColDef[] = [
    { field: '', checkboxSelection: true },
    { field: 'name' }
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
    this.getServices();
  }

  onSelectionChanged(params: any) {
    const selectedRows = this.servicesGrid.api.getSelectedRows();
    this.getService(selectedRows[0].id);
  }

  saveService() {

    this.service.name = this.servicesForm.get('name')?.value;

    if (this.service.id > 0) {
      return this.servicesService.updateService(this.service).subscribe(
        result => {
          this.toastrService.success('Church Service updated successfully!', 'Updated!');
          this.getServices();
          this.servicesForm.reset({
            name: ''
          });
        });
    } else {
      return this.servicesService.addService(this.service).subscribe(
        serviceId => {
          this.service.id = serviceId;
          this.toastrService.success('Church Service added successfully!', 'Saved!');
          this.getServices();
          this.servicesForm.reset({
            name: ''
          });
        });
    }


  }

  getService(id: number) {
    return this.servicesService.getService(id).subscribe(theService => {
      this.servicesForm.patchValue({
        name: theService.name
      });
      this.service = theService;
    });
  }

  getServices() {
    return this.servicesService.getServices().subscribe(theServices => {
      this.services = theServices;
      this.service = new Service();
    });
  }

  deleteService() {
    this.modalRef = this.modalService.show(ConfirmComponent, { class: 'modal-sm' });
    this.modalRef.content.onClose.subscribe((result: any) => {
      if (result == true) {
        this.servicesService.deleteService(this.service.id).subscribe(result => {
          this.getServices();
          this.servicesForm.reset({
            name: ''
          });
        });
        this.toastrService.error('Church Service deleted successfully!');
        this.modalRef?.hide();
      } else {
        this.modalRef?.hide();
      }
    });
  }
}
