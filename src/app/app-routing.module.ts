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
  //{ path: 'detail/:id',
  { path: 'detail',
    loadChildren: './detail/detail.module#DetailPageModule'
  },
  { path: 'login-modal', loadChildren: './login-modal/login-modal.module#LoginModalPageModule' },
  { path: 'add-first-action', loadChildren: './add-first-action/add-first-action.module#AddFirstActionPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsPageModule' },
  { path: 'favorite', loadChildren: './favorite/favorite.module#FavoritePageModule' },
  { path: 'phonenumber', loadChildren: './phonenumber/phonenumber.module#PhonenumberPageModule' },
  { path: 'selectrole', loadChildren: './selectrole/selectrole.module#SelectrolePageModule' },
  { path: 'selectlanguage', loadChildren: './selectlanguage/selectlanguage.module#SelectlanguagePageModule' },
  { path: 'slideshow', loadChildren: './slideshow/slideshow.module#SlideshowPageModule' },
  { path: 'myrequest', loadChildren: './myrequest/myrequest.module#MyrequestPageModule' },
  { path: 'workpage', loadChildren: './workpage/workpage.module#WorkpagePageModule' },
  //{ path: 'googlemap', loadChildren: './googlemap/googlemap.module#GooglemapPageModule' },
  { path: 'yandex-pay', loadChildren: './yandex-pay/yandex-pay.module#YandexPayPageModule' },
  { path: 'ocabinet', loadChildren: './cabinets/ocabinet/ocabinet.module#OcabinetPageModule' },
  { path: 'employer', loadChildren: './cabinets/employer/employer.module#EmployerPageModule' },
  { path: 'employedetails', loadChildren: './details/employedetails/employedetails.module#EmployedetailsPageModule' },
  { path: 'checkurl/:id', loadChildren: './checkurl/checkurl.module#CheckurlPageModule' },
  { path: 'carddata', loadChildren: './carddata/carddata.module#CarddataPageModule' },
  { path: 'getmoney', loadChildren: './getmoney/getmoney.module#GetmoneyPageModule' },
  { path: 'instructions', loadChildren: './instructions/instructions.module#InstructionsPageModule' },
  { path: 'investor', loadChildren: './cabinets/investor/investor.module#InvestorPageModule' },
  { path: 'investorpay', loadChildren: './investorpay/investorpay.module#InvestorpayPageModule' },
  { path: 'ads', loadChildren: './ads/ads.module#AdsPageModule' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  {path: '**', redirectTo: '/dashboard'}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
