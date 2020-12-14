/*
 * @Descripttion: 
 * @version: 
 * @Author: MFine
 * @Date: 2020-11-28 16:32:54
 * @LastEditors: MFine
 * @LastEditTime: 2020-12-14 22:03:11
 */
import { StringValidator } from './Model';


namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/;
  export class LettersOnlyValidator implements StringValidator {
      isAcceptable(s: string) {
          return lettersRegexp.test(s);
      }
  }
}