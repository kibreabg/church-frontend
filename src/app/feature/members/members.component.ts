import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Member } from 'src/app/core/models/Member';
import { MembersService } from 'src/app/core/services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(private membersService: MembersService) { }

  @ViewChild('membersGrid') membersGrid!: AgGridAngular;
  public members!: Member[];

  columnDefs: ColDef[] = [
    { field: 'title' },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'surName' },
    { field: 'sex' }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  gridOptions = {
    // PROPERTIES
    pagination: true,
    paginationAutoPageSize: true,
    rowSelection: 'single',

    // EVENTS
    // Add event handlers
    //onRowClicked: event => null,
    //onGridReady: event => null,
    //firstDataRendered: event => this.membersGrid.gridOptions.columnApi.autoSizeAllColumns(),

  };

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    return this.membersService.getMembers().subscribe(theMembers => {
      this.members = theMembers;
    });
  }

}
