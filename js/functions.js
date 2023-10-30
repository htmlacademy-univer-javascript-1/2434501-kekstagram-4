// 2.29. Нужно больше функций
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

isStringShorter('fgdsg', 4);
isPalindrome('sfsfv');
getPositiveIntFromString('vev3s');


// 5.16. Функции возвращаются
function isMeetingPartOfWorkingDay(startTimeOfWorkingDay, endTimeOfWorkingDay, startTimeOfMeeting, MeetingDurationInMinutes) {
  const startTimeOfWorkingDayInMinutes = getTimeOfDayInMinutes(startTimeOfWorkingDay);
  const endTimeOfWorkingDayInMinutes = getTimeOfDayInMinutes(endTimeOfWorkingDay);
  const startTimeOfMeetingInMinutes = getTimeOfDayInMinutes(startTimeOfMeeting);
  const endTimeOfMeetingInMinutes = getEndOfMeetingTime(startTimeOfMeetingInMinutes, MeetingDurationInMinutes);

  if (startTimeOfMeetingInMinutes >= startTimeOfWorkingDayInMinutes && endTimeOfMeetingInMinutes <= endTimeOfWorkingDayInMinutes) {
    return true;
  }

  return false;
}

function getEndOfMeetingTime(startTime, duration) {
  const endTime = startTime + duration;
  return endTime;
}

function getTimeOfDayInMinutes(time) {
  const hours = time.split(':')[0];
  const minutes = time.split(':')[1];
  const timeOfDayInMinutes = Number(hours) * 60 + Number(minutes);
  return timeOfDayInMinutes;
}

isMeetingPartOfWorkingDay('08:00', '17:30', '14:00', 90); // true
isMeetingPartOfWorkingDay('8:0', '10:0', '8:0', 120);     // true
isMeetingPartOfWorkingDay('08:00', '14:30', '14:00', 90); // false
isMeetingPartOfWorkingDay('14:00', '17:30', '08:0', 90);  // false
isMeetingPartOfWorkingDay('8:00', '17:30', '08:00', 900); // false
