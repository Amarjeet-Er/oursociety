import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss'],
})
export class EmployeeUpdateComponent implements OnInit {
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

  imageSelected: boolean = false
  EmpAadharSelected: boolean = false
  OtherSelectReletion1: boolean = false;
  OtherSelectReletion2: boolean = false;
  passwordsMatch: boolean = false;
  employee_type: any;
  selectedEmpType: number | null = null;
  edit_reg: any;
  img_url: any;

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
    this._shared.img_base_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
  }

  ngOnInit() {
    this.employeeReg = this._fb.group({
      Id: [''],
      emp_type: ['', Validators.required],
      emp_WorkArea: [''],
      empName: ['', Validators.required],
      empMobNo: ['', Validators.required],
      empEmail: ['', Validators.required],
      alternateMob1: [''],
      relWithAlternateNum1: [''],
      OtherRelationWithNum1: [''],
      alternateMob2: [''],
      relWithAlternateNum2: [''],
      OtherRelationWithNum2: [''],
      aadharNumber: ['', Validators.required],
      currentAddress: [''],
      parmanentAddress: [''],
      profileImage: [''],
      aadharImage: [''],
      emp_password: [''],
      empConfirmPass: [''],
    })
    this._shared.shared_details.subscribe((response: any) => {
      this.edit_reg = response;
      this.employeeReg.patchValue(this.edit_reg);
      this.employeeReg.controls['empConfirmPass'].setValue(this.edit_reg.emp_password);
    });
  }

  onEmpTypeChange(event: any) {
    this.selectedEmpType = event.detail.value;
  }
  StartCamera() {
    this.onCameraOpen = false
    this.onGalleryImg = true
    this.imageSelected = true
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
    this.imageSelected = true
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
    this.EmpAadharSelected = true
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

  onUpdate(): void {
    const formdata = new FormData()
    formdata.append('Id', this.employeeReg.get('Id')?.value);
    formdata.append('emp_type', this.employeeReg.get('emp_type')?.value);
    formdata.append('emp_WorkArea', this.employeeReg.get('emp_WorkArea')?.value);
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

    if (this.gallery_select) {
      formdata.append('profileImage', this.gallery_select);
    }
    if (this.Aadhar_select) {
      formdata.append('aadharImage', this.Aadhar_select);
    }

    if (this.employeeReg.get('emp_password')?.value === this.employeeReg.get('empConfirmPass')?.value) {
      const empPassword = this.employeeReg.get('emp_password')?.value;
      if (empPassword) {
        formdata.append('emp_password', empPassword);
        console.log(empPassword);
        console.log('Passwords match');
        this.passwordsMatch = false;
      }
    } else {
      console.log('Passwords do not match');
      this.passwordsMatch = true;
      return;
    }
    console.log(this.employeeReg.value);

    if (this.employeeReg.valid) {
      this._curd.post_emp_add_edit(formdata).subscribe(
        (res: any) => {
          if (res.Status === 'success') {
            this._shared.tostSuccessTop('Update Successfully');
            this._router.navigate(['/home/employeelist']);
          }
          if (res.Status === 'Failed') {
            this._shared.tostSuccessTop('Already Registered');
          }
        },
        (err: any) => {
          this._shared.tostErrorTop('Data Not Update')
          console.log(err);
        }
      );
    }
    else {
      this._shared.tostWarningTop('Please fill up the form')
    }
  }
}
