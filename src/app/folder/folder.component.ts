import { Component, OnInit } from '@angular/core';
import { ClientFields } from '../client/client.component';
import { ActivatedRoute } from '@angular/router';
import { ClientServices } from '../shared/client.service';
import { LocalStorageService } from '../shared/localstorage.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  clientsList : ClientFields[]
  constructor(private clientServices :ClientServices,private activatedRoute : ActivatedRoute,
    private localStorageService : LocalStorageService) { }

  ngOnInit() {
    this.getClientsList();
  }

  selectedclient(index : number) {
    console.log("client selected ==>"+this.clientsList[index].name)
    sessionStorage.setItem('clientFields', JSON.stringify(this.clientsList[index]));
    this.localStorageService.setClientDetails(this.clientsList[index]);

  }

  getClientsList(){
    this.clientServices.getClientDetails().subscribe(
      data => {
        console.log(data);
        this.clientsList = data
        this.clientServices.clientsList= data;
      },
      error =>{
        console.log(error);
      }
    )
  }
}
