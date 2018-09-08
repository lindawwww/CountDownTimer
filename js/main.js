(function(){
  'use strict';
  var timer = document.getElementById('timer');//
  var min = document.getElementById('min');
  var sec = document.getElementById('sec');
  var start = document.getElementById('start');//
  var restart = document.getElementById('restart');

  var startTime;
  var timeLeft;
  var timeToCountDown = 4*1000;
  var timerId;

  function UpdateTimer(t){
    var d = new Date(t);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var msec = d.getMilliseconds();
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    msec = ('00' + msec).slice(-3);
    //extract the last two digits like 012->12, 02->02
    //the minus value means finding from a bottom
    //getting by id of html
    timer.textContent = m + ':' + s + '.' + msec;
  }

  //Date.now is used msec, and timeToCountDown corresponds it.
  // PassedTime is calculated by decreasing CurrentTime using Date.now() from StartTime
  function CountDown(){
    //setTimeout(function, msec)
    //after a predetermined time, the following function is performed
    //in this case, it sets up updating time of this timer
    timerId = setTimeout(function(){
      var passedTime = Date.now() - startTime;
      timeLeft = timeToCountDown - passedTime;
      console.log(timeLeft);
      if(timeLeft < 0){
        //clearTimeout(timerId);//now I dont understand this row
        //to set up 0 of errors means nothing just timeLeft
        timeLeft = 0;
        timeToCountDown = 0;//initialization of timer
        UpdateTimer(timeLeft);
        return;
      }
      UpdateTimer(timeLeft);
      CountDown();
    },10);
  }
  //getting by id of html
  start.addEventListener('click', function(){
    startTime = Date.now();
    CountDown();
  });



})();
