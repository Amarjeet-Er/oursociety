import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnInit {
  toastController: any;

  constructor(
    private _snacker: MatSnackBar
  ) { }
  base_url = new BehaviorSubject<string>('https://granlighting.co.in/Api/')
  img_base_url = new BehaviorSubject<string>('https://granlighting.co.in/')
  ngOnInit(): void {
  }

 // for messages toast notification
 tostSuccessTop(title: any) {
  this._snacker.open(title, '', {
    duration: 1000, verticalPosition: 'top', horizontalPosition: 'end',
    panelClass: ['tostSuccess']
  });
}

tostSuccessBottom(title: any) {
  this._snacker.open(title, '', {
    duration: 1000, verticalPosition: 'bottom', horizontalPosition: 'end',
    panelClass: ['tostSuccess']
  });
}

tostErrorTop(title: any) {
  this._snacker.open(title, '', {
    duration: 1000, verticalPosition: 'top', horizontalPosition: 'end',
    panelClass: ['tostError']
  });
}

tostErrorBottom(title: any) {
  this._snacker.open(title, '', {
    duration: 1000, verticalPosition: 'bottom', horizontalPosition: 'end',
    panelClass: ['tostError']
  });
}
tostWarningTop(title: any) {
  this._snacker.open(title, '', {
    duration: 1000, verticalPosition: 'top', horizontalPosition: 'end',
    panelClass: ['tostWarning']
  });
}
}

