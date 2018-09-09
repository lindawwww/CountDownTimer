(function(){
  'use strict';
  var timer = document.getElementById('timer');//
  var min = document.getElementById('min');
  var sec = document.getElementById('sec');
  var start = document.getElementById('start');//
  var restart = document.getElementById('restart');
  var pause = document.getElementById("pause");

  var startTime;
  var timeLeft;
  var timeToCountDown = 0;
  var timerId;
  var minutes = 0;
  var seconds = 0;
  var isRunning = false;
  //A flag recognizing whether timer's done or not
  //When it's done that's false, it can work again to push "reset"
  //var isDone = false;

  pause.style.display = "none";
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
      //console.log(timeLeft);
      if(timeLeft <= 0){
        clearTimeout(timerId);//to initialize the passing time by setTimeout(,)
        timeLeft = 0;//In display to avoid errors, setting up timeLeft just to 0
        timeToCountDown = 0;//initialization of timer
        UpdateTimer(timeLeft);
        start.style.display = "";
        pause.style.display = "none";
        isRunning = false;
        //isDone = true;
        return;
      }
      UpdateTimer(timeLeft);
      CountDown();
    },10);
  }
  start.addEventListener('click', function(){
    if(isRunning === false){ //&& isDone === false){
      isRunning = true;
      start.style.display = "none";
      pause.style.display = "";
      startTime = Date.now();
      CountDown();
    }
  });
  pause.addEventListener('click', function(){
    if(isRunning === true){ //&& isDone === false){
      isRunning = false;
      timeToCountDown = timeLeft;//Renew timeToCountDown to timeLeft
      clearTimeout(timerId);
      start.style.display = "";
      pause.style.display = "none";
    }
  });
  min.addEventListener('click',function(){
    //while the timer is running
    if(isRunning === true){
      return;
    } else {
      //allowable operation is up to 59:00.000
      if(timeToCountDown >= 59*60*1000){
        return;
      } else { timeToCountDown += 60 * 1000;}
      UpdateTimer(timeToCountDown);
    }
  });
  sec.addEventListener('click',function(){
    if(isRunning === true){
      return;
    } else {
      //allowable operation is up to 59:59.000
      if(timeToCountDown >= 59*60*1000+59*1000){
        return;
      } else { timeToCountDown += 1000;}
      UpdateTimer(timeToCountDown);
    }
  });
  reset.addEventListener('click',function(){
    isRunning = false;
    //to avoid interfering isDone=true within CountDown function
    //setTimeout(function(){ isDone = false;},10);
    timeToCountDown = 0;
    UpdateTimer(timeToCountDown);
  });

})();
