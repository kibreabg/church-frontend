import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { throwIfAlreadyLoaded } from './utils/module-import-guard';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
