import { Component, OnInit, inject } from '@angular/core';
import { ApiService, endpoints } from '../Config/api.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  apis = inject(ApiService)

  food!: any

  ngOnInit(): void {
    this.apis.get(endpoints.food_detail(7)).subscribe((data) => {
      this.food = data
      console.log(this.food)
    })
  }

}
