import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-reg',
  templateUrl: './employee-reg.component.html',
  styleUrls: ['./employee-reg.component.scss'],
})
export class EmployeeRegComponent implements OnInit {
  employeeReg!: FormGroup
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

  Aadhar_select: any = null
  Aadhar_img_url: any = "../../../assets/images/documents.jpg"
  EmpAadharSelect: boolean = true

  constructor(
    private _router: Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.employeeReg = this._fb.group({
      emp_type: [''],
      emp_workArea: [''],
      emp_name: [''],
      emp_contact_Num: [''],
      emp_email: [''],
      alternate_Num1: [''],
      rel_altertante_Num1: [''],
      alternate_Num2: [''],
      rel_altertante_Num2: [''],
      emp_aadhar_num: [''],
      emp_current_address: [''],
      emp_parmanent_address: [''],
      emp_profile: [''],
      emp_aadharImage: [''],
      emp_password: [''],
      employeeConfirmPass: [''],
    })
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

  // for select Aadhar Card
  onAadhar(files: any) {
    this.EmpAadharSelect = false
    let reader = new FileReader();
    this.Aadhar_select = files[0];
    reader.onload = () => {
      this.Aadhar_img_url = reader.result;
    };
    reader.readAsDataURL(this.Aadhar_select);
  }

  onSubmit(): void {
    console.log(this.employeeReg.value);
    const formdata = new FormData()
    formdata.append('emp_type', this.employeeReg.get('emp_type')?.value);
    formdata.append('emp_workArea', this.employeeReg.get('emp_workArea')?.value);
    formdata.append('emp_name', this.employeeReg.get('emp_name')?.value);
    formdata.append('emp_contact_Num', this.employeeReg.get('emp_contact_Num')?.value);
    formdata.append('emp_email', this.employeeReg.get('emp_email')?.value);
    formdata.append('alternate_Num1', this.employeeReg.get('alternate_Num1')?.value);
    formdata.append('rel_altertante_Num1', this.employeeReg.get('rel_altertante_Num1')?.value);
    formdata.append('alternate_Num2', this.employeeReg.get('alternate_Num2')?.value);
    formdata.append('rel_altertante_Num2', this.employeeReg.get('rel_altertante_Num2')?.value);
    formdata.append('emp_aadhar_num', this.employeeReg.get('emp_aadhar_num')?.value);
    formdata.append('emp_current_address', this.employeeReg.get('emp_current_address')?.value);
    formdata.append('emp_parmanent_address', this.employeeReg.get('emp_parmanent_address')?.value);
    formdata.append('emp_password', this.employeeReg.get('emp_password')?.value);
    formdata.append('employeeConfirmPass', this.employeeReg.get('employeeConfirmPass')?.value);
    formdata.append('emp_profile', this.gallery_select);
    formdata.append('emp_aadharImage', this.Aadhar_select);
    console.log(this.gallery_select, 'img');
    console.log(this.Aadhar_select, 'aadhar');

    return
    this._router.navigate(['/home/employeelist']);
  }
}
