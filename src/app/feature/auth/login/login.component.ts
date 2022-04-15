import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService) { }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (result) => {
        this.saveToken(result.token);
        this.router.navigate(['members']);
      },
      (errorResponse) => {
        if (errorResponse.error.status == '401') {
          this.toastrService.error('Invalid Username or Password', errorResponse.error.title);
        }
      }
    );
  }

  logOut(): void {
    localStorage.removeItem('token');
  }

  register(): void {
    this.router.navigate(['/auth/register']);
  }

  saveToken(theToken: any): void {
    localStorage.setItem('token', theToken);
  }

}
