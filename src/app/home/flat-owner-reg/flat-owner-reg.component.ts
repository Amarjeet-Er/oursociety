import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-flat-owner-reg',
  templateUrl: './flat-owner-reg.component.html',
  styleUrls: ['./flat-owner-reg.component.scss'],
})
export class FlatOwnerRegComponent implements OnInit {
  RegFlatForm!: FormGroup;
  familyCount!: number;
  AddFamilyInput: { count: number }[] = [];
  onCarSelect: boolean = false;
  cars: any[] = [];
  addAnotherCars: boolean = true;
  CarsCount: any
  WIDTH = 200;
  HEIGHT = 200;
  @ViewChild("video") public video!: ElementRef;
  @ViewChild("canvas") public canvas!: ElementRef;
  captures: string[] = [];
  error: any;
  onGalleryImg: boolean = true
  onCameraOpen: boolean = true
  onCaptureImg: boolean = false;
  gallery_select: any = null;
  gallery_img_url: any;
  building_block: any;
  building_num: any;
  passwordsMatch: boolean = false;
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _crud: CurdService,
    private _shared: SharedService
  ) {
    this._crud.get_building_block().subscribe(
      (res: any) => {
        this.building_block = res.Data
      }
    )
  }
  get_filter_by_flat_num(building_id: any) {
    const flat_building_no = building_id.target.value;

    this._crud.get_flat_number(flat_building_no).subscribe(
      (res: any) => {
        if (res.Data && Array.isArray(res.Data)) {
          this.building_num = res.Data.filter((item: any) => item.regStatus === 1);
        } else {
          this.building_num = [];
        }
      },
      (error: any) => {
        console.error('Error fetching flat numbers:', error);
        this.building_num = [];
      }
    );
  }

  ngOnInit() {
    this.RegFlatForm = this._fb.group({
      buildingBlock: ['', Validators.required],
      flatNum: ['', Validators.required],
      flatOwnerName: ['', Validators.required],
      ownerDesignation: [''],
      primaryNumber: ['', Validators.required],
      alternatePhoneNum: [''],
      ownerEmail: ['', Validators.required],
      aadharNumber: [''],
      totalFamilyMember: [''],
      havingCar: [''],
      password: [''],
      empConfirmPass: [''],
      profile: [''],
      familyDataList: this._fb.array([]),
      familyCarData: this._fb.array([])
    })
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
        return
      }
      else {
        event.target.setCustomValidity('');
        this.addMemberControls();
      }
    }
  }

  toggleCarInput(event: any) {
    this.onCarSelect = event.detail.checked;
    if (this.CarsArray.length > 0) {
      this.CarsArray.removeAt(0);
      return
    }
    else {
      this.addCarsControls();
      return
    }
  }
  addAnotherCar() {
    this.addAnotherCars = false;
    for (let i = 0; i < 1; i++) {
      if (this.CarsArray.length > 1) {
        return
      }
      else {
        this.addCarsControls();
      }
    }
  }
  removeAnotherCar(index: number) {
    this.addAnotherCars = true
    this.CarsArray.removeAt(index + 1);
  }

  StartCamera() {
    this.onCameraOpen = false
    this.onGalleryImg = true
    this.onCaptureImg = true
    this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
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
        this.gallery_select = captureImg
        const stream = this.video.nativeElement.srcObject;
        const tracks = stream.getTracks();
        tracks[0].stop();
      });
    } else {
      alert('Video stream not initialized.');
    }
  }

  drawImageToCanvas(image: any) {
    this.onCameraOpen = true
    this.onGalleryImg = true
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  OnGallery(files: any) {
    this.onCaptureImg = false
    this.onGalleryImg = false
    this.onCameraOpen = true
    let reader = new FileReader();
    this.gallery_select = files[0];
    reader.onload = () => {
      this.gallery_img_url = reader.result;
    };
    reader.readAsDataURL(this.gallery_select);
  }

  onSubmit(): void {
    const formdata = new FormData();
    formdata.append('buildingBlock', this.RegFlatForm.get('buildingBlock')?.value);
    formdata.append('flatNum', this.RegFlatForm.get('flatNum')?.value);
    formdata.append('flatOwnerName', this.RegFlatForm.get('flatOwnerName')?.value);
    formdata.append('ownerDesignation', this.RegFlatForm.get('ownerDesignation')?.value);
    formdata.append('primaryNumber', this.RegFlatForm.get('primaryNumber')?.value);
    formdata.append('alternatePhoneNum', this.RegFlatForm.get('alternatePhoneNum')?.value);
    formdata.append('ownerEmail', this.RegFlatForm.get('ownerEmail')?.value);
    formdata.append('aadharNumber', this.RegFlatForm.get('aadharNumber')?.value);
    formdata.append('totalFamilyMember', this.RegFlatForm.get('totalFamilyMember')?.value);

    const haveCarValue = this.RegFlatForm.get('havingCar')?.value ? 'Yes' : 'No';
    formdata.append('havingCar', haveCarValue);
    formdata.append('familyDataList', JSON.stringify(this.RegFlatForm.get('familyDataList')?.value));
    formdata.append('familyCarData', JSON.stringify(this.RegFlatForm.get('familyCarData')?.value));
    formdata.append('profile', this.gallery_select);

    if (this.RegFlatForm.get('password')?.value === this.RegFlatForm.get('empConfirmPass')?.value) {
      const OwnerPassword = this.RegFlatForm.get('password')?.value;
      if (OwnerPassword) {
        formdata.append('password', OwnerPassword);
        this.passwordsMatch = false;
      }
    } else {
      this.passwordsMatch = true;
      return;
    }

    if (this.RegFlatForm.valid) {
      this._crud.post_flat_owner_add_edit(formdata).subscribe(
        (res: any) => {
          if (res.Status === 'Success') {
            this._shared.tostSuccessTop('Registration Successfully');
            this._router.navigate(['/home/flatownerlist']);
          }
          if (res.Status === 'Error') {
            this._shared.tostErrorTop('Already Registered');
          }
        },
        (err: any) => {
          this._shared.tostErrorTop('Data Not Insert')
        }
      );
    }
    else {
      this._shared.tostWarningTop('Please fill up the form')
    }
  }
}
