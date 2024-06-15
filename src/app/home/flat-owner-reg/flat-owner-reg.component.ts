import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { count } from 'rxjs';

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
  CarsCount:any
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

  constructor(
    private _router: Router,
    private _fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.RegFlatForm = this._fb.group({
      b_block: [''],
      flatNum: [''],
      Name: [''],
      Designation: [''],
      Primary_Number: [''],
      Alt_Number: [''],
      Email: [''],
      AadharNumber: [''],
      password: [''],
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
    const memberGroup = this._fb.group({
      MemberName: [''],
      Fam_Email: [''],
      MemberAge: [''],
      MemberContactNum: ['']
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
      this.CarsArray.removeAt(1);
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
    return

    this._router.navigate(['/home/flatownerlist']);
  }
}
