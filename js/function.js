function isStringShorter(string, maxLength) {
  return string.length <= maxLength;
}


function isPalindrome(string) {
  string = string.toLowerCase().replaceAll(' ','');

  let reversedString = '';

  for (let i = string.length - 1; i >= 0; i--){
    reversedString += string.at(i);
  }

  return string === reversedString;
}


function getPositiveIntFromString(string){
  if (typeof(string) === 'number') {
    string = string.toString();
  }

  let result = '';

  for (let i = 0; i < string.length; i++){
    if (!Number.isNaN(parseInt(string.at(i), 10))){
      result += string.at(i);
    }
  }

  return parseInt(result, 10);
}
