import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { Platform } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { Directory, Filesystem } from '@capacitor/filesystem';
import write_blob from 'capacitor-blob-writer';
import { LocalNotifications } from '@capacitor/local-notifications';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { CurdService } from 'src/app/service/curd.service';
const pdfMakeX = require('pdfmake/build/pdfmake');
const pdfFontsX = require('pdfmake/build/vfs_fonts');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;

@Component({
  selector: 'app-visitor-reports',
  templateUrl: './visitor-reports.component.html',
  styleUrls: ['./visitor-reports.component.scss'],
})
export class VisitorReportsComponent implements OnInit {

  siteSearch: boolean = false;
  panelOpenState = false;
  reg_data: any;
  base_url: any;
  onViewFilterList: boolean = true;
  onAllClose: boolean = false;
  onSelectApply: boolean = true;

  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  documentDefinition: any;
  reg_filter_data: any;
  formDate: string | null = null;
  toDate: string | null = null;
  // Constructor
  constructor(
    private _crud: CurdService,
    private _shared: SharedService,
    private _router: Router,
    private _Platform: Platform,
  ) {

    this._shared.img_base_url.subscribe((res: any) => {
      this.base_url = res;
    });

    this._crud.get_visistors_list().subscribe(
      (res: any) => {
        this.reg_data = res.Data;
        this.reg_filter_data = res.Data;
      }
    )
  }

