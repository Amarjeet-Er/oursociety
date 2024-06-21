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
          console.log('Filtered flat numbers:', this.building_num);
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
      b_block: ['', Validators.required],
      flatNum: ['', Validators.required],
      Name: ['', Validators.required],
      Designation: [''],
      Primary_Number: ['', Validators.required],
      Alt_Number: [''],
      Email: ['', Validators.required],
      AadharNumber: [''],
      password: [''],
      empConfirmPass: [''],
      profilePath: [''],
      Have_car: [''],
      No_Of_Family: [''],
      members: this._fb.array([]),
      familyCars: this._fb.array([])
    })
  }

  get membersArray() {
    return this.RegFlatForm.get('members') as FormArray;
  }
  get CarsArray() {
    return this.RegFlatForm.get('familyCars') as FormArray;
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
    const CarsGroup = this._fb.group({
      Car_Model: [''],
      Car_Number: [''],
      Car_ParkingArea: [''],
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
    console.log(this.RegFlatForm.value);

    const formdata = new FormData();
    formdata.append('b_block', this.RegFlatForm.get('b_block')?.value);
    formdata.append('flatNum', this.RegFlatForm.get('flatNum')?.value);
    formdata.append('Name', this.RegFlatForm.get('Name')?.value);
    formdata.append('Designation', this.RegFlatForm.get('Designation')?.value);
    formdata.append('Primary_Number', this.RegFlatForm.get('Primary_Number')?.value);
    formdata.append('Alt_Number', this.RegFlatForm.get('Alt_Number')?.value);
    formdata.append('Email', this.RegFlatForm.get('Email')?.value);
    formdata.append('AadharNumber', this.RegFlatForm.get('AadharNumber')?.value);

    const haveCarValue = this.RegFlatForm.get('Have_car')?.value ? 'Yes' : 'No';
    formdata.append('Have_car', haveCarValue);

    formdata.append('No_Of_Family', this.RegFlatForm.get('No_Of_Family')?.value);

    formdata.append('members', JSON.stringify(this.RegFlatForm.get('members')?.value));
    console.log('members', this.RegFlatForm.get('members')?.value);

    formdata.append('familyCars', JSON.stringify(this.RegFlatForm.get('familyCars')?.value));
    console.log('familyCars', this.RegFlatForm.get('familyCars')?.value);

    formdata.append('profilePath', this.gallery_select);
    console.log(this.gallery_select, 'img');

    if (this.RegFlatForm.get('password')?.value === this.RegFlatForm.get('empConfirmPass')?.value) {
      const OwnerPassword = this.RegFlatForm.get('password')?.value;
      if (OwnerPassword) {
        formdata.append('password', OwnerPassword);
        console.log(OwnerPassword);
        console.log('Passwords match');
        this.passwordsMatch = false;
      }
    } else {
      console.log('Passwords do not match');
      this.passwordsMatch = true;
      return;
    }

    if (this.RegFlatForm.valid) {
      this._crud.post_flat_owner_add_edit(formdata).subscribe(
        (res: any) => {
          if (res.Status === 'success') {
            this._shared.tostSuccessTop('Registration Successfully');
            this._router.navigate(['/home/flatownerlist']);
          }
          if (res.Status === 'Error') {
            this._shared.tostErrorTop('Already Registered');
          }
        },
        (err: any) => {
          this._shared.tostErrorTop('Data Not Insert')
          console.log(err);
        }
      );
    }
    else {
      this._shared.tostWarningTop('Please fill up the form')
    }
  }
}
