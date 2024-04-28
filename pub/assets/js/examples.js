"use strict";
//current time with current timezone
const time1 = new Time();
const t1 = new Time();
const t2 = new Time();
const t3 = new Time();
const t4 = new Time();
const t5 = new Time();
const t6 = new Time("July 7, 2020 00:00:00");
const t7 = new Time();

//Setting time with a dateString with current timezone
const time2 = new Time("July 7, 2020 00:00:00");
//Setting time with a date String with given TimeZone (last number)
const time3 = new Time("July 7, 2020 00:00:00", -4);
//Setting time with given excate information with current time zone
//year, month, day, hours, minutes, seconds, milliseconds
const time4 = new Time(2020, 7, 7, 0, 0, 0, 0);
//Setting time with given excate information with given time zone (last number)
//year, month, day, hours, minutes, seconds, milliseconds
const time5 = new Time(2020, 7, 7, 0, 0, 0, 0, -4);

//"2020-07-25 18:05:25"
const format1 = time1.format("yyyy-MM-dd hh:mm:ss");
const f1 = document.getElementById("f1");
f1.innerText = format1;
//"2020/07/25 18:06:02"
const format2 = time1.format("yyyy/MM/dd hh:mm:ss");
const f2 = document.getElementById("f2");
f2.innerText = format2;
//"25/07/2020 18:06:55"
const format3 = time1.format("dd/MM/yyyy hh:mm:ss");
const f3 = document.getElementById("f3");
f3.innerText = format3;
//"07/25 18:07"
const format4 = time1.format("MM/dd hh:mm");
const f4 = document.getElementById("f4");
f4.innerText = format4;

//set year
t1.setTime("y", 2019);
//set month
t1.setTime("M", 7);
//set day
t1.setTime("d", 7);
//set hour
t1.setTime("h", 0);
//set minutes
t1.setTime("m", 0);
//set seconds
t1.setTime("s", 0);
//set timezone
t1.setTime("t", 8);
const s1 = document.getElementById("setTime");
s1.innerText = t1.print();
//get year
const t1y = time1.getTime("y");
//get month
const t1M = time1.getTime("M");
//get day
const t1d = time1.getTime("d");
//get hour
const t1h = time1.getTime("h");
//get minute
const t1m = time1.getTime("m");
//get second
const t1s = time1.getTime("s");
//get timezone
const t1t = time1.getTime("t");
const g1 = document.getElementById("get1");
g1.innerText = t1y;
const g2 = document.getElementById("get2");
g2.innerText = t1M;
const g3 = document.getElementById("get3");
g3.innerText = t1d;
const g4 = document.getElementById("get4");
g4.innerText = t1h;
const g5 = document.getElementById("get5");
g5.innerText = t1m;
const g6 = document.getElementById("get6");
g6.innerText = t1s;
const g7 = document.getElementById("get7");
g7.innerText = t1t;

const convert = t2.convertTime(8);
const cp = convert.print();
const cv = document.getElementById("convertTime");
cv.innerText = cp;
//getUTCtime
const testUTC = t3.getUTCtime();
const utc = document.getElementById("utcTime");
utc.innerText = testUTC.print();

//get WeekDay information
const testWD = t3.getWeekDay();
const wdwd = document.getElementById("wdwd");
wdwd.innerText = testWD;
//add one year
t4.add(1, "y");
//add one minute
t4.add(1, "M");
//add one day
t4.add(1, "d");
//add one hour
t4.add(1, "h");
//add one minute
t4.add(1, "m");
//add one second
t4.add(1, "s");
//add one timezone
//notice here if timezone is greater than 12, it does not change anything
t4.add(1, "t");
const addadd = document.getElementById("addme");
addadd.innerText = t4.print();
const bfadd = document.getElementById("addbefore");
bfadd.innerText = time1.print();
const tzaf = document.getElementById("tzafter");
tzaf.innerText = t4.getTime("t");
//subtract one year
t5.subtract(1, "y");
//subtract one minute
t5.subtract(1, "M");
//subtract one day
t5.subtract(1, "d");
//subtract one hour
t5.subtract(1, "h");
//subtract one minute
t5.subtract(1, "m");
//subtract one second
t5.subtract(1, "s");
//subtract one timezone
//notice here if timezone is less than -11, it does not change anything
t5.subtract(1, "t");

const sub = document.getElementById("subafter");
sub.innerText = t5.print();
const bfsub = document.getElementById("subbefore");
bfsub.innerText = time1.print();
const tzsub = document.getElementById("subtzafter");
tzsub.innerText = t5.getTime("t");
//Time between these two Time()
const tbt = t6.timeBetween(t7, "d"); // in days
const tbth = t6.timeBetween(t7, "h"); // in hours
const tbtm = t6.timeBetween(t7, "m"); // in minutes

const bet1 = document.getElementById("bet1");
bet1.innerText = tbt;
const bet2 = document.getElementById("bet2");
bet2.innerText = tbth;
const bet3 = document.getElementById("bet3");
bet3.innerText = tbtm;

const nextweeday = document.getElementById("nw");
nextweeday.innerText = time1.nextWeekday("Friday").format("yyyy-MM-dd");
//time past by today
const bd = t7.beginningOf("d");
//time past by current hour
const bh = t7.beginningOf("h");
//time left today
const ed = t7.endOf("d");
//time left this hour
const eh = t7.endOf("h");

const b1 = document.getElementById("b1");
b1.innerText = bd;
const b2 = document.getElementById("b2");
b2.innerText = bh;
const e1 = document.getElementById("e1");
e1.innerText = ed;
const e2 = document.getElementById("e2");
e2.innerText = eh;

// const map = new WmapGenerator();
// const converter = new converterGenerator();
// const cityTime = new CTGenerator();
// const countryTime = new CapGenerator();
// const counttime = new TimerGenerator();
// counttime.addAll();
// map.addAll();
// converter.addAll();
// cityTime.addAll();
// countryTime.addAll();
