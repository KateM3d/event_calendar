'use strict';

var calendar = document.querySelector('.calendar_body'),
    headingCalendar = document.querySelector('.calendar_head');
var prev = document.createElement('button'),
    next = document.createElement('button'),
    dateHeading = document.createElement('div'),
    addMonth = document.createElement('div'),
    addYear = document.createElement('div');
prev.className = "calendar_head_prev";
next.className = "calendar_head_next";
dateHeading.className = "calendar_head_date";
addMonth.className = "calendar_head_date_month";
addYear.className = "calendar_head_date_year";

var getDay = function getDay(d) {
  var day = d.getDay();
  if (day == 0) day = 7;
  return day - 1;
};

var createCalendar = function createCalendar(cld, year, month, day) {
  var date = new Date(year, month),
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      table = "\n            <table class=\"calendar_table card table\">\n                <thead>\n                    <tr>\n                        <th class=\"card-body calendar_table_week\">mon</th>\n                        <th class=\"card-body calendar_table_week\">tue</th>\n                        <th class=\"card-body calendar_table_week\">wed</th>\n                        <th class=\"card-body calendar_table_week\">thu</th>\n                        <th class=\"card-body calendar_table_week\">fri</th>\n                        <th class=\"card-body calendar_table_week\">sat</th>\n                        <th class=\"card-body calendar_table_week\">sun</th>\n                    </tr>\n                </thead>\n                <tbody  class=\"table-striped\">\n                    <tr>\n        ";
  console.log(date); // пустые ячейки первой недели

  for (var _i = 0; _i < getDay(date); _i++) {
    table = "".concat(table, "<td class=\"card-body\"></td>");
  } // ячейки календаря


  var i = 0;

  while (date.getMonth() === month) {
    if (month === new Date().getMonth() && day === date.getDate()) {
      table = "".concat(table, "<td class=\"card-body calendar_table_day calendar_table_day_today\"><button id = \"").concat(i++, "\" type=\"button\" class=\"btn btn-lg calendar_table_day_btn\" data-bs-toggle=\"popover\" title=\"To-do list\" data-bs-content=\"-\">").concat(date.getDate(), "</button></td>");
    } else {
      table = "".concat(table, "<td class=\"card-body calendar_table_day\"> <button id = \"").concat(i++, "\" type=\"button\" class=\"btn btn-lg calendar_table_day_btn\" data-bs-toggle=\"popover\" title=\"To-do list\" data-bs-content=\"-\">").concat(date.getDate(), "</button></td>");
    }

    if (getDay(date) % 7 == 6) {
      // перевод строки с вс
      table = "".concat(table, "</tr><tr>");
    }

    $(function () {
      $('[data-toggle="popover"]').popover('toggleEnabled');
    });
    date.setDate(date.getDate() + 1);
  } // пустые ячейки последней недели


  if (getDay(date) != 0) {
    for (var _i2 = getDay(date); _i2 < 7; _i2++) {
      table = "".concat(table, "<td></td>");
    }
  } // закрытие таблицы


  table = "".concat(table, "</tr></tbody></table>");
  prev.innerHTML = "\n        <svg class='calendar_head_prev_svg' viewBox=\"0 0 50 80\" xml:space=\"preserve\">\n            <polyline points=\"45.63,75.8 0.375,38.087 45.63,0.375 \"/>\n        </svg>  \n    ";
  next.innerHTML = "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" class='calendar_head_next_svg' viewBox=\"0 0 50 80\" xml:space=\"preserve\">\n            <polyline points=\"0.375,0.375 45.63,38.087 0.375,75.8\"/>\n        </svg>\n    ";
  var getYear = checkMonth(year, month, date);
  console.log(getYear);
  console.log(new Date(year - 1));
  dateHeading.innerHTML = "\n            <div class=\"calendar_head_date_month\">\n                ".concat(months[month], "\n            </div>\n            <div class=\"calendar_head_date_year\">\n                ").concat(getYear, "\n            </div>");
  cld.innerHTML = table;
  headingCalendar.appendChild(prev);
  headingCalendar.appendChild(dateHeading);
  headingCalendar.appendChild(next);
  document.querySelector('.calendar_head_date_month').dataset.month = date.getMonth();
  document.querySelector('.calendar_head_date_year').dataset.year = date.getFullYear();
};

document.addEventListener('DOMContentLoaded', function () {
  var prevBtn = document.querySelector('.calendar_head_prev'),
      nextBtn = document.querySelector('.calendar_head_next'),
      btns = document.querySelectorAll('.calendar_table_day_btn');
  nextBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var month = +document.querySelector(".calendar_head_date_month").dataset.month,
        year = +document.querySelector('.calendar_head_date_year').dataset.year;
    hidePopover(btns);
    createCalendar(calendar, year, month);
    addPopover(btns);
  });
  prevBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var month = +document.querySelector(".calendar_head_date_month").dataset.month,
        year = +document.querySelector('.calendar_head_date_year').dataset.year;

    if (month == 1) {
      month = 11;
      year = year - 1;
    } else if (month == 0) {
      month = 10;
      year = year - 1;
    } else {
      month = month - 2;
    }

    hidePopover(btns);
    createCalendar(calendar, year, month);
    addPopover(btns);
  });
});

var checkMonth = function checkMonth(year, month, date) {
  if (month == 11) {
    return new Date(year, month).getFullYear();
  } else return date.getFullYear();
};

var addPopover = function addPopover(arr) {
  arr.forEach(function (btn) {
    return btn.addEventListener('click', function (e) {
      console.log(btn.id);

      for (var i = 0; i < arr.length; i++) {
        if (e.target !== arr[i].id) {
          $(arr[i]).popover('hide');
        }
      }
    });
  });
};

var hidePopover = function hidePopover(arr) {
  btns.forEach(function (btn) {
    $(btn).popover('toggleEnabled');
  });
};

createCalendar(calendar, new Date().getFullYear(), new Date().getMonth(), new Date().getDate());