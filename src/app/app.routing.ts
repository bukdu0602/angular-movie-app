import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';
import { PageAComponent }        from './app.page-a';
import { PageBComponent }        from './app.page-b';
const appRoutes: Routes = [
  { path: 'page-a', component: PageAComponent },
  { path: 'page-b', component: PageBComponent },
  { path: '', redirectTo: '/page-b', pathMatch: 'full' },
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
