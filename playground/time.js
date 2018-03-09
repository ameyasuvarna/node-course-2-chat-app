var moment = require('moment');

// Jan 1st 1970 00:00:00 am UTC - 0


// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());

var date = moment();
date.add(100, 'year').subtract(9, 'months');
console.log(date.format('ddd MMM Do, YYYY HH:MM'));

// 10:35 am
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('hh:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
