/* JS Library */
"use strict";
const log = console.log;

/////////////////////////Basic time
(function (global) {
  class Time {
    constructor(a, b, c, d, e, f, g, h) {
      if (a === undefined) {
        this.date = new Date();
        this.timezone = this.getcurrTimezone();
      } else if (c === undefined) {
        this.date = new Date(a);
        typeof b === "number"
          ? (this.timezone = b)
          : (this.timezone = this.getcurrTimezone());
      } else {
        this.date = new Date(a, b, c, d, e, f, g);
        typeof h === "number"
          ? (this.timezone = h)
          : (this.timezone = this.getcurrTimezone());
      }
    }

    getcurrTimezone() {
      let curr = this.date.getTimezoneOffset();
      let timezone = -curr / 60;
      return timezone;
    }

    format(f) {
      let reg = {
        "y+": this.date.getFullYear(),
        "M+": this.date.getMonth() + 1,
        "d+": this.date.getDate(),
        "h+": this.date.getHours(),
        "m+": this.date.getMinutes(),
        "s+": this.date.getSeconds(),
        "t+": "GMT" + this.timezone,
      };

      for (let r in reg) {
        if (new RegExp("(" + r + ")").test(f)) {
          if (r === "y+") {
            f = f.replace(RegExp.$1, reg[r]);
          }
          f = f.replace(
            RegExp.$1,
            ("00" + reg[r]).substr(("" + reg[r]).length)
          );
        }
      }

      return f;
    }

    print() {
      return this.format("yyyy-MM-dd hh:mm:ss");
    }

    printwithTZ(format) {
      const tz = "Current Time (GMT " + this.timezone + " ): <br/>";
      return tz + this.format(format);
    }

    setTime(a, b) {
      if (a === "y") {
        this.date.setFullYear(b);
      } else if (a === "M") {
        this.date.setMonth(b - 1);
      } else if (a === "d") {
        this.date.setDate(b);
      } else if (a === "h") {
        this.date.setHours(b);
      } else if (a === "m") {
        this.date.setMinutes(b);
      } else if (a === "s") {
        this.date.setSeconds(b);
      } else if (a === "t") {
        this.timezone = b;
      }
    }

    getTime(a) {
      if (a === "y") {
        return this.date.getFullYear();
      } else if (a === "M") {
        return this.date.getMonth() + 1;
      } else if (a === "d") {
        return this.date.getDate();
      } else if (a === "h") {
        return this.date.getHours();
      } else if (a === "m") {
        return this.date.getMinutes();
      } else if (a === "s") {
        return this.date.getSeconds();
      } else if (a === "t") {
        return "GMT" + this.timezone;
      }
    }

    convertTime(a) {
      let currTimezonOffset = -this.timezone * 60;
      let currDate = this.date.getTime();
      let convertedDate = new Date(
        currDate + currTimezonOffset * 60 * 1000 + a * 60 * 60 * 1000
      );
      // log(convertedDate);
      return new Time(
        convertedDate.getFullYear(),
        convertedDate.getMonth(),
        convertedDate.getDate(),
        convertedDate.getHours(),
        convertedDate.getMinutes(),
        convertedDate.getSeconds(),
        convertedDate.getMilliseconds(),
        a
      );
    }

    getUTCtime() {
      return this.convertTime(0);
    }

    getWeekDay() {
      const wd = [
        "Sunday",
        "Monday",
        "Tesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return wd[this.date.getDay()];
    }

    add(a, b) {
      if (b === "y") {
        this.date.setFullYear(this.date.getFullYear() + a);
      } else if (b === "M") {
        this.date.setMonth(this.date.getMonth() + a);
      } else if (b === "d") {
        this.date.setTime(this.date.getTime() + a * 1000 * 60 * 60 * 24);
      } else if (b === "h") {
        this.date.setTime(this.date.getTime() + a * 1000 * 60 * 60);
      } else if (b === "m") {
        this.date.setTime(this.date.getTime() + a * 1000 * 60);
      } else if (b === "s") {
        this.date.setTime(this.date.getTime() + a * 1000);
      } else if (b === "t") {
        if (-11 <= this.timezone + a && this.timezone + a <= 12) {
          this.timezone += a;
        } else {
          log("Not available");
        }
      }
      // log(this.print());
    }

    subtract(a, b) {
      this.add(-a, b);
    }

    nextWeekday(a) {
      let ans = 0;
      let wd = [
        "Sunday",
        "Monday",
        "Tesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      if (wd.indexOf(a) != -1) {
        const index = wd.indexOf(a);
        const curr = this.date.getDay();
        ans = index + 7 - (curr % 7);
        log("in the next " + ans + "days");
        let nextwd = new Time();
        nextwd.date.setDate(this.date.getDate() + ans);
        return nextwd;
      } else {
        log("Not available");
        return undefined;
      }
    }

    timeBetween(a, b) {
      if (a.timezone != this.timezone) {
        a = a.convertTime(this.timezone);
      }
      let date1 = this.date.getTime();
      let date2 = a.date.getTime();
      let ans = (date1 - date2) / 1000;
      if (b === "d") {
        const day = parseInt(ans / (24 * 60 * 60));
        log(day + " days");
        return day;
      } else if (b === "h") {
        const hour = parseInt(ans / (60 * 60));
        log(hour + " hours");
        return hour;
      } else if (b === "m") {
        const min = parseInt(ans / 60);
        log(min + " minutes");
        return min;
      } else {
        log("Not available");
        return undefined;
      }
    }

    timeinDay(a) {
      if (a === "d") {
        return this.date.getHours() * 60 + this.date.getMinutes();
      } else if (a === "h") {
        return this.date.getMinutes();
      }
    }

    beginningOf(a) {
      const ans = this.timeinDay(a);
      log(ans + " minutes ago");
      return ans;
    }

    endOf(a) {
      let ans = 0;
      if (a === "d") {
        ans += 60 * 24 - this.timeinDay(a);
        log("in " + ans + " minutes");
        return ans;
      } else if (a === "h") {
        ans += 60 - this.timeinDay(a);
        log("in " + ans + " minutes");
        return ans;
      }
    }
  }
  global.Time = global.Time || Time;
})(window);

(function (global) {
  class generator {
    constructor() {
      this.currDate = new Time();
      this.body = document.querySelector("body");
    }

    addCalendar(name) {
      const newdiv = document.createElement("div");
      const lb = document.createElement("label");
      lb.innerText = "Enter Custom Time : ";
      const Wmap = document.createElement("input");
      Wmap.setAttribute("type", "datetime-local");
      Wmap.setAttribute("value", "2020-07-07T00:00:00");
      Wmap.setAttribute("id", name);
      newdiv.style.textAlign = "center";
      newdiv.style.margin = "margin:0 auto";
      newdiv.appendChild(lb);
      newdiv.appendChild(Wmap);
      this.body.append(newdiv);
    }
  }
  global.generator = global.generator || generator;
})(window);
///////////////////////////DOM

(function (global) {
  class WmapGenerator extends generator {
    constructor() {
      super();
      this.interval = null;
      this.current = true;
      this.isClock = false;
      this.format = "yyyy-MM-dd hh:mm:ss";
    }

    addCalendar() {
      super.addCalendar("datetime-local1");
      const newdiv = document.createElement("div");
      newdiv.style.textAlign = "center";
      newdiv.style.margin = "0 auto";
      const lb = document.createElement("label");
      lb.innerText = "Time Format : ";
      const select = document.createElement("select");
      select.setAttribute("id", "MapTimeFormat");
      const op1 = document.createElement("option");
      const op2 = document.createElement("option");
      const op3 = document.createElement("option");
      const op4 = document.createElement("option");
      const op5 = document.createElement("option");
      const op6 = document.createElement("option");
      op1.value = "yyyy-MM-dd hh:mm:ss";
      op1.innerText = "yyyy-MM-dd hh:mm:ss";
      op2.value = "yyyy/MM/dd hh:mm:ss";
      op2.innerText = "yyyy/MM/dd hh:mm:ss";
      op3.value = "dd/MM/yyyy hh:mm:ss";
      op3.innerText = "dd/MM/yyyy hh:mm:ss";
      op4.value = "MM/dd hh:mm";
      op4.innerText = "MM/dd hh:mm";
      op5.value = "hh:mm:ss";
      op5.innerText = "hh:mm:ss";
      op6.value = "yyyy-MM-dd";
      op6.innerText = "yyyy-MM-dd";
      const changeFormat = document.createElement("button");
      changeFormat.className = "enter";
      changeFormat.innerText = "Change to this format";
      changeFormat.addEventListener("click", (e) => {
        e.preventDefault();
        this.format = document.querySelector("#MapTimeFormat").value;
        log(this.format);
      });

      changeFormat.style.backgroundColor = "#FFCE4B";
      changeFormat.style.border = " 1px solid red";
      changeFormat.style.color = "black";
      changeFormat.style.padding = "5px 32px";
      changeFormat.style.textAlign = "center";
      changeFormat.style.textDecoration = "none";
      changeFormat.style.display = "inline-block";
      changeFormat.style.fontSize = "10px";
      changeFormat.onmouseover = function () {
        this.style.backgroundColor = "#FFEEC0";
      };
      changeFormat.onmouseleave = function () {
        this.style.backgroundColor = "#FFCE4B";
      };
      select.appendChild(op1);
      select.appendChild(op2);
      select.appendChild(op3);
      select.appendChild(op4);
      select.appendChild(op5);
      select.appendChild(op6);
      newdiv.appendChild(lb);
      newdiv.appendChild(select);
      newdiv.appendChild(changeFormat);
      newdiv.appendChild(document.createElement("br"));
      newdiv.appendChild(document.createElement("br"));
      const enterButton = document.createElement("button");
      enterButton.className = "enter";
      enterButton.innerText = "enter";
      enterButton.style.backgroundColor = "#4CAF50";
      enterButton.style.border = " 1px solid green";
      enterButton.style.color = "white";
      enterButton.style.padding = "5px 32px";
      enterButton.style.textAlign = "center";
      enterButton.style.textDecoration = "none";
      enterButton.style.display = "inline-block";
      enterButton.style.fontSize = "16px";
      enterButton.onmouseover = function () {
        this.style.backgroundColor = "#3e8e41";
      };
      enterButton.onmouseleave = function () {
        this.style.backgroundColor = "#4CAF50";
      };
      enterButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
        this.current = false;
        this.isClock = false;
        const isClockBut = document.getElementById("dorc");
        isClockBut.disabled = true;
        this.currDate.date = new Date(
          document.querySelector("#datetime-local1").value
        );
        //   log(this.currDate);
        try {
          const remove = document.getElementById("WorldMap");
          remove.removeChild(remove.children[1]);
        } catch (e) {
          log("nothing yet");
        }
      });
      newdiv.appendChild(enterButton);
      const resetButton = document.createElement("button");
      resetButton.className = "enter";
      resetButton.innerText = "reset to current time";
      resetButton.style.backgroundColor = "#4CAF50";
      resetButton.style.border = " 1px solid green";
      resetButton.style.color = "white";
      resetButton.style.padding = "5px 32px";
      resetButton.style.textAlign = "center";
      resetButton.style.textDecoration = "none";
      resetButton.style.display = "inline-block";
      resetButton.style.fontSize = "16px";
      resetButton.onmouseover = function () {
        this.style.backgroundColor = "#3e8e41";
      };
      resetButton.onmouseleave = function () {
        this.style.backgroundColor = "#4CAF50";
      };
      resetButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
        const isClockBut = document.getElementById("dorc");
        isClockBut.disabled = false;
        this.current = true;
        this.currDate.date = new Date();
        //   log(this.currDate);
        try {
          const remove = document.getElementById("WorldMap");
          remove.removeChild(remove.children[1]);
        } catch (e) {
          log("nothing yet");
        }
      });
      newdiv.appendChild(resetButton);
      const isClockButton = document.createElement("button");
      isClockButton.className = "enter";
      isClockButton.innerText = "Digit Time / Clock";
      isClockButton.style.backgroundColor = "grey";
      isClockButton.style.border = " 1px solid green";
      isClockButton.style.color = "white";
      isClockButton.style.padding = "5px 32px";
      isClockButton.style.textAlign = "center";
      isClockButton.style.textDecoration = "none";
      isClockButton.style.display = "inline-block";
      isClockButton.style.fontSize = "16px";
      isClockButton.onmouseover = function () {
        this.style.backgroundColor = "#959595";
      };
      isClockButton.onmouseleave = function () {
        this.style.backgroundColor = "grey";
      };
      isClockButton.setAttribute("id", "dorc");
      isClockButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
        this.isClock = !this.isClock;
        try {
          const remove = document.getElementById("WorldMap");
          remove.removeChild(remove.children[1]);
        } catch (e) {
          log("nothing yet");
        }
      });
      newdiv.appendChild(isClockButton);
      this.body.append(newdiv);
    }

    addWmap() {
      const div = document.createElement("div");
      div.setAttribute("id", "WorldMap");
      const wmapTable = document.createElement("table");
      wmapTable.style.zIndex = "99999";
      wmapTable.style.position = "relative";
      wmapTable.className = "WmapTable";
      wmapTable.style.margin = "auto";
      const tb = document.createElement("tbody");
      const tr = document.createElement("tr");
      let totaltz = [];
      for (let i = 0; i < 24; i++) {
        totaltz.push(document.createElement("th"));
        let img = document.createElement("img");
        img.src = "./src/img/map_" + (i + 1).toString() + ".jpg";
        totaltz[i].appendChild(img);
        totaltz[i].addEventListener("click", (e) => {
          e.preventDefault();
          this.currDate = this.currDate.convertTime(i - 11);
          try {
            const remove = document.getElementById("WorldMap");
            remove.removeChild(remove.children[1]);
            if (this.interval) {
              clearInterval(this.interval);
              this.interval = null;
            }
          } catch (e) {
            log("nothing yet");
          }
          if (this.isClock) {
            const findMap = document.getElementById("WorldMap");
            let componets = [];
            const clockdiv = document.createElement("div");
            const clock = document.createElement("div");
            clock.setAttribute("id", "clock");
            clock.style.width = "600px";
            clock.style.height = "600px";
            clock.style.background =
              "url(./src/clock/face.png) no-repeat center";
            clock.style.backgroundSize = "100%";
            clock.style.position = "relative";
            clock.style.left = "50%";
            clock.style.transform = "translate(-50%, 0%)";
            const hour = document.createElement("div");
            hour.setAttribute("id", "hour");
            hour.style.background = "url(./src/clock/h.png) no-repeat";
            componets.push(hour);
            const minute = document.createElement("div");
            minute.setAttribute("id", "minute");
            minute.style.background = "url(./src/clock/m.png) no-repeat";
            componets.push(minute);
            const second = document.createElement("div");
            second.setAttribute("id", "second");
            second.style.background = "url(./src/clock/s.png) no-repeat";
            componets.push(second);
            for (let i = 0; i < componets.length; i++) {
              componets[i].style.width = "100%";
              componets[i].style.height = "100%";
              componets[i].style.position = "absolute";
              componets[i].style.left = "318px";
              componets[i].style.top = "-22px";
              componets[i].style.transformOrigin = "15px 300px";
            }
            this.interval = setInterval(function () {
              var date = new Time().convertTime(i - 11);
              let ms = date.date.getMilliseconds();
              let s = date.date.getSeconds() + ms / 1000;
              let m = date.date.getMinutes() + s / 60;
              let h = (date.date.getHours() % 12) + m / 60;
              second.style.transform = "rotate(" + s * 6 + "deg)";
              minute.style.transform = "rotate(" + m * 6 + "deg)";
              hour.style.transform = "rotate(" + h * 30 + "deg)";
            }, 10);
            const show = document.createElement("h1");
            show.style.fontSize = "50px";
            show.setAttribute("id", "TimeShowing");
            show.style.color = "#FFC72C";
            show.style.textAlign = "center";
            show.innerHTML = "Current Time (GMT " + (i - 11) + " )";
            clockdiv.appendChild(show);
            clock.appendChild(minute);
            clock.appendChild(second);
            clock.appendChild(hour);
            clockdiv.append(clock);
            clockdiv.style.background = "black";
            clockdiv.style.borderRadius = "3%";
            clockdiv.style.zIndex = "0";
            findMap.append(clockdiv);
          } else {
            const show = document.createElement("h1");
            show.style.fontSize = "125px";
            show.style.background = "black";
            show.style.borderRadius = "5%";
            show.style.height = "600px";
            show.style.color = "#FFC72C";
            show.style.minWidth = "1500px";
            show.style.margin = "0 auto";
            show.style.lineHeight = "300px";
            show.setAttribute("id", "TimeShowing");
            show.style.gradient;
            show.style.textAlign = "center";
            if (this.current) {
              this.interval = setInterval(
                "TimeShowing.innerHTML=new Time().convertTime(" +
                  (i - 11) +
                  ").printwithTZ(" +
                  "'" +
                  this.format +
                  "'" +
                  ")",
                10
              );
            } else {
              show.innerHTML = this.currDate.printwithTZ(this.format);
            }
            const findMap = document.getElementById("WorldMap");
            show.style.position = "relative";
            findMap.append(show);
          }
        });
      }
      for (let i = 0; i < 24; i++) {
        tr.appendChild(totaltz[i]);
      }
      tb.appendChild(tr);
      wmapTable.appendChild(tb);
      div.appendChild(wmapTable);
      this.body.append(div);
    }

    addAll() {
      this.addCalendar();
      this.addWmap();
    }
  }
  global.WmapGenerator = global.WmapGenerator || WmapGenerator;
})(window);

