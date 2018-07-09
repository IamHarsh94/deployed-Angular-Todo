import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reminderFilter',
  pure: false
})

export class TrashPipe implements PipeTransform {

  transform(items: any[]): any {

    if (items != undefined) {
      var returnArray = [];

      items.forEach(item => {
        if (item.notePreferences.remainder != null && item.notePreferences.remainder != undefined) {
          if (item.notePreferences.status != 'TRASH') {
            returnArray.push(item);
          }
        }
      });
      // console.log(returnArray);

      return returnArray;
    } else {
      return [];
    }
  }
}
