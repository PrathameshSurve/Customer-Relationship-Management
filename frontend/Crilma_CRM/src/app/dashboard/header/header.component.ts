import { Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userName = sessionStorage.getItem('uname');
  
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(    private router: Router,
    private msgService: MessageService,
    private authService: AuthService)  {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  deletePassword: string ='';

  deleteUser() {
    const email = sessionStorage.getItem('uemail');
    if (this.deletePassword) {
      this.authService.deleteUser(email as string, this.deletePassword).subscribe(
        response => {
          console.log(response);
          sessionStorage.clear();
          this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Account Deleted Successfully' });
          this.router.navigate(['/login']);
        },
        error => {
          console.error(error);
          if (error.error === 'Invalid email or password') {
            this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Password' });
          } else {
            this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
          }
        }
      );
    }
    else{
      this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Submit password' });
    }
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
