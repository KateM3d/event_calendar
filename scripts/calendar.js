'use strict';

let calendar = document.querySelector('.calendar_body'),
    headingCalendar = document.querySelector('.calendar_head');

let prev = document.createElement('button'),
    next = document.createElement('button'),
    dateHeading = document.createElement('div'),
    addMonth = document.createElement('div'),
    addYear = document.createElement('div');

prev.className = `calendar_head_prev`;
next.className = `calendar_head_next`;
dateHeading.className = `calendar_head_date`;
addMonth.className = `calendar_head_date_month`;
addYear.className = `calendar_head_date_year`;

const getDay = (d) => {
    let day = d.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

const createCalendar = (cld, year, month, day) => {

    let date = new Date(year, month),
        months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
        ],
        table = `
            <table class="calendar_table card table">
                <thead>
                    <tr>
                        <th class="card-body calendar_table_week">mon</th>
                        <th class="card-body calendar_table_week">tue</th>
                        <th class="card-body calendar_table_week">wed</th>
                        <th class="card-body calendar_table_week">thu</th>
                        <th class="card-body calendar_table_week">fri</th>
                        <th class="card-body calendar_table_week">sat</th>
                        <th class="card-body calendar_table_week">sun</th>
                    </tr>
                </thead>
                <tbody  class="table-striped">
                    <tr>
        `;

    console.log(date)

    // пустые ячейки первой недели
    for (let i = 0; i < getDay(date); i++) {
        table = `${table}<td class="card-body"></td>`;
    }

    // ячейки календаря
    let i = 0;
    while (date.getMonth() === month) {

        if (month === new Date().getMonth() && day === date.getDate()) {
            table = `${table}<td class="card-body calendar_table_day calendar_table_day_today"><button id = "${i++}" type="button" class="btn btn-lg calendar_table_day_btn" data-bs-toggle="popover" title="To-do list" data-bs-content="-">${date.getDate()}</button></td>`;
        } else {
            table = `${table}<td class="card-body calendar_table_day"> <button id = "${i++}" type="button" class="btn btn-lg calendar_table_day_btn" data-bs-toggle="popover" title="To-do list" data-bs-content="-" >${date.getDate()}</button></td>`;
        }

        $(function() {
            $('[data-toggle="popover"]').popover();
        })

        if (getDay(date) % 7 == 6) { // перевод строки с вс
            table = `${table}</tr><tr>`;
        }

        date.setDate(date.getDate() + 1);
    }

    // пустые ячейки последней недели
    if (getDay(date) != 0) {
        for (let i = getDay(date); i < 7; i++) {
            table = `${table}<td></td>`;
        }
    }

    // закрытие таблицы
    table = `${table}</tr></tbody></table>`;

    prev.innerHTML = `
        <svg class='calendar_head_prev_svg' viewBox="0 0 50 80" xml:space="preserve">
            <polyline points="45.63,75.8 0.375,38.087 45.63,0.375 "/>
        </svg>  
    `;
    next.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class='calendar_head_next_svg' viewBox="0 0 50 80" xml:space="preserve">
            <polyline points="0.375,0.375 45.63,38.087 0.375,75.8"/>
        </svg>
    `;

    let getYear = checkMonth(year, month, date);

    dateHeading.innerHTML = `
            <div class="calendar_head_date_month">
                ${months[month]}
            </div>
            <div class="calendar_head_date_year">
                ${getYear}
            </div>`;

    cld.innerHTML = table;
    headingCalendar.appendChild(prev);
    headingCalendar.appendChild(dateHeading);
    headingCalendar.appendChild(next);

    document.querySelector('.calendar_head_date_month').dataset.month = date.getMonth();
    document.querySelector('.calendar_head_date_year').dataset.year = date.getFullYear();

    let btns = document.querySelectorAll('.calendar_table_day_btn')

    btns.forEach(btn =>
        btn.addEventListener('click', (e) => {
            for (let i = 0; i < btns.length; i++) {
                onClickClose(calendar, btns[i]);
                isVisible(btns[i]);
                $(btns[i]).popover('update');
                $(btns[i]).popover('hide');
                if (+e.target.id === (i + 1)) {
                    $(btns[(i + 1)]).popover('show');
                }
            }
        })
    )

    document.querySelectorAll(".calendar_table_day_btn").forEach(
        day => {
            day.addEventListener('click', (e) => {
                e.preventDefault();
            })
        }
    )


    // drag and drop goes here!!!
    let tasks = document.querySelectorAll('.liLabel'),
        dragItem,
        id;

    let addBtn = document.querySelector('#add');
    addBtn.addEventListener('click', () => {
        tasks = document.querySelectorAll('.liLabel');
        for (let f of tasks) {
            f.addEventListener('dragstart', dragStart);
            f.addEventListener('dragend', dragEnd);
        }
    })

    for (let f of tasks) {
        f.addEventListener('dragstart', dragStart);
        f.addEventListener('dragend', dragEnd);
    }

    function dragStart() {
        setTimeout(() => this.style.display = "none", 0);
        return dragItem = this;
    }

    function dragEnd() {
        setTimeout(() => this.style.display = "block", 0);
        return dragItem = this;
    }

    for (let j of btns) {
        j.addEventListener('dragover', dragOver);
        j.addEventListener('dragenter', dragEnter);
        j.addEventListener('dragleave', dragLeave);
        j.addEventListener('drop', Drop);
    }

    function Drop() {
        this.append(dragItem);
        let todoo = JSON.parse(localStorage.getItem(`todo`));
        todoo.forEach((item, index) => {
            if(dragItem.id == item.id) {
                todoo.splice(index, 1);
                let count = 0;
                todoo.forEach((item, index) => {
                    if (count === 0) {
                        item.id = count;
                        count++;
                    } else {
                        item.id = count;
                        count++;
                    }
                })
                
                localStorage.setItem(`todo`, JSON.stringify(todoo));
            }
        })
        
        // console.log(this.dataset.bscontent)
        if(this.dataset.bscontent === undefined) {
            this.dataset.bscontent = `${dragItem.textContent.trim()}`;
        } else {
            this.dataset.bscontent = `${this.dataset.bscontent}, ${dragItem.textContent.trim()}`;
        }
    }

    function dragOver(e) {
        e.preventDefault();
        this.style.border = "2px solid #fde910";
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
        this.style.border = "none";
    }


}


document.addEventListener('DOMContentLoaded', () => {

    let prevBtn = document.querySelector('.calendar_head_prev'),
        nextBtn = document.querySelector('.calendar_head_next'),
        btns = document.querySelectorAll('.calendar_table_day_btn');


    nextBtn.addEventListener('click', () => {

        let month = +document.querySelector(`.calendar_head_date_month`).dataset.month,
            year = +document.querySelector('.calendar_head_date_year').dataset.year,
            btns = document.querySelectorAll('.calendar_table_day_btn');

        hidePopover(btns);
        calendar.innerHTML = ``;
        createCalendar(calendar, year, month, new Date().getDate());
        addPopover(btns);
    });

    prevBtn.addEventListener('click', () => {
        let month = +document.querySelector(`.calendar_head_date_month`).dataset.month,
            year = +document.querySelector('.calendar_head_date_year').dataset.year,
            btns = document.querySelectorAll('.calendar_table_day_btn');
        hidePopover(btns);

        if (month == 1) {
            month = 11;
            year = year - 1;
        } else if (month == 0) {
            month = 10;
            year = year - 1;
        } else {
            month = month - 2;
        }

        createCalendar(calendar, year, month, new Date().getDate());
        $(function() {
            $('[data-toggle="popover"]').popover();
            $('[title = "To-do list"]');
        })

    });
});

const checkMonth = (year, month, date) => {
    if (month == 11) {
        return new Date(year, month).getFullYear();
    } else return date.getFullYear()
}

const addPopover = () => {
    let btns = document.querySelectorAll('.calendar_table_day_btn');
    btns.forEach(btn =>
        btn.addEventListener('click', (e) => {
            for (let i = 0; i < btns.length; i++) {
                if (e.target !== btns[i].id) {
                    $(btns[i]).popover('hide');
                }
            }
        })
    )
}

const hidePopover = () => {
    let btns = document.querySelectorAll('.calendar_table_day_btn');
    btns.forEach(btn => {
        $(btn).popover('dispose');
    })
}

const onClickClose = (elem, arr) => { // вызвать в момент показа списка заметок, где elem - заметки
    const outsideClickListener = (e) => {
        if (!elem.contains(e.target) && isVisible(elem)) { // проверяем, что клик не по элементу и элемент виден

            $(arr).popover('hide');
            document.removeEventListener('click', outsideClickListener);
        }
    };
    document.addEventListener('click', outsideClickListener);
}

const isVisible = (elem) => { //открыто ли условное окно
    return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

createCalendar(calendar, new Date().getFullYear(), new Date().getMonth(), new Date().getDate())