import { Component, OnInit } from '@angular/core';
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
  selector: 'app-flat-reg-avi-reports',
  templateUrl: './flat-reg-avi-reports.component.html',
  styleUrls: ['./flat-reg-avi-reports.component.scss'],
})
export class FlatRegAviReportsComponent implements OnInit {
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
  block_list: any;
  building_num: any;
  status_id: any;

  // Constructor
  constructor(
    private _crud: CurdService,
    private _shared: SharedService,
    private _Platform: Platform,
  ) {

    this._shared.img_base_url.subscribe((res: any) => {
      this.base_url = res;
    });

    this._crud.get_building_block().subscribe(
      (res: any) => {
        console.log(res);

        this.block_list = res.Data
      }
    )
  }
  get_filter_by_flat_num(building_id: any) {
    const flat_building_no = building_id.target.value;
    console.log(flat_building_no);

    this._crud.get_flat_block_reports_list().subscribe(
      (res: any) => {
        if (res && Array.isArray(res.Data)) {
          this.reg_data = res.Data.filter((item: any) => item.blockName === flat_building_no);
        } else {
          this.reg_data = [];
        }
      }
    )
  }

  get_filter_flat(id: any) {
    const flat_status = id.target.value;
    this._crud.get_flat_block_reports_list().subscribe(
      (res: any) => {
        if (res && Array.isArray(res.Data)) {
          this.reg_data = res.Data.filter((item: any) => item.flatStatus === flat_status);
        } else {
          this.reg_data = [];
        }
      }
    )
  }
  // Lifecycle Hook - ngOnInit
  async ngOnInit() {
    this._crud.get_flat_block_reports_list().subscribe(
      (res: any) => {
        console.log(res);
        this.reg_data = res.Data
      }
    )
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

  onFilterData() {
    this.siteSearch = !this.siteSearch;
    this.onViewFilterList = true;
  }

  // Generate Excel file
  excelDowbload() {
    let serialNo = 1;
    const data = this.reg_data.map((reg: any) => {
      const rowData: any = {
        'S.N': serialNo++,
      };
      rowData['Block Name'] = reg.blockName;
      rowData['Flat Number'] = reg.flatNum;
      rowData['Status'] = (reg.flatStatus === 1) ? 'Available' : (reg.flatStatus === 0) ? 'Registered' : 'unknown';
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
      const filename = `Flat_building${timestamp}.xlsx`;
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
      const filename = `Flat_building_${timestamp}.pdf`;

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
    content.push({ text: 'Flat Reports', style: 'header', margin: [0, 0, 0, 10] });
    content.push('\n');

    const tableHeaders: any[] = [];
    if (1) tableHeaders.push({ text: 'S.N', style: 'tableHeader' });
    tableHeaders.push({ text: 'Block Name', style: 'tableHeader' });
    tableHeaders.push({ text: 'Flat Number', style: 'tableHeader' });
    tableHeaders.push({ text: 'Status', style: 'tableHeader' });

    const tableBody: any[][] = this.reg_data.map((reg: any, index: number) => {
      const rowData: any[] = [{ text: (index + 1).toString(), style: 'tableBody', margin: [0, 5, 0, 5] }];
      rowData.push({ text: reg.blockName, style: 'tableBody', margin: [0, 5, 0, 5] });
      rowData.push({ text: reg.flatNum, style: 'tableBody', margin: [0, 5, 0, 5] });
      rowData.push({
        text: reg.flatStatus === 0 ? 'Registered' : reg.flatStatus === 1 ? 'Available' : 'unknown',
        style: 'tableBody',
        margin: [0, 5, 0, 5]
      });
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
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'black',
          margin: [0, 5, 0, 5]
        },
        tableBody: {
          fontSize: 10,
          margin: [0, 5, 0, 5]
        }
      },
      pageSize: 'A4',
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
  onSearch(filter: any) {
    this.reg_data = this.reg_filter_data.filter((data: any) => {
      if (data?.buildName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.flatName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.flatOwnerName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.primaryNumber.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.aadharNumber.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.ownerEmail.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.ownerDesignation.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.totalFamilyMember.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.havingCar.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}
