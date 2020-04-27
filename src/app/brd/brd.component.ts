import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ClientFields } from '../client/client.component';
import { PreviewService } from '../preview/preview.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../shared/localstorage.service';
import { DocumentService } from '../shared/document.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

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
  isDuplicateModule: boolean = false
  isReadonly = false
  closeResult: string;
  moduleName :string;
  formBrdFields = new BrdFields();
  relatedFiles :string;
  selectedFile: string;
  constructor(private previewService: PreviewService, private router: ActivatedRoute,
    private route: Router,
    private store: LocalStorageService,
    private documentService: DocumentService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.clientFields = JSON.parse(this.store.getClientDetails());
    if (this.router.snapshot.queryParams['fileName']) {
      this.fileName = this.router.snapshot.queryParamMap.get('fileName');
      //  console.log("selected id==>"+ this.selectedId)
      //  this.brdFields =this.store.getBrdDocItembyIndex(this.selectedId);
      //  console.log(this.brdFields);
      //  this.fileName=this.brdFields.fileName
      var res = this.fileName.split('.', 2);
      res = res[0].split('_', 5);
      console.log(+res[4] + 1)
      this.version = +res[4] + 1
      this.documentService.getBrdDocument(this.clientFields.name, this.fileName).subscribe(
        data => {
          console.log(data);
          this.brdFields = data;
          this.moduleName = this.brdFields.module;
        }
      )
      this.isReadonly = true;
    } else {
      console.log("creating new BRD doc");
    }
  }

  getFileContent(event :any){
    var selectedFile = event.target.files[0]
    console.log(event);
    var file = event.target.files[0]
    let reader = new FileReader();
    reader.addEventListener("load", function () {
      var dataString = reader.result;
   }, false);
   reader.readAsDataURL(file);
   console.log(reader);
 //  reader.readAsArrayBuffer(file);

  }

  // url: any= '';
  // onFileChanged(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.onload = (event) => {
  //       this.url = (<FileReader>event.target).result;
  //   }

  // }
  // }
  updateSessionStorage(form: NgForm) {
    this.formBrdFields = form.value;

    ///this.relatedFiles = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedFile));
     if(this.formBrdFields.module === this.moduleName){
      //this.brdFields = form.value;
    }else{
      this.brdFields.fileName = "";
    }
    //this.brdFields.relatedFiles = this.selectedFile;
    sessionStorage.setItem('brdFields', JSON.stringify(this.brdFields));
    this.route.navigate(['preview'])
  }

  saveBrdDocument(form: NgForm) {
    this.formBrdFields = form.value;
    if(this.brdFields.module === this.formBrdFields.module){
      this.brdFields = form.value;
    }else{
      this.brdFields.fileName = "";
    }
    this.generatePdf();
  }

  toggleReadOnly() {
   this.isReadonly = !this.isReadonly;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.toggleReadOnly();
      this.version = 1;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
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

}
