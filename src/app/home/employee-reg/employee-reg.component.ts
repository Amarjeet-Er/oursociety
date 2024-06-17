import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';
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

  PassMatch: string = '';
  OtherSelectReletion1: boolean = false;
  OtherSelectReletion2: boolean = false;
  employee_type: any;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _curd: CurdService,
    private _shared: SharedService
  ) {
    this._curd.get_emp_type().subscribe(
      (res: any) => {
        this.employee_type = res.EmployeeType
      },
    )
  }

  ngOnInit() {
    this.employeeReg = this._fb.group({
      emp_type: [''],
      emp_workArea: [''],
      empName: [''],
      empMobNo: [''],
      empEmail: [''],
      alternateMob1: [''],
      relWithAlternateNum1: [''],
      OtherRelationWithNum1: [''],
      alternateMob2: [''],
      relWithAlternateNum2: [''],
      OtherRelationWithNum2: [''],
      aadharNumber: [''],
      currentAddress: [''],
      parmanentAddress: [''],
      profileImage: [''],
      aadharImage: [''],
      emp_password: [''],
      empConfirmPass: [''],
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

  onRelationChange1(event: any) {
    if (event.detail.value === 'Other') {
      this.OtherSelectReletion1 = true;
    } else {
      this.OtherSelectReletion1 = false;
    }
  }
  onRelationChange2(event: any) {
    if (event.detail.value === 'Other') {
      this.OtherSelectReletion2 = true;
    } else {
      this.OtherSelectReletion2 = false;
    }
  }

  onSubmit(): void {
    console.log(this.employeeReg.value);
    const formdata = new FormData()
    formdata.append('emp_type', this.employeeReg.get('emp_type')?.value);
    formdata.append('emp_workArea', this.employeeReg.get('emp_workArea')?.value);
    formdata.append('empName', this.employeeReg.get('empName')?.value);
    formdata.append('empMobNo', this.employeeReg.get('empMobNo')?.value);
    formdata.append('empEmail', this.employeeReg.get('empEmail')?.value);
    formdata.append('alternateMob1', this.employeeReg.get('alternateMob1')?.value);
    formdata.append('relWithAlternateNum1', this.employeeReg.get('relWithAlternateNum1')?.value);
    formdata.append('OtherRelationWithNum1', this.employeeReg.get('OtherRelationWithNum1')?.value);
    formdata.append('alternateMob2', this.employeeReg.get('alternateMob2')?.value);
    formdata.append('relWithAlternateNum2', this.employeeReg.get('relWithAlternateNum2')?.value);
    formdata.append('OtherRelationWithNum2', this.employeeReg.get('OtherRelationWithNum2')?.value);
    formdata.append('aadharNumber', this.employeeReg.get('aadharNumber')?.value);
    formdata.append('currentAddress', this.employeeReg.get('currentAddress')?.value);
    formdata.append('parmanentAddress', this.employeeReg.get('parmanentAddress')?.value);
    formdata.append('profileImage', this.gallery_select);
    formdata.append('aadharImage', this.Aadhar_select);
    console.log(this.gallery_select, 'img');
    console.log(this.Aadhar_select, 'aadhar');
    if (this.employeeReg.get('emp_password')?.value === this.employeeReg.get('empConfirmPass')?.value) {
      const empPassword = this.employeeReg.get('emp_password')?.value;
      if (empPassword) {
        formdata.append('emp_password', empPassword);
        console.log(empPassword);
        console.log('Passwords match');
      }
    } else {
      console.log('Passwords do not match');
      this.PassMatch = 'Passwords do not match';
      return;
    }
    if (this.employeeReg.valid) {
      this._curd.insert_Emp_Reg(formdata).subscribe(
        (res: any) => {
          this._shared.tostSuccessTop('Employee Registered Successfully');
          this._router.navigate(['/home/employeelist']);

        },
        (err: any) => {
          this._shared.tostErrorTop('Data Not Insert')
        }
      );
    }
  }
}
