import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class ViewService
{
  private result: boolean=true;
    private subject = new Subject();

  getView() {
    this.gridview();
    return this.subject.asObservable();
  }
  gridview()
  {
    
    if (this.result ) {
      this.subject.next({ data: "row" });
      this.result = false;

    }
    else
    {
      this.subject.next({ data: "column" });
      this.result = true;
    }
    
  }

  listview()
  {
    this.subject.next({ data: "column" });

    //return "column";
  }
}

