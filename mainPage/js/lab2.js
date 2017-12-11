function today() {

var month = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сенятбря","Октября","Ноября"];
month.push("Декабря");
var days  = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
days.unshift(days.pop());
var dateObject=new Date();

var outstring="Сегодня "+ dateObject.getFullYear() + " год " + dateObject.getDate()+ " " + month[dateObject.getMonth()] + " " + days[dateObject.getDay()] + " "
                + dateObject.getHours()  + ":" +   dateObject.getMinutes() + "\n Синус (" + days[dateObject.getDay()]+ ") = " + Math.sin(dateObject.getDay()) + " Сегодня будет хороший день? ";
if (Math.random()==1)
                outstring+="Да \n";
                else {
                  outstring+="Нет \n";
                }

  outstring+= "\n E= " + Math.E + " LN10= "+ Math.LN10;
  outstring+= " Длинна строки оутстринг= " + outstring.length + " 3 по счёту элемент = " + outstring.substring(2,3);
  outstring+= "\n Самое большое число " + Number.MAX_VALUE + " Самое маленькое " + Number.MIN_VALUE;



alert(outstring.bold());
alert(outstring.toUpperCase());
alert(outstring.toLowerCase());

}

function lab3() {
  /*var win=window.open(",",'width=300,height=100');*/
  var win2=window.open("http://ggpk.by");

  if ( win2!=null) {

    win2.close();

  }


alert(navigator.appCodeName +" "+ navigator.javaEnabled);
alert(navigator.onLine);
alert(navigator.platform+ " "+ navigator.cpuClass);
alert(" Высота " + screen.availHeight +" Ширина " + screen.availWidth);
alert("Протокол" + location.protocol);
alert("Предыдущая страница" +history.back);

}
