import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./feature/members/members.module').then(m => m.MembersModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'services',
    loadChildren: () => import('./feature/services/services.module').then(m => m.ServicesModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