(function (global) {
  class converterGenerator extends generator {
    constructor() {
      super();
      this.current = true;
      this.interval = [];
      this.format = "yyyy-MM-dd hh:mm:ss";
    }

    addCalendar() {
      super.addCalendar("datetime-local");
      const newdiv = document.createElement("div");
      newdiv.setAttribute("id", "convert");
      newdiv.style.textAlign = "center";
      newdiv.style.margin = "0 auto";
      const lb = document.createElement("label");
      lb.innerText = "Time Format : ";
      const select = document.createElement("select");
      select.setAttribute("id", "ConvertableFormat");
      const op1 = document.createElement("option");
      const op2 = document.createElement("option");
      const op3 = document.createElement("option");
      const op4 = document.createElement("option");
      const op5 = document.createElement("option");
      const op6 = document.createElement("option");
      op1.value = "yyyy-MM-dd hh:mm:ss";
      op1.innerText = "yyyy-MM-dd hh:mm:ss";
      op2.value = "yyyy/MM/dd hh:mm:ss";
      op2.innerText = "yyyy/MM/dd hh:mm:ss";
      op3.value = "dd/MM/yyyy hh:mm:ss";
      op3.innerText = "dd/MM/yyyy hh:mm:ss";
      op4.value = "MM/dd hh:mm";
      op4.innerText = "MM/dd hh:mm";
      op5.value = "hh:mm:ss";
      op5.innerText = "hh:mm:ss";
      op6.value = "yyyy-MM-dd";
      op6.innerText = "yyyy-MM-dd";
      const changeFormat = document.createElement("button");
      changeFormat.className = "enter";
      changeFormat.innerText = "Change to this format";
      changeFormat.addEventListener("click", (e) => {
        e.preventDefault();
        for (let i = 0; i < this.interval.length; i++) {
          clearInterval(this.interval[i]);
        }
        this.interval = [];
        this.currDate.date = new Date(
          document.querySelector("#datetime-local").value
        );
        //   log(this.currDate);
        try {
          const remove = document.getElementById("convert");
          remove.removeChild(remove.children[7]);
        } catch (e) {
          log("nothing yet");
        }
        this.format = document.querySelector("#ConvertableFormat").value;
        this.addTable();
      });

      changeFormat.style.backgroundColor = "#FFCE4B";
      changeFormat.style.border = " 1px solid red";
      changeFormat.style.color = "black";
      changeFormat.style.padding = "5px 32px";
      changeFormat.style.textAlign = "center";
      changeFormat.style.textDecoration = "none";
      changeFormat.style.display = "inline-block";
      changeFormat.style.fontSize = "10px";
      changeFormat.onmouseover = function () {
        this.style.backgroundColor = "#FFEEC0";
      };
      changeFormat.onmouseleave = function () {
        this.style.backgroundColor = "#FFCE4B";
      };
      select.appendChild(op1);
      select.appendChild(op2);
      select.appendChild(op3);
      select.appendChild(op4);
      select.appendChild(op5);
      select.appendChild(op6);
      newdiv.appendChild(lb);
      newdiv.appendChild(select);
      newdiv.appendChild(changeFormat);
      newdiv.appendChild(document.createElement("br"));
      newdiv.appendChild(document.createElement("br"));
      const enterButton = document.createElement("button");
      enterButton.className = "enter";
      enterButton.innerText = "enter";
      enterButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.current = false;
        for (let i = 0; i < this.interval.length; i++) {
          clearInterval(this.interval[i]);
        }
        this.interval = [];
        this.currDate.date = new Date(
          document.querySelector("#datetime-local").value
        );
        //   log(this.currDate);
        try {
          const remove = document.getElementById("convert");
          remove.removeChild(remove.children[7]);
          this.addTable();
        } catch (e) {
          log("nothing yet");
        }
      });

      enterButton.style.backgroundColor = "#4CAF50";
      enterButton.style.border = " 1px solid green";
      enterButton.style.color = "WHITE";
      enterButton.style.padding = "5px 32px";
      enterButton.style.textAlign = "center";
      enterButton.style.textDecoration = "none";
      enterButton.style.display = "inline-block";
      enterButton.style.fontSize = "16px";
      enterButton.onmouseover = function () {
        this.style.backgroundColor = "#3E8E41";
      };
      enterButton.onmouseleave = function () {
        this.style.backgroundColor = "#4CAF50";
      };
      newdiv.appendChild(enterButton);
      const resetButton = document.createElement("button");
      resetButton.className = "enter";
      resetButton.innerText = "reset to current time";
      resetButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.current = true;
        for (let i = 0; i < this.interval.length; i++) {
          clearInterval(this.interval[i]);
        }
        this.interval = [];
        this.currDate.date = new Date();
        //   log(this.currDate);
        try {
          const remove = document.getElementById("convert");
          remove.removeChild(remove.children[7]);
          this.addTable();
        } catch (e) {
          log("nothing yet");
        }
      });
      resetButton.style.backgroundColor = "#4CAF50";
      resetButton.style.border = " 1px solid green";
      resetButton.style.color = "WHITE";
      resetButton.style.padding = "5px 32px";
      resetButton.style.textAlign = "center";
      resetButton.style.textDecoration = "none";
      resetButton.style.display = "inline-block";
      resetButton.style.fontSize = "16px";
      resetButton.onmouseover = function () {
        this.style.backgroundColor = "#3E8E41";
      };
      resetButton.onmouseleave = function () {
        this.style.backgroundColor = "#4CAF50";
      };
      newdiv.appendChild(resetButton);
      this.body.append(newdiv);
    }

    addTable() {
      const div = document.createElement("div");
      div.style.textAlign = "center";
      const tzTable = document.createElement("table");
      tzTable.style.textAlign = "center";
      tzTable.style.height = "600px";
      tzTable.style.width = "1750px";
      tzTable.style.margin = "0 auto";
      tzTable.style.fontSize = "20px";
      div.setAttribute("id", "cvtable");
      tzTable.style.gridAutoFlow = "auto";
      const tr1 = document.createElement("tr");
      const tr2 = document.createElement("tr");
      tr2.style.backgroundColor = "#f2f2f2";
      const tr3 = document.createElement("tr");
      const tr4 = document.createElement("tr");
      tr4.style.backgroundColor = "#f2f2f2";
      let totaltz = [];
      for (let i = 0; i < 24; i++) {
        const num = i.toString();
        let td = document.createElement("td");
        td.setAttribute("id", "td" + num);
        td.style.padding = "10px";
        totaltz.push(td);
        if (this.current) {
          this.interval.push(
            setInterval(
              "td" +
                num +
                ".innerHTML=new Time().convertTime(" +
                (i - 11) +
                ").format('" +
                this.format +
                "')",
              10
            )
          );
        } else {
          totaltz[i].innerText = this.currDate
            .convertTime(i - 11)
            .format(this.format);
        }
      }
      for (let i = 0; i < 6; i++) {
        let tz = document.createElement("th");
        tz.innerText = "UTC" + "(" + (i - 11).toString() + ")";
        tr1.append(tz);
        tr1.appendChild(totaltz[i]);
      }
      for (let i = 0; i < 6; i++) {
        let tz = document.createElement("th");
        tz.innerText = "UTC" + "(" + (i - 5).toString() + ")";
        tr2.append(tz);
        tr2.appendChild(totaltz[i + 6]);
      }
      for (let i = 0; i < 6; i++) {
        let tz = document.createElement("th");
        tz.innerText = "UTC" + "(" + (i + 1).toString() + ")";
        tr3.append(tz);
        tr3.appendChild(totaltz[i + 12]);
      }
      for (let i = 0; i < 6; i++) {
        let tz = document.createElement("th");
        tz.innerText = "UTC" + "(" + (i + 7).toString() + ")";
        tr4.append(tz);
        tr4.appendChild(totaltz[i + 18]);
      }

      tzTable.appendChild(tr1);
      tzTable.appendChild(tr2);
      tzTable.appendChild(tr3);
      tzTable.appendChild(tr4);
      div.appendChild(tzTable);
      const convertDiv = document.getElementById("convert");
      convertDiv.append(div);
    }

    addAll() {
      this.addCalendar();
      this.addTable();
    }
  }
  global.converterGenerator = global.converterGenerator || converterGenerator;
})(window);

