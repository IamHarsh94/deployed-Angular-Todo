import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelFilter',
  pure: false
})

export class ArchivePipe implements PipeTransform {


  transform(items: any[], labelName): any {

    if (items != undefined) {
      var returnArray = [];

      items.forEach(item => {
        var add = false;
        item.notePreferences.labels.forEach(label => {
          if (label.name == labelName) {
            add = true;
          }
        });
        if (add && item.notePreferences.status != 'TRASH') {
          returnArray.push(item);
        }

      });
      // console.log(returnArray);

      return returnArray;
    } else {
      return [];
    }
  }

}
