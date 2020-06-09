import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe extends CurrencyPipe implements PipeTransform {

  transform(
    value: number | string,
    display: string | boolean = '$',
    digitsInfo: string = '1.0-0'
  ): string {
    return super.transform((!!value ? +value : 0), 'COP', display, digitsInfo).replace(/\s/g, '');
  }

}
