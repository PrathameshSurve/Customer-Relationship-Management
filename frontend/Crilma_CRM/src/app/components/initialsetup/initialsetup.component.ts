import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService, SelectItem } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-initialsetup',
  templateUrl: './initialsetup.component.html',
  styleUrls: ['./initialsetup.component.css']
})
export class InitialsetupComponent {

  constructor(
    @Inject(AuthService) private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) { }

  userName = sessionStorage.getItem('uname');

  industryOptions: SelectItem[] = [
    { label: 'Sales and Marketing', value: 'Sales and Marketing' },
    { label: 'Customer Support', value: 'Customer Support' },
    { label: 'E-commerce', value: 'E-commerce' },
    { label: 'Real Estate', value: 'Real Estate' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'Financial Services', value: 'Financial Services' },
  ];

  securityQuestionOptions: SelectItem[] = [
    { label: 'What is your mother\'s maiden name?', value: 'What is your mother\'s maiden name?' },
    { label: 'What was the name of your first pet?', value: 'What was the name of your first pet?' },
    { label: 'What is your favorite color?', value: 'What is your favorite color?' },
    { label: 'What is the name of your favorite teacher?', value: 'What is the name of your favorite teacher?' },
    { label: 'In what city were you born?', value: 'In what city were you born?' },
    { label: 'What is the name of your favorite book?', value: 'What is the name of your favorite book?' },
    { label: 'What is the name of your first childhood friend?', value: 'What is the name of your first childhood friend?' },
  ];

  UserDetails = this.fb.group({
    selectedIndustry: ['', [Validators.required]],
    selectedSecurityQuestion: ['', [Validators.required]],
    securityAnswer: ['', [Validators.required]],
  });


  get securityAnswer() {
    return this.UserDetails.controls['securityAnswer'];
  }

  get selectedIndustry() { 
    return this.UserDetails.controls['selectedIndustry']; 
  }

  get selectedSecurityQuestion() { 
    return this.UserDetails.controls['selectedSecurityQuestion']; 
  }


  submitted = false;
  
  isFormFilled(){
    this.submitted = true;
  }


  updateUserDetails() {

      const email = sessionStorage.getItem('uemail');
      const updatedUserData = this.UserDetails.value;
  
      this.authService.updateUser(email as string, updatedUserData).subscribe(
        response => {
          console.log(response);
          // sessionStorage.setItem('uemail', email as string);
          this.router.navigate(['/dashboard']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Initial setup complete' });
        },
        error => {
          console.error('Error updating user data:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
      );
      
  }
  

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
