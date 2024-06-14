import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
      No_Of_Family: [''],
      Have_car: [''],
      password: [''],
      profilePath: [''],
      MemberName: [''],
      Fam_Email: [''],
      MemberAge: [''],
    })
  }

  onFamilyInput(event: any) {
    if (this.familyCount > 7) {
      event.target.setCustomValidity('Maximum 7 members allowed.');
      return
    }
    else {
      event.target.setCustomValidity('');
      this.addFamilyFields()
    }
  }
  addFamilyFields() {
    this.AddFamilyInput = [];
    for (let i = 0; i < this.familyCount; i++) {
      this.AddFamilyInput.push({ count: 0 });
    }
  }
  toggleCarInput(event: any) {
    this.onCarSelect = event.detail.checked;
    this.cars.push({});
  }
  addAnotherCar() {
    this.addAnotherCars = false;
    if (Array.isArray(this.cars) && this.cars.length === 1) {
      this.cars.push({});
      return
    }
  }
  removeAnotherCar(index: number) {
    this.addAnotherCars = true
    this.cars.splice(index, 1);
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
