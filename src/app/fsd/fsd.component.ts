import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormArray, FormControl, ValidatorFn } from "@angular/forms";
import { BrdFields } from '../brd/brd.component';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-fsd',
  templateUrl: './fsd.component.html',
  styleUrls: ['./fsd.component.css']
})
export class FsdComponent implements OnInit {
  form: FormGroup;
  orders = [];
  frdFields = new FrdFields();

  // selectedCountry:Country = new Country(2, 'India');
  // countries = [
  //    new Country(1, 'USA' ),
  //    new Country(2, 'India' ),
  //    new Country(3, 'Australia' ),
  //    new Country(4, 'Brazil')
  // ];
  constructor(private formBuilder: FormBuilder) {
    
    

    
  }
  getOrders() {
    return [
      { id: '1', name: 'List of Modules' },
      { id: '2', name: 'Module 1' },
      { id: '3', name: 'Module 2 ' }
    ];
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      orders: ['']
    });
    this.orders = this.getOrders();
  }

  systemRequirement = [
    {
      customizationType: ['Input & Output Screen','Process workflow','Local fields','Delivery','Menu','GL Reporting'],
      customizationTypename: '',
      fieldRequirement: '',
      validationRequirement: '',
      routines: ['Version', 'Enquiry','Delivery','Batch','Template'],
      batch:'',
      delivery:''
    },
    {
      customizationType: ['Input & Output Screen','Process workflow','Local fields','Delivery','Menu','GL Reporting'],
      customizationTypename: '',
      fieldRequirement: '',
      validationRequirement: '',
      routines: ['Version', 'Enquiry','Delivery','Batch','Template'],
      batch:'',
      delivery:''
    },
    {
      customizationType: ['Input & Output Screen','Process workflow','Local fields','Delivery','Menu','GL Reporting'],
      customizationTypename: '',
      fieldRequirement: '',
      validationRequirement: '',
      routines: ['Version', 'Enquiry','Delivery','Batch','Template'],
      batch:'',
      delivery:''
    },
    {
      customizationType: ['Input & Output Screen','Process workflow','Local fields','Delivery','Menu','GL Reporting'],
      customizationTypename: '',
      fieldRequirement: '',
      validationRequirement: '',
      routines: ['Version', 'Enquiry','Delivery','Batch','Template'],
      batch:'',
      delivery:''
    },
    {
      customizationType: ['Input & Output Screen','Process workflow','Local fields','Delivery','Menu','GL Reporting'],
      customizationTypename: '',
      fieldRequirement: '',
      validationRequirement: '',
      routines: ['Version', 'Enquiry','Delivery','Batch','Template'],
      batch:'',
      delivery:''
    }
  ];

  
}

export class FrdFields {
  module: string;
  introduction: string;
  purpose: string;
  projectScope: string;
  documentScope: string;
  relatedFiles: string;
  acr: string;
  riskassumption: string;
  solutionOverview: string;
  depImpact: string;
  refdocs: string;
  openIssues: string;
  revHistory: string;

  }
