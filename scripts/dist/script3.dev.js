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

var createCalendar = function createCalendar(cld, year, month) {
  var date = new Date(year, month),
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      table = "\n            <table class=\"calendar_table card table\">\n                <thead>\n                    <tr>\n                        <th class=\"card-body calendar_table_week\">mon</th>\n                        <th class=\"card-body calendar_table_week\">tue</th>\n                        <th class=\"card-body calendar_table_week\">wed</th>\n                        <th class=\"card-body calendar_table_week\">thu</th>\n                        <th class=\"card-body calendar_table_week\">fri</th>\n                        <th class=\"card-body calendar_table_week\">sat</th>\n                        <th class=\"card-body calendar_table_week\">sun</th>\n                    </tr>\n                </thead>\n                <tbody  class=\"table-striped\">\n                    <tr>\n        "; // пустые ячейки первой недели

  for (var i = 0; i < getDay(date); i++) {
    table = "".concat(table, "<td class=\"card-body\"></td>");
  } // ячейки календаря


  while (date.getMonth() === month) {
    table = "".concat(table, "<td class=\"card-body calendar_table_day\">").concat(date.getDate(), "</td>");

    if (getDay(date) % 7 == 6) {
      // перевод строки с вс
      table = "".concat(table, "</tr><tr>");
    }

    date.setDate(date.getDate() + 1);
  } // пустые ячейки последней недели


  if (getDay(date) != 0) {
    for (var _i = getDay(date); _i < 7; _i++) {
      table = "".concat(table, "<td></td>");
    }
  } // закрытие таблицы


  table = "".concat(table, "</tr></tbody></table>");
  prev.innerHTML = "\n        <svg class='calendar_head_prev_svg' viewBox=\"0 0 50 80\" xml:space=\"preserve\">\n            <polyline points=\"45.63,75.8 0.375,38.087 45.63,0.375 \"/>\n        </svg>  \n    ";
  next.innerHTML = "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" class='calendar_head_next_svg' viewBox=\"0 0 50 80\" xml:space=\"preserve\">\n            <polyline points=\"0.375,0.375 45.63,38.087 0.375,75.8\"/>\n        </svg>\n    ";
  dateHeading.innerHTML = "\n            <div class=\"calendar_head_date_month\">\n                ".concat(months[date.getMonth() - 1], "\n            </div>\n            <div class=\"calendar_head_date_year\">\n                ").concat(date.getFullYear(), "\n            </div>");
  cld.innerHTML = table;
  headingCalendar.appendChild(prev);
  headingCalendar.appendChild(dateHeading);
  headingCalendar.appendChild(next);
  document.querySelector('.calendar_head_date_month').dataset.month = date.getMonth();
  document.querySelector('.calendar_head_date_year').dataset.year = date.getFullYear();
};

document.addEventListener('DOMContentLoaded', function () {
  createCalendar(calendar, new Date().getFullYear(), new Date().getMonth());
  var prevBtn = document.querySelector('.calendar_head_prev'),
      nextBtn = document.querySelector('.calendar_head_next');
  console.log("\u043C\u044B \u0442\u0443\u0442");
  nextBtn.addEventListener('click', function (e) {
    e.preventDefault();
    createCalendar( // здесь DOM-элемент
    calendar, // берём год из календаря 
    +document.querySelector('.calendar_head_date_year').dataset.year, // берём месяц из календаря
    +(document.querySelector(".calendar_head_date_month").dataset.month + 1));
  });
  prevBtn.addEventListener('click', function (e) {
    e.preventDefault();
    createCalendar( // здесь DOM-элемент
    calendar, // берём год из календаря 
    Number(document.querySelector('.calendar_head_date_year').dataset.year), // берём месяц из календаря
    Number(document.querySelector(".calendar_head_date_month").dataset.month) - 1);
  });
});