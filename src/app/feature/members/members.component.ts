import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/core/models/Member';
import { MembersService } from 'src/app/core/services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(
    private membersService: MembersService,
    private toastrService: ToastrService
  ) { }

  @ViewChild('membersGrid') membersGrid!: AgGridAngular;
  public member = new Member();
  public members!: Member[];
  public bsConfig?: Partial<BsDatepickerConfig>;
  public membersForm = new FormGroup({
    title: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    surName: new FormControl(''),
    sex: new FormControl(''),
    birthDate: new FormControl(''),
    weddingDate: new FormControl(''),
    registrationDate: new FormControl(''),
    membershipDate: new FormControl(''),
    maritalStatus: new FormControl(''),
    baptizedHere: new FormControl(''),
    previousChurch: new FormControl(''),
    discipleshipTeacher: new FormControl(''),
    isServing: new FormControl(''),
    educationLevel: new FormControl(''),
    isInHomeCell: new FormControl(''),
    homeCellId: new FormControl(''),
    notInHomeCellReason: new FormControl(''),
    permitHomeForHomeCell: new FormControl(''),
    isInChurchSocialService: new FormControl(''),
    hasJob: new FormControl(''),
    occupation: new FormControl(''),
    company: new FormControl(''),
    responsibility: new FormControl(''),
    profession: new FormControl(''),
    otherAbilities: new FormControl(''),
    spouseTitle: new FormControl(''),
    spouseFullName: new FormControl(''),
    isSpouseBeliever: new FormControl(''),
    spouseChurch: new FormControl(''),
    spouseMaxEducationalLevel: new FormControl(''),
    femaleBelieverChildren: new FormControl(''),
    maleBelieverChildren: new FormControl(''),
    femaleNonBelieverChildren: new FormControl(''),
    maleNonBelieverChildren: new FormControl(''),
    ageOneToSeven: new FormControl(''),
    ageEightToThirteen: new FormControl(''),
    ageFourteenToThirty: new FormControl(''),
    eduKgToSix: new FormControl(''),
    eduSevenToTwelve: new FormControl(''),
    eduCollage: new FormControl(''),
    eduUniversity: new FormControl(''),
  });
  public columnDefs: ColDef[] = [
    { field: '', checkboxSelection: true },
    { field: 'title' },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'surName' },
    { field: 'sex' }
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
    //firstDataRendered: event => this.membersGrid.gridOptions.columnApi.autoSizeAllColumns(),

  };

  ngOnInit(): void {
    this.getMembers();
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
  }

  onSelectionChanged(params: any) {
    const selectedRows = this.membersGrid.api.getSelectedRows();
    this.getMember(selectedRows[0].id);
  }

  saveMember() {

    this.member.title = this.membersForm.get('title')?.value;

    if (this.member.id > 0) {
      return this.membersService.addMember(this.member).subscribe(
        result => {
          this.toastrService.success('Church Member updated successfully!', 'Updated!');
          this.getMembers();
          this.membersForm.reset({
            title: ''
          });
        });
    } else {
      return this.membersService.addMember(this.member).subscribe(
        memberId => {
          this.member.id = memberId;
          this.toastrService.success('Church Member added successfully!', 'Saved!');
          this.getMembers();
          this.membersForm.reset({
            title: ''
          });
        });
    }
  }

  getMember(id: number) {
    return this.membersService.getMember(id).subscribe(theMember => {
      this.membersForm.patchValue({
        title: theMember.title,
        firstName: theMember.firstName,
        lastName: theMember.lastName,

      });
      this.member = theMember;
    })
  }

  getMembers() {
    return this.membersService.getMembers().subscribe(theMembers => {
      this.members = theMembers;
    });
  }

}