  // Lifecycle Hook - ngOnInit
  async ngOnInit() {
    const granted = await LocalNotifications.requestPermissions();
    if (granted.display !== 'granted') {
      alert('Notifications permission not granted');
    }

    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      const fileName = notification.notification.extra?.fileName;
      const fileType = notification.notification.extra?.fileType;
      if (fileName && fileType) {
        this.openFile(fileName, fileType);
      }
    });
  }
  get_form_date(reg: any) {
    this.formDate = reg.target.value;
    this.filterDataByDateRange();
  }

  get_to_date(reg: any) {
    this.toDate = reg.target.value;
    this.filterDataByDateRange();
  }

  filterDataByDateRange() {
    if (!this.formDate || !this.toDate) {
      this.reg_data = [];
      return;
    }

    const formDate = new Date(this.formDate);
    const toDate = new Date(this.toDate);

    this._crud.get_visistors_list().subscribe(
      (res: any) => {
        const filteredData = res.Data.filter((item: { visitingDate: string; }) => {
          const visitingDate = new Date(item.visitingDate);
          return visitingDate >= formDate && visitingDate <= toDate;
        });
        this.reg_data = filteredData;
      },
      (error: any) => {
        console.error("Error fetching registration date:", error);
      }
    );
  }

  onFilterData() {
    this.siteSearch = !this.siteSearch;
    this.onViewFilterList = true;
    this._crud.get_visistors_list().subscribe(
      (res: any) => {
        this.reg_data = res.Data;
        this.reg_filter_data = res.Data;
      }
    )
  }

  onFilterClose() {
    this.siteSearch = !this.siteSearch;
    this._crud.get_visistors_list().subscribe((res: any) => {
      this.reg_data = res;
    });
  }

  onFilterList() {
    this.onViewFilterList = true;
    this.onAllClose = true;
    this.onSelectApply = true;
  }

  onCloseApply() {
    this.siteSearch = false;
  }

  // Generate Excel file
  excelDowbload() {
    let serialNo = 1;
    const data = this.reg_data.map((reg: any) => {
      const rowData: any = {
        'S.N': serialNo++,
      };
      rowData['Name'] = reg.visitorName;
      rowData['Mobile'] = reg.visitorMobileNum;
      rowData['Total Visitors'] = reg.totalVisitors;
      rowData['Gate Incharge'] = reg.GaurdName;
      rowData['Registration Date'] = reg.visitingDate;
      rowData['Status'] = reg.approvalStatus === 0 ? 'Rejected' : 'Approved';
      rowData['Vehicle'] = reg.havingVehicle;
      rowData['Vehicle Model'] = reg.visitorVehicleModel;
      rowData['Vehicle Number'] = reg.visitorVehicleNumber;
      rowData['Vehicle Parking'] = reg.visitorVehicleParkingArea;
      return rowData;
    });
    try {
      this.downloadExcel(data);
      alert("Excel downloaded successfully");
    } catch {
      alert("Excel download failed");
    }
  }

  // Download Excel
  async downloadExcel(data: any) {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');

      ws['!cols'] = [{ width: 10 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 20 }, { width: 20 }];
      ws['!rows'] = [{ hpt: 20 }, { hpt: 20 }, { hpt: 20 }];
      ws['A1'].s = { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: 'FFFF00' } } };

      const now = new Date();
      const timestamp = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      const filename = `Visitors_${timestamp}.xlsx`;
      if (this._Platform.is('cordova') || this._Platform.is('mobile') || this._Platform.is('android')) {
        const excelBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
        const excelData: Blob = new Blob([excelBuffer], { type: this.EXCEL_TYPE });

        await write_blob({
          path: filename,
          directory: Directory.Documents,
          blob: excelData
        });

        this.showNotification('Excel Downloaded', `Your Excel file ${filename} has been saved successfully.`, filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      } else {
        XLSX.writeFile(wb, filename);
        this.showNotification('Excel Downloaded', `Your Excel file ${filename} has been saved successfully.`, filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      }
    } catch (error) {
      alert("Data not found");
    }
  }

  async PdfDownload() {
    try {
      this.documentDefinition = this.generateDocumentDefinition();

      const now = new Date();
      const timestamp = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      const filename = `Visitors_${timestamp}.pdf`;

      if (this._Platform.is('cordova') || this._Platform.is('mobile') || this._Platform.is('android')) {
        pdfMake.createPdf(this.documentDefinition).getBuffer(async (buffer: ArrayBuffer) => {
          await write_blob({
            path: filename,
            directory: Directory.Documents,
            blob: new Blob([buffer])
          });
          alert("PDF downloaded successfully");
          this.showNotification('PDF Downloaded', `Your PDF file ${filename} has been saved successfully.`, filename, 'application/pdf');
        });
      } else {
        pdfMake.createPdf(this.documentDefinition).download(filename);
        this.showNotification('PDF Downloaded', `Your PDF file ${filename} has been saved successfully.`, filename, 'application/pdf');
        alert("PDF downloaded successfully");
      }
    } catch (error) {
      alert("Error generating PDF");
    }
  }

  generateDocumentDefinition(): any {
    const content = [];
    content.push({ text: 'Visitors', style: 'header', margin: [0, 0, 0, 10] });
    content.push('\n');

    const tableHeaders: any[] = [];
    if (1) tableHeaders.push({ text: 'S.N', style: 'tableHeader' });
    tableHeaders.push({ text: 'Name', style: 'tableHeader' });
    tableHeaders.push({ text: 'Mobile', style: 'tableHeader' });
    tableHeaders.push({ text: 'Total Visitors', style: 'tableHeader' });
    tableHeaders.push({ text: 'Gate Incharge', style: 'tableHeader' });
    tableHeaders.push({ text: 'Registration Date', style: 'tableHeader' });
    tableHeaders.push({ text: 'Status', style: 'tableHeader' });
    tableHeaders.push({ text: 'Vehicle', style: 'tableHeader' });
    tableHeaders.push({ text: 'Vehicle Model', style: 'tableHeader' });
    tableHeaders.push({ text: 'Vehicle Number', style: 'tableHeader' });
    tableHeaders.push({ text: 'Vehicle Parking', style: 'tableHeader' });

    const tableBody: any[][] = this.reg_data.map((reg: any, index: number) => {
      const rowData: any[] = [{ text: (index + 1).toString(), style: 'tableBody', margin: [0, 5, 0, 5] }];
      rowData.push({ text: reg.visitorName, style: 'tableBody', margin: [0, 5, 0, 5] });
      rowData.push({ text: reg.visitorVehicleModel, style: 'tableBody', margin: [0, 5, 0, 5] });
      rowData.push({ text: reg.totalVisitors, style: 'tableBody', margin: [0, 5, 0, 5] });
      rowData.push({ text: reg.GaurdName, style: 'tableBody', margin: [0, 5, 0, 5] });
      rowData.push({ text: reg.visitingDate, style: 'tableBody', margin: [0, 5, 0, 5] });
      rowData.push({
        text: reg.approvalStatus === 0 ? 'Rejected' : reg.approvalStatus === 1 ? 'Approved' : 'unknown',
        style: 'tableBody',
        margin: [0, 5, 0, 5]
      });
      rowData.push({ text: reg.havingVehicle, style: 'tableBody', margin: [0, 5, 0, 5] });
      rowData.push({ text: reg.visitorVehicleModel, style: 'tableBody', margin: [0, 5, 0, 5] });
      rowData.push({ text: reg.visitorVehicleNumber, style: 'tableBody', margin: [0, 5, 0, 5] });
      rowData.push({ text: reg.visitorVehicleParkingArea, style: 'tableBody', margin: [0, 5, 0, 5] });
      return rowData;
    });

    const table = {
      headerRows: 1,
      body: [
        tableHeaders,
        ...tableBody
      ],
    };

    content.push({
      table: table,
      layout: {
        fillColor: function (rowIndex: number, node: any, columnIndex: number) {
          return (rowIndex % 2 === 0) ? '#ffffff' : null;
        }
      },
      margin: [0, 10, 0, 10]
    });

    return {
      content: content,
      styles: {
        header: {
          fontSize: 8,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableHeader: {
          bold: true,
          fontSize: 7,
          color: 'black',
          margin: [0, 5, 0, 5]
        },
        tableBody: {
          fontSize: 7,
          margin: [0, 5, 0, 5]
        }
      },
      pageSize: 'A4',
      // pageOrientation: 'landscape',
      pageMargins: [20, 20, 20, 20]
    };
  }

  // Show notification
  async showNotification(title: string, body: string, fileName: string, fileType: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: 1,
          schedule: { at: new Date(Date.now() + 100) },
          sound: 'default',
          attachments: [],
          extra: { fileName, fileType }
        }
      ]
    });
  }

  // Open file
  async openFile(fileName: string, fileType: string) {
    try {
      const path = await Filesystem.getUri({
        directory: Directory.Documents,
        path: fileName
      });
      if (path && path.uri) {
        FileOpener.open(path.uri, fileType)
          .then(() => console.log('File is opened'))
          .catch(e => alert('Error opening file' + JSON.stringify(e)));
      } else {
        alert('File path is null or undefined.');
      }
    } catch (error) {
      alert('Error retrieving file path:' + JSON.stringify(error));
    }
  }
  onSearch(filter: string) {
    const lowerCaseFilter = filter.toLowerCase();
    console.log("Filter: ", lowerCaseFilter); // Debugging line
    this.reg_data = this.reg_filter_data.filter((data: any) => {
      const fieldsToCheck = [
        data?.visitorName,
        data?.visitorMobileNum,
        data?.totalVisitors,
        data?.visitingDate,
        data?.havingVehicle,
        data?.visitorVehicleModel,
        data?.visitorVehicleNumber,
        data?.visitorVehicleParkingArea
      ];
      const approvalStatusString = data?.approvalStatus === 1 ? 'Approved' : data?.approvalStatus === 0 ? 'Rejected' : 'Pending';
      fieldsToCheck.push(approvalStatusString);

      // Debugging line to check the fields being searched
      console.log("Fields to check: ", fieldsToCheck);

      return fieldsToCheck.some(field => field?.toString().toLowerCase().includes(lowerCaseFilter));
    });
    console.log("Filtered Data: ", this.reg_data); // Debugging line
  }
}