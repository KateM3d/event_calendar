'use strict';

let calendar = document.querySelector('.calendar_body'),
    headingCalendar = document.querySelector('.calendar_head');

let prev = document.createElement('button'),
    next = document.createElement('button'),
    addMonth = document.createElement('div'),
    monthName,
    addYear = document.createElement('div');

    prev.className = `calendar_head_prev`;
    next.className = `calendar_head_next`;
    addMonth.className = `calendar_head_month`;
    addYear.className = `calendar_head_year`;

const getDay = (d) => {
    let day = d.getDay();
    if(day == 0) day = 7;
    return day - 1;
}


const createDOMCalendar = (month, year) => {
    
    addMonth.id = +month;

    switch(month) {
        case 1: monthName = `Январь`;
            break;
        case 2: monthName = `Февраль`;
            break;
        case 3: monthName =  `Март`;
            break;
        case 4: monthName =  `Апрель`;
            break;
        case 5: monthName =  `Май`;
            break;
        case 6: monthName = `Июнь`;
            break;
        case 7: monthName = `Июль`;
            break;
        case 8: monthName = `Август`;
            break;
        case 9: monthName = `Сентябрь`;
            break;
        case 10: monthName = `Октябрь`;
            break;
        case 11: monthName = `Ноябрь`;
            break;
        case 12: monthName = `Декабрь`;
            break;
    }

    prev.innerHTML = '<';
    next.innerHTML = '>';
    addMonth.innerHTML = monthName;
    addYear.innerHTML = year;

    headingCalendar.appendChild(prev);
    headingCalendar.appendChild(addMonth);
    headingCalendar.appendChild(addYear);
    headingCalendar.appendChild(next);
    
    
}

const createCalendar = (cld, year, month) => {

    let date = new Date(year, month);
    
    let table = `
            <table class="calendar_table card">
                <tbody>
                    <tr>
                        <th class="card-body calendar_table_week">пн</th>
                        <th class="card-body calendar_table_week" >вт</th>
                        <th class="card-body calendar_table_week">ср</th>
                        <th class="card-body calendar_table_week">чт</th>
                        <th class="card-body calendar_table_week">пт</th>
                        <th class="card-body calendar_table_week">сб</th>
                        <th class="card-body calendar_table_week">вс</th>
                    </tr>
        `;


    // пробелы для пустых дней первой недели
    for (let i = 0; i < getDay(date); i++) {
        table = `${table}<td class="card-body calendar_table_day"></td>`;
    }

    // ячейки календаря
    while(date.getMonth() === month) {
        table = `${table}<td class="card-body calendar_table_day">${date.getDate()}</td>`;

        if(getDay(date) % 7 == 6) { // перевод строки с вс
            table = `${table}</tr><tr>`;
        } 

        date.setDate(date.getDate() + 1);
    }

    // пробелы для пустых дней последней недели
    if(getDay(date) != 0) {
        for(let i = getDay(date); i < 7; i++) {
            table = `${table}<td></td>`;
        }
    }

    // закрытие таблицы
    table = `${table}</td></tbody></table>`;

    createDOMCalendar(month, year);
    cld.innerHTML = table;
    btn();
    
}

const btn = () => {
    let prevBtn = document.querySelector('.calendar_head_prev'),
        nextBtn = document.querySelector('.calendar_head_next');

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();

        createCalendar(
            // здесь DOM-элемент
            calendar,
            // берём год из календаря 
            document.querySelector('.calendar_head_year').id,
            // берём месяц из календаря
            ((+document.querySelector(`.calendar_head_month`).id) + 1)
        )

        
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();

        createCalendar(
            // здесь DOM-элемент
            calendar,
            // берём год из календаря 
            document.querySelector('.calendar_head_year').id,
            // берём месяц из календаря
            ((+document.querySelector(`.calendar_head_month`).id) - 1)
        )

    })
}

createCalendar(calendar, new Date().getFullYear(), new Date().getMonth());