(function (global) {
  class CTGenerator extends generator {
    constructor() {
      super();
      this.interval = [];
      this.format = "yyyy-MM-dd hh:mm:ss";
      this.curr = null;
    }

    addAll() {
      const div = document.createElement("div");
      div.style.textAlign = "center";
      div.style.margin = "0 auto";
      div.setAttribute("id", "CityTime");
      const lb = document.createElement("label");
      lb.innerText = "Choose a major city  :         ";
      const select = document.createElement("select");
      const op1 = document.createElement("option");
      const op2 = document.createElement("option");
      const op3 = document.createElement("option");
      const op4 = document.createElement("option");
      const op5 = document.createElement("option");
      const op6 = document.createElement("option");
      const op7 = document.createElement("option");
      const op8 = document.createElement("option");
      const op9 = document.createElement("option");
      const op10 = document.createElement("option");
      op1.value = "Ottawa";
      op1.innerText = "Ottawa";
      op2.value = "Shanghai";
      op2.innerText = "Shanghai";
      op3.value = "Tokyo";
      op3.innerText = "Tokyo";
      op4.value = "London";
      op4.innerText = "London";
      op5.value = "Paris";
      op5.innerText = "Paris";
      op6.value = "Moscow";
      op6.innerText = "Moscow";
      op7.value = "Sydney";
      op7.innerText = "Sydney";
      op8.value = "NewYork";
      op8.innerText = "NewYork";
      op9.value = "Toronto";
      op9.innerText = "Toronto";
      op10.value = "Vancouver";
      op10.innerText = "Vancouver";
      ////add more
      select.appendChild(op1);
      select.appendChild(op2);
      select.appendChild(op3);
      select.appendChild(op4);
      select.appendChild(op5);
      select.appendChild(op6);
      select.appendChild(op7);
      select.appendChild(op8);
      select.appendChild(op9);
      select.appendChild(op10);
      select.className = "City";
      select.setAttribute("id", "City");
      div.appendChild(lb);
      div.appendChild(select);
      div.appendChild(document.createElement("br"));
      div.appendChild(document.createElement("br"));

      ///
      const lbt = document.createElement("label");
      lbt.innerText = "Time Format : ";
      const selectf = document.createElement("select");
      selectf.setAttribute("id", "CityFormat");
      const opf1 = document.createElement("option");
      const opf2 = document.createElement("option");
      const opf3 = document.createElement("option");
      const opf4 = document.createElement("option");
      const opf5 = document.createElement("option");
      const opf6 = document.createElement("option");
      opf1.value = "yyyy-MM-dd hh:mm:ss";
      opf1.innerText = "yyyy-MM-dd hh:mm:ss";
      opf2.value = "yyyy/MM/dd hh:mm:ss";
      opf2.innerText = "yyyy/MM/dd hh:mm:ss";
      opf3.value = "dd/MM/yyyy hh:mm:ss";
      opf3.innerText = "dd/MM/yyyy hh:mm:ss";
      opf4.value = "MM/dd hh:mm";
      opf4.innerText = "MM/dd hh:mm";
      opf5.value = "hh:mm:ss";
      opf5.innerText = "hh:mm:ss";
      opf6.value = "yyyy-MM-dd";
      opf6.innerText = "yyyy-MM-dd";
      const changeFormat = document.createElement("button");
      changeFormat.className = "enter";
      changeFormat.innerText = "Change to this format ( Will Reset )";
      changeFormat.addEventListener("click", (e) => {
        e.preventDefault();
        //   log(this.currDate);
        this.format = document.querySelector("#CityFormat").value;
        try {
          for (let i = 0; i < this.interval.length; i++) {
            clearInterval(this.interval[i]);
            const remove = document.getElementById("CityTime");
            remove.removeChild(remove.children[14]);
          }
          this.interval = [];
        } catch (e) {
          log("nothing yet");
        }
      });

      changeFormat.style.backgroundColor = "#FFCE4B";
      changeFormat.style.border = " 1px solid red";
      changeFormat.style.color = "black";
      changeFormat.style.padding = "5px 32px";
      changeFormat.style.textAlign = "center";
      changeFormat.style.textDecoration = "none";
      changeFormat.style.display = "inline-block";
      changeFormat.style.fontSize = "10px";
      changeFormat.onmouseover = function () {
        this.style.backgroundColor = "#FFEEC0";
      };
      changeFormat.onmouseleave = function () {
        this.style.backgroundColor = "#FFCE4B";
      };
      selectf.appendChild(opf1);
      selectf.appendChild(opf2);
      selectf.appendChild(opf3);
      selectf.appendChild(opf4);
      selectf.appendChild(opf5);
      selectf.appendChild(opf6);
      div.appendChild(lbt);
      div.appendChild(selectf);
      div.appendChild(changeFormat);
      div.appendChild(document.createElement("br"));
      div.appendChild(document.createElement("br"));

      ///
      const enterButton = document.createElement("button");
      enterButton.className = "enter";
      enterButton.innerText = "Add this City";
      enterButton.addEventListener("click", (e) => {
        e.preventDefault();
        const curr = document.querySelector("#City").value;
        if (document.querySelector("#" + curr) === null) {
          this.addCityClock(curr);
        }
      });

      enterButton.style.backgroundColor = "#4CAF50";
      enterButton.style.border = " 1px solid green";
      enterButton.style.color = "WHITE";
      enterButton.style.padding = "5px 32px";
      enterButton.style.textAlign = "center";
      enterButton.style.textDecoration = "none";
      enterButton.style.display = "inline-block";
      enterButton.style.fontSize = "16px";
      enterButton.onmouseover = function () {
        this.style.backgroundColor = "#3E8E41";
      };
      enterButton.onmouseleave = function () {
        this.style.backgroundColor = "#4CAF50";
      };

      const clearButton = document.createElement("button");
      clearButton.className = "Reset";
      clearButton.innerText = "Reset";
      clearButton.addEventListener("click", (e) => {
        e.preventDefault();
        try {
          for (let i = 0; i < this.interval.length; i++) {
            clearInterval(this.interval[i]);
            const remove = document.getElementById("CityTime");
            remove.removeChild(remove.children[14]);
          }
          this.interval = [];
        } catch (e) {
          log("nothing yet");
        }
      });
      clearButton.style.backgroundColor = "grey";
      clearButton.style.border = " 1px solid green";
      clearButton.style.color = "white";
      clearButton.style.padding = "5px 32px";
      clearButton.style.textAlign = "center";
      clearButton.style.textDecoration = "none";
      clearButton.style.display = "inline-block";
      clearButton.style.fontSize = "16px";
      clearButton.onmouseover = function () {
        this.style.backgroundColor = "#959595";
      };
      clearButton.onmouseleave = function () {
        this.style.backgroundColor = "grey";
      };
      div.appendChild(enterButton);
      div.appendChild(clearButton);
      div.appendChild(document.createElement("br"));
      div.appendChild(document.createElement("br"));
      div.appendChild(document.createElement("br"));
      this.body.append(div);
    }

    getTimezone(city) {
      if (city === "Ottawa" || city === "NewYork" || city === "Toronto") {
        return -4;
      } else if (city === "Shanghai") {
        return 8;
      } else if (city === "Tokyo") {
        return 9;
      } else if (city === "London") {
        return 1;
      } else if (city === "Paris") {
        return 2;
      } else if (city === "Moscow") {
        return 3;
      } else if (city === "Sydney") {
        return 7;
      } else if (city === "Vancouver") {
        return -7;
      }
    }

    addCityClock(curr) {
      const div = document.createElement("div");
      const timezone = this.getTimezone(curr);
      const cityTable = document.createElement("table");
      cityTable.style.margin = "auto";
      cityTable.style.width = "800px";
      cityTable.style.height = "400px";
      cityTable.style.borderRadius = "5%";
      div.setAttribute("id", "citytable");
      if (this.currDate.convertTime(timezone).date.getHours() < 12) {
        cityTable.style.backgroundImage = "url(./src/img/" + curr + "M.jpg)";
        cityTable.setAttribute("value", curr);
        cityTable.style.backgroundSize = "100%";
        cityTable.style.backgroundRepeat = "no-repeat";
        cityTable.style.color = "black";
        cityTable.style.textShadow = "2px 2px 10px #FFF";
        cityTable.addEventListener("click", (e) => {
          e.preventDefault();
          if (this.curr === e.target.parentElement.parentElement) {
            this.curr = null;
            const currindex =
              Array.prototype.slice
                .call(
                  e.target.parentElement.parentElement.parentElement
                    .parentElement.children
                )
                .indexOf(e.target.parentElement.parentElement.parentElement) -
              14;
            log(currindex);
            clearInterval(this.interval[currindex]);
            this.interval.splice(currindex, 1);
            const remove = document.getElementById("CityTime");
            remove.removeChild(
              e.target.parentElement.parentElement.parentElement
            );
          } else {
            this.curr = e.target.parentElement.parentElement;
          }
        });
      } else {
        cityTable.style.backgroundImage = "url(./src/img/" + curr + "N.jpg)";
        cityTable.setAttribute("value", curr);
        cityTable.style.backgroundSize = "100%";
        cityTable.style.backgroundRepeat = "no-repeat";
        cityTable.style.color = "white";
        cityTable.style.textShadow = "2px 2px 10px #000";
        cityTable.addEventListener("click", (e) => {
          e.preventDefault();
          if (this.curr === e.target.parentElement.parentElement) {
            this.curr = null;
            const currindex =
              Array.prototype.slice
                .call(
                  e.target.parentElement.parentElement.parentElement
                    .parentElement.children
                )
                .indexOf(e.target.parentElement.parentElement.parentElement) -
              14;
            log(currindex);
            clearInterval(this.interval[currindex]);
            this.interval.splice(currindex, 1);
            const remove = document.getElementById("CityTime");
            remove.removeChild(
              e.target.parentElement.parentElement.parentElement
            );
          } else {
            this.curr = e.target.parentElement.parentElement;
          }
        });
      }

      const tr1 = document.createElement("tr");
      let th1 = document.createElement("th");
      th1.style.textAlign = "left";
      th1.style.padding = "40px";
      th1.innerText = curr;
      th1.style.fontSize = "100px";
      th1.style.opacity = "0.9";
      tr1.appendChild(th1);
      const tr2 = document.createElement("tr");
      let td = document.createElement("td");
      td.setAttribute("id", curr);
      td.style.textAlign = "center";
      td.style.fontSize = "65px";
      td.style.fontWeight = "bold";
      td.style.opacity = "0.9";
      td.setAttribute("id", curr);
      td.innerText = new Time().convertTime(timezone).print();
      this.interval.push(
        setInterval(
          curr +
            ".innerHTML=new Time().convertTime(" +
            timezone +
            ").format('" +
            this.format +
            "')",
          10
        )
      );
      tr2.appendChild(td);
      cityTable.appendChild(tr1);
      cityTable.appendChild(tr2);
      cityTable.style.padding = "5px";
      cityTable.style.marginTop = "20px";
      div.append(cityTable);
      const find = document.getElementById("CityTime");
      find.append(div);
    }
  }
  global.CTGenerator = global.CTGenerator || CTGenerator;
})(window);

