import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit {

  public code!: string;
  public titleMessage!: string;
  public emphasisMessage!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.code = params.errorcode;
        if (this.code == '403') {
          this.titleMessage = 'Unauthorized Access!';
          this.emphasisMessage = 'Your access previleges do not allow you to access this page!';
        }
      });
  }

  loginPage(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

}
