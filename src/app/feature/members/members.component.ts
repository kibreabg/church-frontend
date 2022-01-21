import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/core/models/Member';
import { MembersService } from 'src/app/core/services/members.service';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(
    private membersService: MembersService,
    private toastrService: ToastrService,
    private modalService: BsModalService
  ) { }

  @ViewChild('membersGrid') membersGrid!: AgGridAngular;
  public modalRef?: BsModalRef;
  public member = new Member();
  public members!: Member[];
  public bsConfig?: Partial<BsDatepickerConfig>;
  public membersForm = new FormGroup({
    title: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    surName: new FormControl(''),
    sex: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    weddingDate: new FormControl('', Validators.required),
    registrationDate: new FormControl('', Validators.required),
    membershipDate: new FormControl('', Validators.required),
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
    femaleBelieverChildren: new FormControl(0),
    maleBelieverChildren: new FormControl(0),
    femaleNonBelieverChildren: new FormControl(0),
    maleNonBelieverChildren: new FormControl(0),
    ageOneToSeven: new FormControl(0),
    ageEightToThirteen: new FormControl(0),
    ageFourteenToThirty: new FormControl(0),
    eduKgToSix: new FormControl(0),
    eduSevenToTwelve: new FormControl(0),
    eduCollage: new FormControl(0),
    eduUniversity: new FormControl(0),
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

    //#region Get Member Form Values
    this.member.title = this.membersForm.get('title')?.value;
    this.member.firstName = this.membersForm.get('firstName')?.value;
    this.member.lastName = this.membersForm.get('lastName')?.value;
    this.member.surName = this.membersForm.get('surName')?.value;
    this.member.sex = this.membersForm.get('sex')?.value;
    this.member.birthDate = this.membersForm.get('birthDate')?.value;
    this.member.weddingDate = this.membersForm.get('weddingDate')?.value;
    this.member.registrationDate = this.membersForm.get('registrationDate')?.value;
    this.member.membershipDate = this.membersForm.get('membershipDate')?.value;
    this.member.maritalStatus = this.membersForm.get('maritalStatus')?.value;
    this.member.baptizedHere = this.membersForm.get('baptizedHere')?.value;
    this.member.previousChurch = this.membersForm.get('previousChurch')?.value;
    this.member.discipleshipTeacher = this.membersForm.get('discipleshipTeacher')?.value;
    this.member.isServing = this.membersForm.get('isServing')?.value;
    this.member.educationLevel = this.membersForm.get('educationLevel')?.value;
    this.member.isInHomeCell = this.membersForm.get('isInHomeCell')?.value;
    this.member.homeCellId = this.membersForm.get('homeCellId')?.value;
    this.member.notInHomeCellReason = this.membersForm.get('notInHomeCellReason')?.value;
    this.member.permitHomeForHomeCell = this.membersForm.get('permitHomeForHomeCell')?.value;
    this.member.isInChurchSocialService = this.membersForm.get('isInChurchSocialService')?.value;
    this.member.hasJob = this.membersForm.get('hasJob')?.value;
    this.member.occupation = this.membersForm.get('occupation')?.value;
    this.member.company = this.membersForm.get('company')?.value;
    this.member.responsibility = this.membersForm.get('responsibility')?.value;
    this.member.profession = this.membersForm.get('profession')?.value;
    this.member.otherAbilities = this.membersForm.get('otherAbilities')?.value;
    this.member.spouseTitle = this.membersForm.get('spouseTitle')?.value;
    this.member.spouseFullName = this.membersForm.get('spouseFullName')?.value;
    this.member.isSpouseBeliever = this.membersForm.get('isSpouseBeliever')?.value;
    this.member.spouseChurch = this.membersForm.get('spouseChurch')?.value;
    this.member.spouseMaxEducationalLevel = this.membersForm.get('spouseMaxEducationalLevel')?.value;
    this.member.femaleBelieverChildren = this.membersForm.get('femaleBelieverChildren')?.value;
    this.member.maleBelieverChildren = this.membersForm.get('maleBelieverChildren')?.value;
    this.member.femaleNonBelieverChildren = this.membersForm.get('femaleNonBelieverChildren')?.value;
    this.member.maleNonBelieverChildren = this.membersForm.get('maleNonBelieverChildren')?.value;
    this.member.ageOneToSeven = this.membersForm.get('ageOneToSeven')?.value;
    this.member.ageEightToThirteen = this.membersForm.get('ageEightToThirteen')?.value;
    this.member.ageFourteenToThirty = this.membersForm.get('ageFourteenToThirty')?.value;
    this.member.eduKgToSix = this.membersForm.get('eduKgToSix')?.value;
    this.member.eduSevenToTwelve = this.membersForm.get('eduSevenToTwelve')?.value;
    this.member.eduCollage = this.membersForm.get('eduCollage')?.value;
    this.member.eduUniversity = this.membersForm.get('eduUniversity')?.value;
    //#endregion

    console.log(this.membersForm.value);

    if (this.member.id > 0) {
      return this.membersService.updateMember(this.member).subscribe(
        result => {
          this.toastrService.success('Church Member updated successfully!', 'Updated!');
          this.getMembers();
          this.membersForm.reset({
          });
        });
    } else {
      return this.membersService.addMember(this.member).subscribe(
        memberId => {
          this.member.id = memberId;
          this.toastrService.success('Church Member added successfully!', 'Saved!');
          this.getMembers();
          this.membersForm.reset({
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
        surName: theMember.surName,
        sex: theMember.sex,
        birthDate: new Date(theMember.birthDate),
        weddingDate: new Date(theMember.weddingDate),
        registrationDate: new Date(theMember.registrationDate),
        membershipDate: new Date(theMember.membershipDate),
        maritalStatus: theMember.maritalStatus,
        baptizedHere: theMember.baptizedHere,
        previousChurch: theMember.previousChurch,
        discipleshipTeacher: theMember.discipleshipTeacher,
        isServing: theMember.isServing,
        educationLevel: theMember.educationLevel,
        isInHomeCell: theMember.isInHomeCell,
        homeCellId: theMember.homeCellId,
        notInHomeCellReason: theMember.notInHomeCellReason,
        permitHomeForHomeCell: theMember.permitHomeForHomeCell,
        isInChurchSocialService: theMember.isInChurchSocialService,
        hasJob: theMember.hasJob,
        occupation: theMember.occupation,
        company: theMember.company,
        responsibility: theMember.responsibility,
        profession: theMember.profession,
        otherAbilities: theMember.otherAbilities,
        spouseTitle: theMember.spouseTitle,
        spouseFullName: theMember.spouseFullName,
        isSpouseBeliever: theMember.isSpouseBeliever,
        spouseChurch: theMember.spouseChurch,
        spouseMaxEducationalLevel: theMember.spouseMaxEducationalLevel,
        femaleBelieverChildren: theMember.femaleBelieverChildren,
        maleBelieverChildren: theMember.maleBelieverChildren,
        femaleNonBelieverChildren: theMember.femaleNonBelieverChildren,
        maleNonBelieverChildren: theMember.maleNonBelieverChildren,
        ageOneToSeven: theMember.ageOneToSeven,
        ageEightToThirteen: theMember.ageEightToThirteen,
        ageFourteenToThirty: theMember.ageFourteenToThirty,
        eduKgToSix: theMember.eduKgToSix,
        eduSevenToTwelve: theMember.eduSevenToTwelve,
        eduCollage: theMember.eduCollage,
        eduUniversity: theMember.eduUniversity
      });
      this.member = theMember;
    });
  }

  getMembers() {
    return this.membersService.getMembers().subscribe(theMembers => {
      this.members = theMembers;
    });
  }

  deleteMember() {
    this.modalRef = this.modalService.show(ConfirmComponent, { class: 'modal-sm' });
    this.modalRef.content.onClose.subscribe((result: any) => {
      if (result == true) {
        this.membersService.deleteMember(this.member.id).subscribe(result => {
          this.getMembers();
          this.toastrService.error('Church member data deleted successfully!', 'Deleted!');
          this.membersForm.reset();
          this.modalRef?.hide();
        });
      } else {
        this.modalRef?.hide();
      }
    });
  }
}
