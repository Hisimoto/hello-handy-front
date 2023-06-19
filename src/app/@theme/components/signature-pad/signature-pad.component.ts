import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild  } from '@angular/core';
import SignaturePad from 'signature_pad';
@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent{
  signPad: any;
  @ViewChild('signPadCanvas', {static: false}) signaturePadElement:any;
  @Output() padOut: EventEmitter<string> = new EventEmitter();
  signImage:any;
  viewPad:any;

  constructor() { }

  ngAfterViewInit() {
    this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
  }
  /*It's work in devices*/
  startSignPadDrawing(event: Event) {
    console.log(event);
  }
  /*It's work in devices*/
  movedFinger(event: Event) {
    
  }
  /*Undo last step from the signature*/
  undoSign() {
    const data = this.signPad.toData();
    if (data) {
      data.pop(); // remove the last step
      this.signPad.fromData(data);
    }
  }
  /*Clean whole the signature*/
  clearSignPad() {    
    if(this.signPad){
        this.signPad.clear();
    }
  }
  /*Here you can save the signature as a Image*/
  saveSignPad() {
    const base64ImageData = this.signPad.toDataURL();
    this.signImage = base64ImageData;
    this.padOut.emit(this.signImage);
    //Here you can save your signature image using your API call.
  }

}