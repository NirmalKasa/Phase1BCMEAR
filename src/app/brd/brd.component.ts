import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ClientFields } from '../client/client.component';
import { PreviewService } from '../preview/preview.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../shared/localstorage.service';
import { DocumentService } from '../shared/document.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StateManagerService } from '../shared/state-manager.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-brd',
  templateUrl: './brd.component.html',
  styleUrls: ['./brd.component.css']
})
export class BrdComponent implements OnInit {

  brdFields = new BrdFields();
  clientFields: ClientFields;
  fileName: string;
  version: number = 1
  selectedId: number
  isReadonly = false
  closeResult: string;
  moduleName: string;
  formBrdFields = new BrdFields();
  fileToUpload: string;
  isDuplicate = false
  brdDocs: BrdFields[]
  constructor(private previewService: PreviewService, private router: ActivatedRoute,
    private route: Router,
    private store: LocalStorageService,
    private documentService: DocumentService,
    private modalService: NgbModal,
    private stateManager : StateManagerService) { }

  ngOnInit() {
    if(this.stateManager.enableFormRestoration){
      this.brdFields = JSON.parse(this.stateManager.getBrdDocFormValues());
      this.stateManager.enableFormRestoration = false;
    }
    console.log(this.brdFields.fileName + " file name")
    this.clientFields = JSON.parse(this.store.getClientDetails());
    this.brdDocs = JSON.parse(this.store.getBrdDocsDetails());
    if (this.router.snapshot.queryParams['fileName']) {
      this.fileName = this.router.snapshot.queryParamMap.get('fileName');
      var res = this.fileName.split('.', 2);
      res = res[0].split('_', 5);
      console.log(+res[4] + 1)
      this.version = +res[4] + 1
      this.documentService.getBrdDocument(this.clientFields.name, this.fileName,this.clientFields.loggedInUserName).subscribe(
        data => {
          console.log(data);
          this.brdFields = data;
          this.moduleName = this.brdFields.module;
        },
        error=> {
            console.log("there is an error");

        }
      )
      this.isReadonly = true;
    } else {
      console.log("creating new BRD doc");
    }
  }


  updateSessionStorage(form: NgForm) {
    this.formBrdFields = form.value;
    ///this.relatedFiles = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedFile));
    if (this.formBrdFields.module === this.moduleName) {
      //this.brdFields = form.value;
    } else {
      this.brdFields.fileName = "";
    }
    this.stateManager.setBrdDocFormValues(this.brdFields);
    sessionStorage.setItem('brdFields', JSON.stringify(this.brdFields));
    if (!this.isReadonly) {
      this.isDuplicateModule(this.formBrdFields.module)
    }
    this.route.navigate(['preview'])
  }

  saveBrdDocument(form: NgForm) {
    this.formBrdFields = form.value;
    if (this.brdFields.module === this.formBrdFields.module) {
      this.brdFields = form.value;
    } else {
      this.brdFields.fileName = "";
    }
    this.generatePdf();
  }

  toggleReadOnly() {
    this.isReadonly = !this.isReadonly;
  }
  url: any;
  handleFileInput(event) {
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();

    //   reader.onload = (event: ProgressEvent) => {
    //     this.url = (<FileReader>event.target).result;
    //     console.log("in handle fileinput :"+this.url);
    //     this.sanitizer.bypassSecurityTrustUrl(this.url);
    //   }
    //   reader.readAsDataURL(event.target.files[0]);
    // }
    this.fileToUpload = event.target.files[0].name
    var selectedFile = event.target.files[0]
    console.log(event);
    var file = event.target.files[0]
    let reader = new FileReader();
    reader.addEventListener("load", function () {
      var dataString = reader.result;
      //this.url = reader.result as string;
      console.log(dataString);
    }, false);
    //this.sanitizer.bypassSecurityTrustUrl(file)
    // this.sanitizer.bypassSecurityTrustResourceUrl(file);
    // this.brdFields.relatedFiles = this.fileToUpload;
    //  this.sanitizer.bypassSecurityTrustResourceUrl(file)
    reader.readAsDataURL(file);
    console.log(reader);

  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.toggleReadOnly();
      this.version = 1;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  isDuplicateModule(moduleName) {
    if (this.brdDocs !== null) {
      this.brdDocs.some(brdDoc => {
        if (brdDoc.module === moduleName && moduleName !== this.moduleName) {
          this.isDuplicate = true;
          return true
        } else {
          this.isDuplicate = false;
        }
      });
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  generatePdf() {
    let base64Data: any;
    //  const pdfContent: Element = document.getElementById('pdfTable');
    const documentDefinition = { content: 'This is a sample BRD document of version ' + this.version };
    //pdfMake.createPdf(documentDefinition).open();
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    this.fileName = this.clientFields.name + "_BRD_" + this.brdFields.module + "_V_" + this.version + ".pdf";
    console.log(this.version)
    pdfDocGenerator.getBase64((data) => {
      // console.log(data);
      // blobData = data;
      base64Data = data;
      this.previewService.saveClientDocument(base64Data, "BRD", this.clientFields.name, this.fileName, this.brdFields);
      this.route.navigate(['docrepo'])
    });

  }

  returnToUnsavedData(){
    this.stateManager.enableProjectFormRestoration = true;
    this.stateManager.enableFormRestoration=true;
    this.stateManager.setBrdDocFormValues(this.brdFields);
  }
}

export class BrdFields {
  module: string;
  introduction: string;
  purpose: string;
  projectScope: string;
  documentScope: string;
  relatedFiles: string;
  acr: string;
  projectOverview: string;
  businessObjective: string;
  businessBackground: string;
  currentFunc: string;
  expeFunc: string;
  workflow: string;
  impact: string;
  funcreq: string;
  inScope: string;
  outScope: string;
  report: string;
  asumptions: string;
  ref: string;
  app: string;
  rev: string;
  pdfId: string;
  fileName: string;
  loggedInUserName : string;
}
