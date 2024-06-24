import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-flat-owner-update',
  templateUrl: './flat-owner-update.component.html',
  styleUrls: ['./flat-owner-update.component.scss'],
})
export class FlatOwnerUpdateComponent implements OnInit {
  RegFlatForm!: FormGroup;
  familyCount!: number;
  AddFamilyInput: { count: number }[] = [];
  onCarSelect = false;
  cars: any[] = [];
  addAnotherCars = true;
  CarsCount: any;
  WIDTH = 200;
  HEIGHT = 200;
  @ViewChild("video") public video!: ElementRef;
  @ViewChild("canvas") public canvas!: ElementRef;
  captures: string[] = [];
  error: any;
  onGalleryImg = true;
  onCameraOpen = true;
  onCaptureImg = false;
  gallery_select: any = null;
  gallery_img_url: any;
  building_block: any;
  building_num: any;
  passwordsMatch = false;
  edit_reg: any;
  img_url: any;
  imageSelected = false;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _crud: CurdService,
    private _shared: SharedService
  ) {
    this._shared.img_base_url.subscribe(
      (res: any) => {
        this.img_url = res;
      }
    );
  }

  ngOnInit() {
    this.initForm();
    this.fetchDropdownData();
    this.subscribeSharedDetails();
    this.populateFormArrays();
  }

  initForm() {
    this.RegFlatForm = this._fb.group({
      Id: [''],
      buildingBlock: ['', Validators.required],
      flatNum: ['', Validators.required],
      flatOwnerName: ['', Validators.required],
      ownerDesignation: [''],
      primaryNumber: ['', Validators.required],
      alternatePhoneNum: [''],
      ownerEmail: ['', Validators.required],
      aadharNumber: [''],
      totalFamilyMember: [],
      havingCar: [true],
      password: [''],
      empConfirmPass: [''],
      profile: [''],
      familyDataList: this._fb.array([]),
      familyCarData: this._fb.array([])
    });
  }

  fetchDropdownData(): void {
    this._crud.get_building_block().subscribe((res: any) => {
      this.building_block = res.Data;
    });
  }
  get_filter_by_flat_num(building_id: any) {
    const flat_building_no = building_id.detail.value
    this._crud.get_flat_number(flat_building_no).subscribe(
      (res: any) => {
        this.building_num = res.Data
        console.log(this.building_num, 'value flat no');
      }
    )
  }

  subscribeSharedDetails() {
    this._shared.shared_details.subscribe(
      (res: any) => {
        this.edit_reg = res;
        console.log(res);
        if (this.edit_reg) {
          this.RegFlatForm.patchValue(this.edit_reg)
          this.RegFlatForm.controls['empConfirmPass'].setValue(this.edit_reg.password);
          this.RegFlatForm.controls['totalFamilyMember'].setValue(this.edit_reg.flatOwnerName);
          this.RegFlatForm.controls['havingCar'].setValue(this.edit_reg.havingCar === 'Yes');
        }
      }
    );
  }

  populateFormArrays() {
    const familyCountArray = this.RegFlatForm.get('familyDataList') as FormArray;
    familyCountArray.clear();
    this.edit_reg.familyDataList.forEach((member: any, index: number) => {
      const memberGroup = this._fb.group({
        [`MemberName${index + 1}`]: [member.MemberName],
        [`MemberAge${index + 1}`]: [member.MemberAge],
        [`MemberContactNum${index + 1}`]: [member.MemberContact]
      });
      familyCountArray.push(memberGroup);
    });

    const familyCarsArray = this.RegFlatForm.get('familyCarData') as FormArray;
    familyCarsArray.clear();
    this.edit_reg.familyCarData.forEach((cars: any, index: number) => {
      const CarsGroup = this._fb.group({
        [`carModel${index + 1}`]: [cars.carModel],
        [`carNumber${index + 1}`]: [cars.carNumber],
        [`parkingArea${index + 1}`]: [cars.parkingArea]
      });
      familyCarsArray.push(CarsGroup);
    });
  }

  get membersArray() {
    return this.RegFlatForm.get('familyDataList') as FormArray;
  }

  get CarsArray() {
    return this.RegFlatForm.get('familyCarData') as FormArray;
  }

  addMemberControls() {
    const memberNumber = this.membersArray.length + 1;
    const memberGroup = this._fb.group({
      [`MemberName${memberNumber}`]: [''],
      [`MemberAge${memberNumber}`]: [''],
      [`MemberContactNum${memberNumber}`]: ['']
    });
    this.membersArray.push(memberGroup);
  }

  addCarsControls() {
    const CarsNumber = this.CarsArray.length + 1;
    const CarsGroup = this._fb.group({
      [`carModel${CarsNumber}`]: [''],
      [`carNumber${CarsNumber}`]: [''],
      [`parkingArea${CarsNumber}`]: ['']
    });
    this.CarsArray.push(CarsGroup);
  }

  onFamilyInput(event: any) {
    const familyCount = parseInt(event.target.value);

    while (this.membersArray.length !== 0) {
      this.membersArray.removeAt(0);
    }

    for (let i = 0; i < familyCount; i++) {
      if (familyCount > 7) {
        event.target.setCustomValidity('Maximum 7 members allowed.');
        return;
      } else {
        event.target.setCustomValidity('');
        this.addMemberControls();
      }
    }
  }

  toggleCarInput(event: any) {
    this.onCarSelect = event.detail.checked;
    if (this.CarsArray.length > 0) {
      this.CarsArray.removeAt(0);
    } else {
      this.addCarsControls();
    }
  }

  addAnotherCar() {
    this.addAnotherCars = false;
    this.addCarsControls();
  }

  removeAnotherCar(index: number) {
    this.addAnotherCars = true;
    this.CarsArray.removeAt(index + 1);
  }

  StartCamera() {
    this.onCameraOpen = false;
    this.onGalleryImg = true;
    this.onCaptureImg = true;
    this.imageSelected = true;
    this.setupDevices();
  }

  async setupDevices() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
        this.error = null;
      } else {
        this.error = "You have no output video device";
      }
    } catch (e) {
      this.error = e;
    }
  }

  capture() {
    if (this.video.nativeElement.srcObject) {
      this.onCameraOpen = true;
      this.onGalleryImg = true;
      this.drawImageToCanvas(this.video.nativeElement);
      this.canvas.nativeElement.toBlob((blob: any) => {
        const captureImg = new File([blob], 'captured_image.png', {
          lastModified: Date.now(),
          type: 'image/png'
        });
        this.gallery_select = captureImg;
        alert('Successfully captured image.');
        const stream = this.video.nativeElement.srcObject;
        const tracks = stream.getTracks();
        tracks[0].stop();
      });
    } else {
      alert('Video stream not initialized.');
    }
  }

  drawImageToCanvas(image: any) {
    this.onCameraOpen = true;
    this.onGalleryImg = true;
    this.canvas.nativeElement.getContext("2d").drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  OnGallery(files: any) {
    this.onCaptureImg = false;
    this.onGalleryImg = false;
    this.imageSelected = true;
    this.onCameraOpen = true;
    let reader = new FileReader();
    this.gallery_select = files[0];
    reader.onload = () => {
      this.gallery_img_url = reader.result;
    };
    reader.readAsDataURL(this.gallery_select);
  }

  onUpdate(): void {
    const updateData = new FormData();
    updateData.append('Id', this.RegFlatForm.get('Id')?.value);
    updateData.append('buildingBlock', this.RegFlatForm.get('buildingBlock')?.value);
    updateData.append('flatNum', this.RegFlatForm.get('flatNum')?.value);
    updateData.append('flatOwnerName', this.RegFlatForm.get('flatOwnerName')?.value);
    updateData.append('ownerDesignation', this.RegFlatForm.get('ownerDesignation')?.value);
    updateData.append('primaryNumber', this.RegFlatForm.get('primaryNumber')?.value);
    updateData.append('alternatePhoneNum', this.RegFlatForm.get('alternatePhoneNum')?.value);
    updateData.append('ownerEmail', this.RegFlatForm.get('ownerEmail')?.value);
    updateData.append('aadharNumber', this.RegFlatForm.get('aadharNumber')?.value);
    updateData.append('totalFamilyMember', this.RegFlatForm.get('totalFamilyMember')?.value);

    const haveCarValue = this.RegFlatForm.get('havingCar')?.value;
    // const haveCarValue = this.RegFlatForm.get('havingCar')?.value ? 'Yes' : 'No';
    updateData.append('havingCar', haveCarValue);

    updateData.append('familyDataList', JSON.stringify(this.RegFlatForm.get('familyDataList')?.value));
    updateData.append('familyCarData', JSON.stringify(this.RegFlatForm.get('familyCarData')?.value));

    updateData.append('profile', this.gallery_select);

    if (this.RegFlatForm.get('password')?.value === this.RegFlatForm.get('empConfirmPass')?.value) {
      const OwnerPassword = this.RegFlatForm.get('password')?.value;
      if (OwnerPassword) {
        updateData.append('password', OwnerPassword);
        this.passwordsMatch = false;
      }
    } else {
      this.passwordsMatch = true;
      return;
    }

    if (this.RegFlatForm.valid) {
      this._crud.post_flat_owner_add_edit(updateData).subscribe(
        (res: any) => {
          if (res.Status === 'Success') {
            this._shared.tostSuccessTop('Update Successfully');
            this._router.navigate(['/home/flatownerlist']);
          } else if (res.Status === 'Error') {
            this._shared.tostErrorTop('Already Registered');
          }
        },
        (err: any) => {
          this._shared.tostErrorTop('Data Not Update');
          console.log(err);
        }
      );
    } else {
      this._shared.tostWarningTop('Please fill up the form');
    }
  }
}
