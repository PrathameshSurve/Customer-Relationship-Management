import { Component, HostListener } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  company_details = {
    mail : 'crilma@gmail.com',
  }

  price={
    free : 0,
    growth : 999,
    pro : 2599,
    enterprise : 4999,
  }

  constructor(private router: Router) {
  }

  signup() {
    this.router.navigate(['signupform']);
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(event: Event) {
    const header = document.querySelector("header") as HTMLElement;

    if (header) {
      header.classList.toggle("sticky", window.scrollY > 0);
    }
  }
}

