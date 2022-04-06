import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();

  reservationList: any

  constructor(
    private apiService: ApiService
  ) { 
    console.log(environment.api);
    
  }

  ngOnInit(): void {
    this.getData
  }

  ngOnDestroy(){
    this.unsubscribe.unsubscribe()
  }

  getData(){
    return this.apiService.getListBookings()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((response: any) => {
        if(response.status == 200){
          this.reservationList = response
        } else {
          // show error
        }
      })
  }

}
