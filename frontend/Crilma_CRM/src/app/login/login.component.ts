import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../interfaces/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private authService: AuthService,
    private msgService: MessageService) {

  }


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,16}/)]],
  })

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { 
    return this.loginForm.controls['password']; 
  }


  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        const user = response.find(u => u.uemail === email);
        if (user) {
          const isPasswordMatching = user.upassword === password;
          if (isPasswordMatching) {
      
            const matchedUser: any = response.find(name => name.uemail === email);
            sessionStorage.setItem('uemail', email as string);
            sessionStorage.setItem('uname', matchedUser.uname as string);

            if (user.initialSetupCompleted) {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/initialsetup']);
            }
            this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
          } else {
 
            this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Password is wrong' });
          }
        } else {
       
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'User does not exist, please sign up first' });
        }
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    );
  }

  forgotPasswordGroup = this.fb.group({
    forgotEmail: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)]],
    forgotPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,16}/)]],
  })

  forgotPassword(){
    const email = this.forgotPasswordGroup.value;

    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        const user = response.find(u => u.uemail === email );
        if (user) {
          this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Please answer the Question below' });
        }
        else{
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'User does not exist, please sign up first' });
        }
      }
    );
  }
  

}
