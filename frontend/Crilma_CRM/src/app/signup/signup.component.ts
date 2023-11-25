import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from '../interfaces/auth';
import { passwordMatchValidator } from '../shared/password-match.directive';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    uemail: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    upassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,16}/)]],
    confirmPassword: ['', Validators.required],
  }, {
    validators: passwordMatchValidator,
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  get uname() {
    return this.registerForm.controls['uname'];
  }

  get uemail() {
    return this.registerForm.controls['uemail'];
  }

  get upassword() {
    return this.registerForm.controls['upassword'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    console.log(this.registerForm.value);
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;

    this.authService.getUserByEmail(postData.uemail as string).subscribe(
      response => {
        const hasMatchingEmail = response.some(user => user.uemail === postData.uemail);
        if (!hasMatchingEmail) {

          this.authService.registerUser(postData as User).subscribe(
            response => {
              console.log(response);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
              this.router.navigate(['login']);
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
            }
          );
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User with this email is already exists' });
        }
      });
  }

}
