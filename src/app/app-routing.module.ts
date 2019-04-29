import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardPageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'detail/:id',
    loadChildren: './detail/detail.module#DetailPageModule'
  },
  { path: 'login-modal', loadChildren: './login-modal/login-modal.module#LoginModalPageModule' },
  { path: 'add-first-action', loadChildren: './add-first-action/add-first-action.module#AddFirstActionPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
