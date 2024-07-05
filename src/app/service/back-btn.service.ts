import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BackBtnService {
  private previousUrl: string = "";
  private currentUrl: string = "";

  constructor(
    private router: Router,
    private platform: Platform,
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  back() {
    this.platform.ready().then(() => {
      console.log('Platform ready');
      App.addListener('backButton', () => {
        console.log('Back button pressed');
        let urlObject = new URL(window.location.href);
        let pathname = urlObject.pathname;
        console.log('Current pathname:', pathname);

        if (pathname === '/') {
          console.log('App will be closed');
          this.showExitConfirmation();
          return;
        } else if (pathname === '/home/dashboard' || pathname === '/flatowner/dashboard' || pathname === '/employee/dashboard') {
          console.log('Dashboard route detected, app will be closed');
          this.showExitConfirmation();
          return;
        } else {
          console.log('Navigating to previous URL:', this.previousUrl);
          window.location.replace(this.previousUrl);
          window.location.href = this.previousUrl;
        }
      });
    }).catch(error => {
      console.error('Platform not ready', error);
    });
  }

  showExitConfirmation() {
    const confirmed = window.confirm('Do you want to close the app?');
    if (confirmed) {
      console.log('User confirmed exit');
      App.exitApp();
    } else {
      console.log('User canceled exit');
    }
  }
}
