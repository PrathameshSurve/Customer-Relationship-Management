import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-practice-page',
  templateUrl: './practice-page.component.html',
  styleUrl: './practice-page.component.css'
})
export class PracticePageComponent {

  newArr: any[] = [];
  
  constructor(private authservice: AuthService, private router: Router
    ) {
    this.authservice.getApiData().subscribe((data: any) => {
      this.newArr = data;
    });
  }

  getsignup() {
    this.router.navigate(['signup']);
  }

}
