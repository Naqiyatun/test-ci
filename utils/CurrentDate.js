var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var ddPlusTiga = String(today.getDate() + 3).padStart(2, '0');
var ddPlusSatu = String(today.getDate() + 1).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

export const CurrentDate = yyyy + '-' + mm + '-' + dd;
export const CurrentDatePlusTiga = yyyy + '-' + mm + '-' + ddPlusTiga;
export const CurrentDatePlusSatu = yyyy + '-' + mm + '-' + ddPlusSatu;