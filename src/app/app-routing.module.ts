import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingConfirmationComponent } from './pages/booking-confirmation/booking-confirmation.component';
import { BookingSearchComponent } from './pages/booking-search/booking-search.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
      path: 'booking-search',
      component: BookingSearchComponent
  },
  {
      path: 'booking-confirmation',
      component: BookingConfirmationComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
