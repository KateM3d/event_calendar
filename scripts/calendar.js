'use strict';

let calendar = document.querySelector('.main_planner_calendar_body'),
    headingCalendar = document.querySelector('.main_planner_calendar_head');
    addMessage = document.querySelector('#in'),
    addButton = document.querySelector('#add'),
    todo = document.querySelector('#out');

let prev = document.createElement('button'),
    next = document.createElement('button'),
    dateHeading = document.createElement('div'),
    addMonth = document.createElement('div'),
    addYear = document.createElement('div');


prev.className = `main_planner_calendar_head_prev`;
next.className = `main_planner_calendar_head_next`;
dateHeading.className = `main_planner_calendar_head_date`;
addMonth.className = `main_planner_calendar_head_date_month`;
addYear.className = `main_planner_calendar_head_date_year`;

class Calendar {
    #btns() {
        return document.querySelectorAll('.main_planner_calendar_table_day_btn')
    }
    #month() {
        return document.querySelector(`.main_planner_calendar_head_date_month`).dataset.month
    }
    #year() {
        return document.querySelector('.main_planner_calendar_head_date_year').dataset.year
    }
    #getDay(d) {
        let day = d.getDay();
        if (day == 0) day = 7;
        return day - 1;
    }
    #addBtn() {
        return document.querySelector('#add');
    }
    #checkMonth(year, month, date) {
        if (month == 11) {
            return new Date(year, month).getFullYear();
        } else return date.getFullYear()
    }
    #addPopover() {
        for(let btn of this.#btns()) {
            btn => btn.addEventListener('click', (e) => {
                for (let i = 0; i < this.btns.length; i++) {
                    if (e.target !== this.btns()[i].id) {
                        $(this.btns()[i]).popover('hide');
                    }
                }
            })
        }
    }
    #hidePopover(elems) {
        for(let el of elems) {
            $(el).popover('dispose');
        }
    }
    #onClickClose(calendar) {
        const outsideClickListener = (e) => {
            if (!calendar.contains(e.target) && this.#inVisible(calendar)) { 
    
                $(this.#btns()).popover('hide');
                document.removeEventListener('click', outsideClickListener);
            }
        };
        document.addEventListener('click', outsideClickListener);
    }
    #inVisible(elem) {
        return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    }
    #hidePopoverOnClick() {
        for (let btn of this.#btns()) {
            btn.addEventListener('click', (e) => {
                for (let i = 0; i < this.#btns().length; i++) {
                    this.#onClickClose(calendar, this.#btns()[i]);
                    this.#inVisible(this.#btns()[i]);
                    $(this.#btns()[i]).popover('update');
                    $(this.#btns()[i]).popover('hide');
                    if (+e.target.id === (i + 1)) {
                        $(this.#btns()[(i + 1)]).popover('show');
                    }
                }
            })
        }

        for (let btn of this.#btns())(
            btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                })
            }
        )
    }
    #getDataForCurrentMonth () {
        if (localStorage.getItem(`${this.#month()}${this.#year()}`) && localStorage.getItem(`${this.#month()}${this.#year()}`) != []) {

            let todoInCalendar = JSON.parse(localStorage.getItem(`${this.#month()}${this.#year()}`));

            for (let i = 0; i < this.#btns().length; i++) {
                this.#btns()[i].innerHTML = todoInCalendar[i];
                if (this.#btns()[i].children[0]) {
                    for (let j = 0; j < this.#btns()[i].children.length; j++) {
                        this.#btns()[i].children[j].style.display = "block";
                    }
                }
            }
        }
    };
    #updateCalendarInStor () {
        let todoInCalendar = [];

        for (let i = 0; i < this.#btns().length; i++) {
            todoInCalendar.push(this.#btns()[i].innerHTML);
        }

        localStorage.setItem(`${this.#month()}${this.#year()}`, 
        JSON.stringify(todoInCalendar));
    }
    #updateTodoList (dragItem) {
        for (let i = 0; i < todoList.length; i++) {
            if (dragItem.textContent == todoList[i].todo) {
                todoList.splice(i, 1);
                break;
            }
        }

        localStorage.setItem('todo', JSON.stringify(todoList));
        this.#updateCalendarInStor();
    }

    

    get month() {
        return document.querySelector(`.main_planner_calendar_head_date_month`).dataset.month
    }
    get year() {
        return document.querySelector('.main_planner_calendar_head_date_year').dataset.year
    }
    

    createCalendar(year, month, day) {

        let date = new Date(year, month),
            months = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
            ],
            weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            table,
            getYear = this.#checkMonth(year, month, date),
            i = 0;

        // fill in the days of the week
        for (let i = 0; i < weekDays.length; i++) {
            if(i === 0) {
                table = `
                <table class="main_planner_calendar_table card table">
                    <thead>
                        <tr>
                            <th class="card-body main_planner_calendar_table_week">${weekDays[i]}</td>
                `
            }  else {
                table = `${table}<th class="card-body main_planner_calendar_table_week">${weekDays[i]}</td>`
            } 
        }

        table = `${table}</tr></thead>
                <tbody  class="table-striped">
                <tr>`

        // adding empty cells
        for (let i = 0; i < this.#getDay(date); i++) {
            table = `${table}<td class="card-body"></td>`;
        }

        // adding calendar cells
        while (date.getMonth() === month) {

            if (month === new Date().getMonth() && day === date.getDate()) {
                table = `${table}<td class="card-body main_planner_calendar_table_day main_planner_calendar_table_day_today"><button id = "${i++}" type="button" class="btn btn-lg main_planner_calendar_table_day_btn" data-bs-toggle="popover" title="To-do list" data-bs-content="-">${date.getDate()}</button></td>`;
            } else {
                table = `${table}<td class="card-body main_planner_calendar_table_day"> <button id = "${i++}" type="button" class="btn btn-lg main_planner_calendar_table_day_btn" data-bs-toggle="popover" title="To-do list" data-bs-content="-" >${date.getDate()}</button></td>`;
            }

            $(function() {
                $('[data-toggle="popover"]').popover();
            })

            if (this.#getDay(date) % 7 == 6) { // line feed from Sunday
                table = `${table}</tr><tr>`;
            }

            date.setDate(date.getDate() + 1);
        }

        // adding empty cells of the last week
        if (this.#getDay(date) != 0) {
            for (let i = this.#getDay(date); i < 7; i++) {
                table = `${table}<td></td>`;
            }
        }

        // closing the table
        table = `${table}</tr></tbody></table>`;

        // adding the back button
        prev.innerHTML = `
            <svg class='main_planner_calendar_head_prev_svg' viewBox="0 0 50 80" xml:space="preserve">
                <polyline points="45.63,75.8 0.375,38.087 45.63,0.375 "/>
            </svg>  
        `;
        prev.id = `prev`;

        // adding the next button
        next.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class='main_planner_calendar_head_next_svg' viewBox="0 0 50 80" xml:space="preserve">
                <polyline points="0.375,0.375 45.63,38.087 0.375,75.8"/>
            </svg>
        `;
        next.id = `next`;

        // adding a calendar title
        dateHeading.innerHTML = `
                <div class="main_planner_calendar_head_date_month">
                    ${months[month]}
                </div>
                <div class="main_planner_calendar_head_date_year">
                    ${getYear}
                </div>`;

        // adding a table to HTML        
        calendar.innerHTML = table;

        // fill in the table header
        headingCalendar.appendChild(prev);
        headingCalendar.appendChild(dateHeading);
        headingCalendar.appendChild(next);

        // adding data to the month and year tags to get and change them when the month changes on the calendar
        document.querySelector('.main_planner_calendar_head_date_month').dataset.month = date.getMonth();
        document.querySelector('.main_planner_calendar_head_date_year').dataset.year = date.getFullYear();

        // calling the function that hides popovers by click
        this.#addPopover();
        this.#hidePopoverOnClick(day);
        this.#getDataForCurrentMonth();
    }
    

    switches() {
         let switches = [document.querySelector('.main_planner_calendar_head_prev'), document.querySelector('.main_planner_calendar_head_next')];
         return switches;
    }
    flippingMonths(el, newMonth, newYear) {

        let month, year;

            if(el.id === "next") {
                this.#hidePopover(this.#btns());
                calendar.innerHTML = ``;
                return [+newYear, +newMonth, new Date().getDate()];
            } else if (el.id === "prev") {
                this.#hidePopover(this.#btns());
                if (newMonth == 1) {
                    month = 11;
                    year = +newYear- 1;
                } else if (+newMonth == 0) {
                    month = 10;
                    year = +this.#year() - 1;
                } else {
                    month = +newMonth - 2;
                    year = +newYear
                }
            return [year, month, new Date().getDate()]
            }
    }

    dragAndDrop = () => {
    
        let tasks = document.querySelectorAll('.liLabel'),
            dragItem;

        // handler for the drag start event
        const dragStart = (e) => {
            setTimeout(() => {
                e.target.style.display = "none"
                e.target.parentNode.style.display = "none", 0
            });
            console.log(e)
            return dragItem = e.target;
        }

        // handler for the end of the drag event
        const dragEnd = (e) => {
            setTimeout(() => {
                e.target.style.display = "block"
                e.target.parentNode.style.display = "block", 0
            });
            console.log(e.target)
            return dragItem = e.target;
        }

        // deleting a note from a day in the calendar
        const clearDay = (e) => {
            e.preventDefault();
            console.log(dragItem)
            console.log(e.target)
            e.target.remove(dragItem);
            this.#updateCalendarInStor();
        }

        // release the dragged element inside the target and add it to the children
        const drop = (e) => {
            e.preventDefault();
            e.target.append(dragItem);
            this.#updateTodoList(dragItem);
        }

        // movement of the dragged element inside the target
        const dragOver = (e) => {
            e.preventDefault();
            console.log(e)
        }

        // the draggable element being dragged falls into a valid drag target
        const dragEnter = (e) => {
            e.preventDefault();
            console.log(e)
        }

        // setting the style to the element receiving the dragged element
        const dragLeave = (e) => {
            e.target.style.border = "none";
        }   

        // sort all the and add the removal functions longing for a double click
        for (let task of tasks) {

            task.addEventListener('dragstart', dragStart);
            task.addEventListener('dragend', dragEnd);
            task.addEventListener('dblclick', clearDay);

        }
    
        // sort all the days of the calendar and hang handlers for drag&drop on them
        for (let btn of this.#btns()) {

            btn.addEventListener('dragover', dragOver);
            btn.addEventListener('dragenter', dragEnter);
            btn.addEventListener('dragleave', dragLeave);
            btn.addEventListener('drop', drop);

        }
    
        // overwriting and sorting tasks when adding a note (pressing a button)
        this.#addBtn().addEventListener('click', () => {

            tasks = document.querySelectorAll('.liLabel')
    
            for (let task of tasks) {
                console.log(task)
                task.addEventListener('dragstart', dragStart);
                task.addEventListener('dragend', dragEnd);
                task.addEventListener('dblclick', clearDay);
            }

        })

    }

}

document.addEventListener('DOMContentLoaded', () => {
    let cld = new Calendar();
    
    cld.createCalendar(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    cld.switches().forEach(
        sw => {
            sw.addEventListener('click', () => {
                let newDate = cld.flippingMonths(sw, cld.month, cld.year);
                console.log(newDate)
                cld.createCalendar(...newDate);
            })
        }
    )

    cld.dragAndDrop();
});