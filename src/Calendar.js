import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import './styles/calendar.scss';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            text: '',
            modal: false,
            loading: true,
            update: false
        }
        this.arr = [];
        this.monthNum = '';
        this.day = 0;
        this.month = '';
        this.year = 0;
        this.firstWeekday = '';
        this.daysNum = 0;
        this.notes = [];
        this.currentMonth = 0;
        this.value = '';
        this.id = 0;
        this.err = null;
        this.modal = React.createRef();
        this.signal = axios.CancelToken.source();
    }

    componentDidMount() {
        this.getDate(this.state.date);
        this.fillArray();
        this.getNotes();
    }

    componentDidUpdate() {
        if(this.state.update) {
            this.getDate(this.state.date);
            this.fillArray();
            this.getNotes();
        }
    }

    componentWillUnmount() {
        this.signal.cancel('Api is being canceled');
    }

    getDate = (date) => {
        this.arr = date.toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric' }).split(' ');
        this.monthNum = date.toLocaleDateString('en-GB', {month: '2-digit'});
        this.day = this.arr[0];
        this.month = this.arr[1];
        this.year = this.arr[2];
        this.firstWeekday = new Date(`${this.year}-${this.monthNum}-1`).toLocaleDateString('en-GB', {weekday: 'short'});
        this.daysNum = new Date(this.year, this.monthNum, 0).getDate();
    }

    getNotes = () => {
        axios.get(`/api/notes?userId=${this.props.cookies.get('id')}&month=${this.month}&year=${this.year}&_sort=day&_order=asc`, {cancelToken: this.signal.token})
        .then(res => {
            this.notes = res.data;
            this.err = null;
            this.fillCalendar();
        })
        .catch(err => {
            if (!axios.isCancel(err)) {
                this.err = err.message;
                this.notes = [];
                this.fillCalendar();
            }
        });
    }

    fillArray = () => {
        this.arr = [];
        let count = 1;
        let offset = 0;
        let first = true;
        let emptyId = parseInt(this.year);
        if (this.firstWeekday === "Tue") {
            offset = 1;
        }
        else if (this.firstWeekday === "Wed") {
            offset = 2;
        }
        else if (this.firstWeekday === "Thu") {
            offset = 3;
        }
        else if (this.firstWeekday === "Fri") {
            offset = 4;
        }
        else if (this.firstWeekday === "Sat") {
            offset = 5;
        }
        else if (this.firstWeekday === "Sun") {
            offset = 6;
        }
        while(count <= this.daysNum) {
            let a = [];
            for(let i = 0; i < 7; i++) {
                if ((first && i < offset) || count > this.daysNum) {
                    a.push({data: '', id: emptyId++});
                }
                else {
                    a.push({data: count, id: count});
                    count++;
                }
            }
            first = false;
            this.arr.push(a);
        }
    }

    fillCalendar = () => {
        this.arr = this.arr.map((elems, index) => 
            <tr key={-index}>
                {elems.map(elem => 
                <td onClick={() => this.openModal(elem.id)} className={parseInt(this.day) === elem.id ? "calendar__cell now" : "calendar__cell"} key={elem.id}>
                    {this.notes.find(note => note.day === elem.id) && <p className="dot">&#8226;</p>}
                    {elem.data}
                </td>)}
            </tr>
        );
        this.setState({update: false, loading: false});
    }

    prev = () => {
        let month = parseInt(this.monthNum);
        let year = parseInt(this.year);
        month--;
        if(month === 0) {
            month = 12;
            year--;
        }
        this.currentMonth--;
        if(this.currentMonth === 0) {
            this.setState({date: new Date(), update: true});
        }
        else {
            this.setState({date: new Date(`${year}-${month}-1`), update: true});
        }
    }

    next = () => {
        let month = parseInt(this.monthNum);
        let year = parseInt(this.year);
        month++;
        if(month === 13) {
            month = 1;
            year++;
        }
        this.currentMonth++;
        if(this.currentMonth === 0) {
            this.setState({date: new Date(), update: true});
        }
        else {
            this.setState({date: new Date(`${year}-${month}-1`), update: true});
        }
    }

    openModal = (id) => {
        if(id < parseInt(this.year)) {
            this.day = id;
            const obj = this.notes.find(elem => elem.day === id);
            if(obj) {
                this.id = obj.id;
                this.setState({text: obj.text, modal: true, update: false})
            }
            else {
                this.setState({text: '', modal: true, update: false});
            }
        }
    }

    closeModal = (event) => {
        if (event.target === this.modal.current && this.state.modal) {
            this.setState({modal: false, update: false});
        }
    }

    save = () => {
        let data = {};
        data.user_id = parseInt(this.props.cookies.get('id'));
        data.day = parseInt(this.day);
        data.month = this.month;
        data.year = parseInt(this.year);
        data.text = this.value;
        let request;
        if(this.state.text === '') {
            if(data.text === '') return this.setState({modal: false, update: false});
            request = axios.post('/api/notes', data, {cancelToken: this.signal.token});
        }
        else {
            if(data.text === '') {
                request = axios.delete(`/api/notes/${this.id}`);
            }
            else {
                request = axios.put(`/api/notes/${this.id}`, data, {cancelToken: this.signal.token});
            }
        }
        request.then(res => {
            if(this.state.text === '') {
                this.notes.push(res.data);
                this.notes.sort((a, b) => a.day - b.day);
            }
            else {
                if(data.text === '') {
                    this.notes = this.notes.filter(note => note.id !== this.id);
                }
                else {
                    const i = this.notes.findIndex(elem => elem.id === res.data.id);
                    this.notes[i] = res.data;
                }
            }
            this.err = null;
            this.setState({modal: false, update: true})
        })
        .catch(err => {
            if (!axios.isCancel(err)) {
                this.err = err.message;
                this.setState({modal: false, update: false});
            }
        });
    }

  render() { 
    return (
        <main className="content" onClick={this.closeModal}>
            <ul className="breadcrumb">
                <li className="breadcrumb__elem"><a className="breadcrumb__link" href="/">Home</a></li>
                <li className="breadcrumb__elem">Calendar</li>
            </ul> 
            {this.state.loading ? <div className="loader"></div> :
            <>
            {this.err && <h2 className="error">{this.err}</h2>}
            {this.state.modal &&
                <div ref={this.modal} className="modal">
                    <div className="modal__content">
                        <span className="modal__close-btn" onClick={() => this.setState({modal: false, update: false})}>&times;</span>
                        <label>
                            Note:
                        </label>
                        <textarea className="modal__content-text" defaultValue={this.state.text} placeholder="Write some note" onChange={(e) => this.value = e.target.value}/>
                        <div className="modal__actions">
                            <button className="modal__cancel-btn" onClick={() => this.setState({modal: false, update: false})}>Cancel</button>
                            <button className="modal__save-btn" onClick={this.save}>Save</button>
                        </div>
                    </div>
                </div>}
                <table className="calendar">
                    <caption className="calendar__caption">
                    <a className="calendar__prev" onClick={this.prev}>&#10094;</a>
                        <a className="calendar__next" onClick={this.next}>&#10095;</a>
                        {this.month} {this.year} 
                    </caption>
                    <thead className="calendar__head">
                        <tr>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>
                    </thead>
                    <tbody className="calendar__body">
                        {this.arr}
                    </tbody>
                </table>
                <div className="content__text">
                    <p>This is your own calendar. You could add some notes to this and nobody exept you will see it. Your can write there whatever you want</p>
                    <p>To add your note just click on some day in calendar, enter your text and click on save button.</p>
                    <p>Red dot under day means that your have note there.</p>
                    <p>To delete some note just open it and delete all text.</p>
                    <p>You cannot add note to empty cell.</p>
                </div>
                </>}
        </main>
    );
  }
}

Calendar.propTypes = {
    cookies: PropTypes.instanceOf(Cookies)
  };

export default Calendar;