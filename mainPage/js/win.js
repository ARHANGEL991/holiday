function show_alert(string,tr1) {

  alert(string + tr1);

}


function show_confirm() {
  var r = confirm("Нажмите кнопку!");
  if (r = true) {
    alert("You press ok");
  } else {
    alert("You press Cancel");
  }

  return "Exit";
}

function show_promt() {
  var name = prompt("Please, write your Name", "Harry Potter");
  if (name != null && name != "") {
    alert("Hello " + name + "! \n How are you?");
  }
}

function constrIf() {
  var d = new Date();
  var time = d.getHours();
  if (time < 10) {
    alert("Доброе утро");
  } else if (time >= 10 && time < 16) {
    alert("Добрый День");
  } else {
    alert("Nice day");
  }

  var theday = d.getDay();
  switch (theday) {
    case 5:
      alert("Lets Drunk it Friday");
      break;
    case 6:
      break;
      alert("Oh noo. It's Saturday");
    case 7:
      alert("Eeeah Sunday");
      break;
    default:
      alert("Where are weekends?");

  }

}

function forwhile() {

  for (var i = 0; i < 5; i++) {
    alert("For " + i);

    if (i == 4) {
      alert("Break on 4");
      break;
    }

    if (i == 3) {
      alert("continue" + i);
      continue;
    }
  }
    var i =0;
  while ( i <= 3) {

    alert("While " + i);
    i++;
  }
i=0;
  do {
    i++;
    alert("Do while " + i);
  } while ( i <= 3);
}


function today() {

var month = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сенятбря","Октября","Ноября"];
month.push("Декабря");
var days  = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
days.unshift(days.pop());
var dateObject=new Date();

var outstring="Сегодня "+ dateObject.getFullYear() + " год " + dateObject.getDate()+ " " + month[dateObject.getMonth()] + " " + days[dateObject.getDay()] + " "
                + dateObject.getHours()  + ":" +   dateObject.getMinutes() ;
alert(outstring.bold());



}