(function (global) {
  class CapGenerator extends generator {
    constructor() {
      super();
      this.interval = null;
      this.isClock = true;
      this.curr = null;
      this.format = "yyyy-MM-dd hh:mm:ss";
      this.country = [
        "CANADA",
        "USA",
        "CHINA",
        "FRANCE",
        "SPAIN",
        "RUSSIA",
        "SWITZERLAND",
      ];
      this.country2 = [
        "AUSTRALIA",
        "GERMANY",
        "JAPAN",
        "KOREA",
        "BRITAIN",
        "ITALY",
        "BELGIUM",
      ];
    }

    getTimezone(country) {
      if (country === "CANADA" || country === "USA") {
        return -4;
      } else if (country === "CHINA") {
        return 8;
      } else if (
        country === "FRANCE" ||
        country === "SWITZERLAND" ||
        country === "GERMANY" ||
        country === "ITALY" ||
        country === "BELGIUM"
      ) {
        return 2;
      } else if (country === "SPAIN" || country === "BRITAIN") {
        return 1;
      } else if (country === "RUSSIA") {
        return 3;
      } else if (country === "AUSTRALIA") {
        return 10;
      } else if (country === "JAPAN" || country === "KOREA") {
        return 9;
      }
    }

    addTime(country) {
      const timezone = this.getTimezone(country);
      if (this.isClock) {
        const find = document.getElementById("CountryTime");
        let componets = [];
        const clock = document.createElement("div");
        const clockdiv = document.createElement("div");
        clock.setAttribute("id", "clock");
        clock.style.width = "600px";
        clock.style.height = "600px";
        clock.style.background = "url(./src/clock/face.png) no-repeat center";
        clock.style.backgroundSize = "100%";
        clock.style.position = "relative";
        clock.style.left = "50%";
        clock.style.transform = "translate(-50%, 0%)";
        const hour = document.createElement("div");
        hour.setAttribute("id", "hour");
        hour.style.background = "url(./src/clock/h.png) no-repeat";
        componets.push(hour);
        const minute = document.createElement("div");
        minute.setAttribute("id", "minute");
        minute.style.background = "url(./src/clock/m.png) no-repeat";
        componets.push(minute);
        const second = document.createElement("div");
        second.setAttribute("id", "second");
        second.style.background = "url(./src/clock/s.png) no-repeat";
        componets.push(second);
        for (let i = 0; i < componets.length; i++) {
          componets[i].style.width = "100%";
          componets[i].style.height = "100%";
          componets[i].style.position = "absolute";
          componets[i].style.left = "318px";
          componets[i].style.top = "-22px";
          componets[i].style.transformOrigin = "15px 300px";
        }
        this.interval = setInterval(function () {
          var date = new Time().convertTime(timezone);
          let ms = date.date.getMilliseconds();
          let s = date.date.getSeconds() + ms / 1000;
          let m = date.date.getMinutes() + s / 60;
          let h = (date.date.getHours() % 12) + m / 60;
          second.style.transform = "rotate(" + s * 6 + "deg)";
          minute.style.transform = "rotate(" + m * 6 + "deg)";
          hour.style.transform = "rotate(" + h * 30 + "deg)";
        }, 10);
        clock.appendChild(minute);
        clock.appendChild(second);
        clock.appendChild(hour);
        clockdiv.style.color = "#BAFFF3";
        clockdiv.style.textAlign = "center";
        clockdiv.style.height = "1000px";
        clockdiv.style.fontSize = "90px";
        clockdiv.style.borderRadius = "3%";
        clockdiv.style.minWidth = "1500px";
        clockdiv.style.margin = "0 auto";
        clockdiv.style.lineHeight = "250px";
        clockdiv.style.minHeight = "1000px";
        clockdiv.style.backgroundColor = "#0f2027";
        clockdiv.style.backgroundColor =
          "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
        const cname = document.createElement("p");
        cname.innerText = "Current Time for " + country + " is : ";
        cname.style.color = "#BAFFF3";
        cname.style.fontSize = "90px";
        cname.style.fontWeight = "bold";
        clockdiv.appendChild(cname);
        clockdiv.appendChild(clock);
        find.append(clockdiv);
      } else {
        const timediv = document.createElement("div");
        const p = document.createElement("p");
        p.setAttribute("id", "show_time");
        timediv.style.backgroundColor = "#0f2027";
        timediv.style.backgroundColor =
          "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
        timediv.style.color = "#BAFFF3";
        timediv.style.textAlign = "center";
        timediv.style.height = "1000px";
        timediv.style.fontSize = "90px";
        timediv.style.borderRadius = "3%";
        timediv.style.minWidth = "1500px";
        timediv.style.margin = "0 auto";
        timediv.style.lineHeight = "250px";
        timediv.style.minHeight = "1000px";
        const pname = document.createElement("p");
        pname.innerText = "Current Time for " + country + " is :";
        this.interval = setInterval(
          "show_time.innerHTML=new Time().convertTime(" +
            timezone +
            ").format('" +
            this.format +
            "')",
          10
        );
        const find = document.getElementById("CountryTime");
        pname.style.fontWeight = "bold";
        p.style.fontWeight = "bolder";
        p.style.fontSize = "150px";

        timediv.append(pname);
        timediv.append(p);
        find.append(timediv);
      }
    }

    addTable(country) {
      const div = document.getElementById("CountryTable");
      let img = document.createElement("img");
      img.src = "./src/img/" + country + ".jpg";
      img.style.width = "200px";
      img.style.height = "100px";
      img.style.padding = "2px";
      img.addEventListener("click", (e) => {
        e.preventDefault();
        try {
          clearInterval(this.interval);
          const remove = document.getElementById("CountryTime");
          remove.removeChild(remove.children[0]);
        } catch (e) {
          log("nothing yet");
        }
        if (this.curr === country) {
          this.isClock = true;
          this.curr = null;
        } else {
          this.isClock = false;
          this.curr = country;
        }
        log(this.isClock);
        this.addTime(country);
      });
      div.append(img);
    }

    addAll() {
      const div1 = document.createElement("div");
      const lb = document.createElement("label");
      lb.innerText = "Time Format : ";
      const select = document.createElement("select");
      select.setAttribute("id", "CountryTimeFormat");
      const op1 = document.createElement("option");
      const op2 = document.createElement("option");
      const op3 = document.createElement("option");
      const op4 = document.createElement("option");
      const op5 = document.createElement("option");
      const op6 = document.createElement("option");
      op1.value = "yyyy-MM-dd hh:mm:ss";
      op1.innerText = "yyyy-MM-dd hh:mm:ss";
      op2.value = "yyyy/MM/dd hh:mm:ss";
      op2.innerText = "yyyy/MM/dd hh:mm:ss";
      op3.value = "dd/MM/yyyy hh:mm:ss";
      op3.innerText = "dd/MM/yyyy hh:mm:ss";
      op4.value = "MM/dd hh:mm";
      op4.innerText = "MM/dd hh:mm";
      op5.value = "hh:mm:ss";
      op5.innerText = "hh:mm:ss";
      op6.value = "yyyy-MM-dd";
      op6.innerText = "yyyy-MM-dd";
      const changeFormat = document.createElement("button");
      changeFormat.className = "enter";
      changeFormat.innerText = "Change to this format";
      changeFormat.addEventListener("click", (e) => {
        e.preventDefault();
        this.format = document.querySelector("#CountryTimeFormat").value;
        log(this.format);
        try {
          clearInterval(this.interval);
          const remove = document.getElementById("CountryTime");
          remove.removeChild(remove.children[0]);
        } catch (e) {
          log("nothing yet");
        }
        this.curr = null;
      });

      changeFormat.style.backgroundColor = "#FFCE4B";
      changeFormat.style.border = " 1px solid red";
      changeFormat.style.color = "black";
      changeFormat.style.padding = "5px 32px";
      changeFormat.style.textAlign = "center";
      changeFormat.style.textDecoration = "none";
      changeFormat.style.display = "inline-block";
      changeFormat.style.fontSize = "10px";
      changeFormat.onmouseover = function () {
        this.style.backgroundColor = "#FFEEC0";
      };
      changeFormat.onmouseleave = function () {
        this.style.backgroundColor = "#FFCE4B";
      };
      select.appendChild(op1);
      select.appendChild(op2);
      select.appendChild(op3);
      select.appendChild(op4);
      select.appendChild(op5);
      select.appendChild(op6);
      div1.appendChild(lb);
      div1.appendChild(select);
      div1.appendChild(changeFormat);
      div1.appendChild(document.createElement("br"));
      div1.appendChild(document.createElement("br"));
      div1.style.textAlign = "center";
      div1.style.margin = "auto";
      div1.setAttribute("id", "CountryTable");
      this.body.append(div1);
      for (let i = 0; i < this.country.length; i++) {
        this.addTable(this.country[i]);
      }
      div1.append(document.createElement("br"));
      div1.append(document.createElement("br"));
      for (let i = 0; i < this.country.length; i++) {
        this.addTable(this.country2[i]);
      }
      div1.append(document.createElement("br"));
      div1.append(document.createElement("br"));
      div1.append(document.createElement("br"));
      div1.append(document.createElement("br"));
      div1.append(document.createElement("br"));
      div1.append(document.createElement("br"));
      div1.style.minWidth = "1500px";
      const div = document.createElement("div");
      div.style.textAlign = "center";
      div.style.margin = "0 auto";
      div.setAttribute("id", "CountryTime");
      this.body.append(div);
    }
  }
  global.CapGenerator = global.CapGenerator || CapGenerator;
})(window);

