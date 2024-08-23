import { afterRender, Component, Input, OnInit } from '@angular/core';

const b64toBlob = (b64Data:any, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

@Component({
  selector: 'app-reportviewer',
  templateUrl: './reportviewer.component.html',
  styleUrl: './reportviewer.component.scss'
})
export class ReportviewerComponent implements OnInit {
  @Input() data:any;
  @Input() type:any;

  file_uri:any;
  data_app:any;
  

  base64ToFile(data: string){
    //et arr = url.split(',');
    //let mime = arr[0].match(/:(.*?);/)![1];
    //let data = arr[1];
    
    let dataStr = atob(data);
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);
    
    while (n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }    
    let file = new File([dataArr], 'File.pdf', { type: 'application/pdf' });
    return file;
  }

  ngOnInit(): void {
    //console.log("this.data",this.data);
  //  this.file_uri = this.base64ToFile(this.data);
    //this.data_app = "data:application/pdf;base64;"+this.data;
    var fileblob = b64toBlob(this.data, 'application/pdf');
    var url = window.URL.createObjectURL(fileblob); 
  //  let anchor = document.createElement("a");
    this.data_app = url;
    //console.log(this.data_app);
    
  }  
}
