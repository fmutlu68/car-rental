import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/entities/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  dataLoaded = false;
  customers : Customer[] = [];

  constructor(private customerService : CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }
  loadCustomers() {
    this.customerService.getCustomers().subscribe(response=>{
      response.data.map(customer=>{
        if (customer.companyName == null){
          customer.companyName = "Girilmemiş.";
        }
      });
      this.customers = response.data;
      this.dataLoaded = true;
    });
  }
}