(function (global) {
  class StopWatchGenerator extends generator {
    constructor() {
      super();
    }
    addAll() {
      const div = document.createElement("div");
      div.style.textAlign = "center";
      const startbutton = document.createElement("button");
      startbutton.innerText = "Start";
      const stopbutton = document.createElement("button");
      stopbutton.innerText = "Stop";
      stopbutton.disabled = true;
      const resetbutton = document.createElement("button");
      resetbutton.innerText = "Reset";
      const time = document.createElement("h1");
      time.innerText = "00:00";
      time.type = "text";
      time.disabled = true;
      time.style.fontSize = "100px";
      time.style.color = "#720000";
      time.style.backgroundColor = "#F1E26B";
      time.style.borderRadius = "3%";
      const showboard = document.createElement("h1");
      let currTimeShow = setInterval(() => {
        showboard.innerText = new Time().print();
      }, 10);
      let counter = 0;
      let timer = null;
      startbutton.onclick = () => {
        startbutton.disabled = true;
        stopbutton.disabled = false;
        if (counter === 0) {
          this.currDate = new Time();
        }
        clearInterval(timer);
        clearInterval(currTimeShow);
        currTimeShow = setInterval(() => {
          showboard.innerText = new Time().print();
        }, 10);
        timer = setInterval(function () {
          counter++;
          const m = Math.round(counter / 60);
          const s = Math.round(counter % 60);
          time.innerText = addzero(m) + ":" + addzero(s);
        }, 1000 / 60);
      };
      startbutton.style.backgroundColor = "#52FF86";
      startbutton.style.border = " 1px solid green";
      startbutton.style.color = "black";
      startbutton.style.padding = "5px 32px";
      startbutton.style.textAlign = "center";
      startbutton.style.textDecoration = "none";
      startbutton.style.display = "inline-block";
      startbutton.style.fontSize = "20px";
      startbutton.onmouseover = function () {
        this.style.backgroundColor = "#C6FFD7";
      };
      startbutton.onmouseleave = function () {
        this.style.backgroundColor = "#52FF86";
      };
      stopbutton.onclick = () => {
        startbutton.disabled = false;
        stopbutton.disabled = true;
        clearInterval(timer);
        clearInterval(currTimeShow);
        const end = new Time();
        showboard.innerText = this.currDate.print() + " to " + end.print();
      };

      stopbutton.style.backgroundColor = "#FF8989";
      stopbutton.style.border = " 1px solid red";
      stopbutton.style.color = "black";
      stopbutton.style.padding = "5px 32px";
      stopbutton.style.textAlign = "center";
      stopbutton.style.textDecoration = "none";
      stopbutton.style.display = "inline-block";
      stopbutton.style.fontSize = "20px";
      stopbutton.onmouseover = function () {
        this.style.backgroundColor = "#FFD3D3";
      };
      stopbutton.onmouseleave = function () {
        this.style.backgroundColor = "#FF8989";
      };
      resetbutton.onclick = function () {
        clearInterval(timer);
        clearInterval(currTimeShow);
        startbutton.disabled = false;
        stopbutton.disabled = true;
        currTimeShow = setInterval(() => {
          showboard.innerText = new Time().print();
        }, 10);
        time.innerText = "00:00";
        counter = 0;
      };

      resetbutton.style.backgroundColor = "#FF8000";
      resetbutton.style.border = " 1px solid red";
      resetbutton.style.color = "black";
      resetbutton.style.padding = "5px 32px";
      resetbutton.style.textAlign = "center";
      resetbutton.style.textDecoration = "none";
      resetbutton.style.display = "inline-block";
      resetbutton.style.fontSize = "20px";
      resetbutton.onmouseover = function () {
        this.style.backgroundColor = "#FFBD7A";
      };
      resetbutton.onmouseleave = function () {
        this.style.backgroundColor = "#FF8000";
      };
      function addzero(n) {
        return n < 10 ? "0" + n.toString() : "" + n.toString();
      }
      div.append(time);
      div.append(document.createElement("br"));
      div.append(showboard);
      div.append(document.createElement("br"));
      div.append(startbutton);
      div.append(stopbutton);
      div.append(resetbutton);
      this.body.append(div);
    }
  }
  global.StopWatchGenerator = global.StopWatchGenerator || StopWatchGenerator;
})(window);
