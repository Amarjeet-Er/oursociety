import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
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
  building_block: any;
  building_num: any;
  selectedFlat: any;
  reg_data: any;
  flat_owner_list: any;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _shared: SharedService,
    private _crud: CurdService
  ) {
    this._crud.get_building_block().subscribe(
      (res: any) => {
        console.log(res, 'value');
        this.building_block = res.Data
      }
    )

  }
  get_filter_by_flat_num(building_id: any) {
    const flat_building_no = building_id.target.value;
    
    this._crud.get_flat_number(flat_building_no).subscribe(
      (res: any) => {
        if (res.Data && Array.isArray(res.Data)) {
          this.building_num = res.Data.filter((item: any) => item.regStatus === 0); 
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
    this.initializeForm();
  }

  initializeForm() {
    this.VisitorReg = this._fb.group({
      visitorName: [''],
      visitorMobileNum: [''],
      totalVisitors: [''],
      havingVehicle: [false],
      visitorVehicleModel: [''],
      visitorVehicleNumber: [''],
      visitorVehicleParkingArea: [''],
      buildingBlock: [''],
      flatNum: [],
      approvalStatus: [''],
      visitorImage: [''],
    });
  }

  toggleVehicleInput(event: any) {
    this.onVehicleSelect = event.detail.checked;
  }

  onFlatFind() {
    const selectedFlatId = this.VisitorReg.value.flatNum;
    const selectedFlat = this.building_num.find((flat: { id: any; }) => flat.id === selectedFlatId);
    if (selectedFlat) {
      if (selectedFlat.regStatus === 0) {
        this._crud.get_flat_owner_list().subscribe(
          (res: any) => {
            console.log(res);

            const filteredOwners = res.Data.filter((owner: any) => owner.FlatNum === selectedFlatId);
            this.flat_owner_list = filteredOwners;
            console.log(this.flat_owner_list, 'list');

            console.log('Flat number found with regStatus 0 and matching flatNum');
            this.findFlatNo = true;
          }
        );
      }
    }
  }
  onDetails(data: any) {
    this._shared.shared_details.next(data)
    console.log(data);
    
    this._router.navigate(['/home/flatownerdetails'])
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

    const formdata = new FormData();
    formdata.append('visitorName', this.VisitorReg.get('visitorName')?.value);
    formdata.append('visitorMobileNum', this.VisitorReg.get('visitorMobileNum')?.value);
    formdata.append('totalVisitors', this.VisitorReg.get('totalVisitors')?.value);

    const haveCarValue = this.VisitorReg.get('havingVehicle')?.value ? 'Yes' : 'No';
    formdata.append('havingVehicle', haveCarValue);
    
    formdata.append('visitorVehicleModel', this.VisitorReg.get('visitorVehicleModel')?.value);
    formdata.append('visitorVehicleNumber', this.VisitorReg.get('visitorVehicleNumber')?.value);
    formdata.append('visitorVehicleParkingArea', this.VisitorReg.get('visitorVehicleParkingArea')?.value);
    formdata.append('buildingBlock', this.VisitorReg.get('buildingBlock')?.value);
    formdata.append('flatNum', this.VisitorReg.get('flatNum')?.value);
    formdata.append('approvalStatus', this.VisitorReg.get('approvalStatus')?.value);
    if (this.VisitorReg.valid) {
      this._crud.post_visitor_add(formdata).subscribe(
        (res: any) => {
          // if (res.Status === 'Success') {
            this._shared.tostSuccessTop('Registration Successfully');
            this._router.navigate(['/home/visitorlist']);
          // }
          // if (res.Status === 'Failed') {
          //   this._shared.tostErrorTop('Already Registered');
          // }
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
