import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    phonenumber: new FormControl('')
  });

  ngOnInit(): void {
    this.toastrService.info('Hello There', 'Testing');
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }

  register(): void {
    this.authService.addUser(this.registerForm.value).subscribe(
      (result) => {
        this.toastrService.success('Successfully registered user', 'Saved!');
      },
      (errorResponse) => {
        console.log(errorResponse);
        this.toastrService.error(errorResponse.error, errorResponse.status);
      });
  }

}
