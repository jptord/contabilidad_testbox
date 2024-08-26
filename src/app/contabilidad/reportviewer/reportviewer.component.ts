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
  
   b64toBlob(b64Data:any, contentType:any) {
	contentType = contentType || '';
	let sliceSize = 512;
  
	var byteCharacters = atob(b64Data);
	var byteArrays = [];
  
	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);
  
		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}
  
		var byteArray = new Uint8Array(byteNumbers);
  
		byteArrays.push(byteArray);
	}
	var blob = new Blob(byteArrays, { type: contentType });
	return blob;
   }
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
  base64data:any;
  mywindow:any;
  getImage() {
    var blob = this.b64toBlob(this.base64data, "application/pdf");
    let a = document.createElement("a");
    document.body.appendChild(a);
    var url = window.URL.createObjectURL(blob);
	if(this.mywindow) {
		this.mywindow.close();
	   }
	this.mywindow =window.open(url, "_blank", "resizable=no, toolbar=no, scrollbars=no, menubar=no, status=no, directories=no, location=no, width=1000, height=600, left=50 top=100 " );
	
	/*
    a.href = url;
    a.download = String("propsal.pdf");
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();*/
  }

  public open(b64:any){
	
	console.log("open");
	this.base64data= b64;
	this.getImage();
  }

  ngOnInit(): void {
    //console.log("this.data",this.data);
  //  this.file_uri = this.base64ToFile(this.data);
    //this.data_app = "data:application/pdf;base64;"+this.data;
    //var fileblob = b64toBlob(this.data, 'application/pdf');
	
    //var url = window.URL.createObjectURL(fileblob); 
  //  let anchor = document.createElement("a");
    //this.data_app = url;
    //console.log(this.data_app);
    
  }  
}
