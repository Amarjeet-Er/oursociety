import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-visitor-reg',
  templateUrl: './visitor-reg.component.html',
  styleUrls: ['./visitor-reg.component.scss'],
})
export class VisitorRegComponent implements OnInit {
  VisitorReg!: FormGroup
  onVehicleSelect: boolean = false;
  findFlatNo: boolean = false

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
    private _fb: FormBuilder,
    private _shared: SharedService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.VisitorReg = this._fb.group({
      visitorName: [''],
      visitorPhone: [''],
      visitorsCount: [''],
      vehicleModel: [''],
      vehicleNumber: [''],
      vehicleParking: [''],
      visitorFlatNo: [0],
      visitorStatus: [''],
    });
  }

  toggleVehicleInput(event: any) {
    this.onVehicleSelect = event.detail.checked;
  }
  onFlatFind() {
    this.findFlatNo = true
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
    console.log(this.VisitorReg.value, 'Visistor data');
    this._shared.tostSuccessTop('H')
    return
    const formdata = new FormData();
    formdata.append('name', this.VisitorReg.get('name')?.value);

    this._router.navigate(['/home/visitorlist']);
  }
}
