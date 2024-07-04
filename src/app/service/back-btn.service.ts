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
        console.log(this.currentUrl, 'current');

      }
    });

    this.initializeBackButtonHandler();
  }

  private initializeBackButtonHandler() {
    this.platform.ready().then(() => {
      App.addListener('backButton', () => {
        this.handleBackButton();
      });
    });
  }

  private handleBackButton() {
    const urlObject = new URL(window.location.href);
    const pathname = urlObject.pathname;

    if (pathname === '/' ||
      pathname === '/home/dashboard' ||
      pathname === '/flatowner/dashboard' ||
      pathname === '/employee/dashboard') {
      this.showExitConfirmation();
    } else {
      window.history.back();
    }
  }

  private showExitConfirmation() {
    const confirmed = window.confirm('Do you want to close the app?');
    if (confirmed) {
      App.exitApp();
    }
  }
}
