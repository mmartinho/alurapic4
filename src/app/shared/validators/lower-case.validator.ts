import { AbstractControl } from '@angular/forms';
/**
 * Se não contiver letras minúsculas ou números: validação falhou
 */
export function LowerCaseValidator(control: AbstractControl) : Object | null {
  if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
    return {lowercase : true};
  }
  return null;
}
