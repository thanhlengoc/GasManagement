import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardHeader, CardBody, CardFooter} from 'reactstrap';
import {withRouter} from "react-router-dom";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const currDate = new Date();
const currYear = currDate.getFullYear();
const currMonth = currDate.getMonth();

const events = [
  {
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(currYear, currMonth, 0),
    end: new Date(currYear, currMonth, 1)
  },
  {
    title: 'DTS STARTS',
    start: new Date(currYear+1, 2, 13, 0, 0, 0),
    end: new Date(currYear+1, 2, 20, 0, 0, 0)
  },

  {
    title: 'DTS ENDS',
    start: new Date(currYear+1, 10, 6, 0, 0, 0),
    end: new Date(currYear+1, 10, 13, 0, 0, 0)
  },

  {
    title: 'Some Event',
    start: new Date(currYear, currMonth, 9, 0, 0, 0),
    end: new Date(currYear, currMonth, 9, 0, 0, 0)
  },
  {
    title: 'Meeting',
    start: new Date(currYear, currMonth, 12, 10, 30, 0, 0),
    end: new Date(currYear, currMonth, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    title: 'Today',
    start: new Date(currYear, currMonth, 13, 7, 0, 0),
    end: new Date(currYear, currMonth, 13, 10, 30, 0)
  },
];

// todo: reactive custom calendar toolbar component

class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="animated">
        <Card>
          <CardBody style={{height: '40em',padding:'0.5em'}}>
            <BigCalendar className="d-sm-down-none"
              {...this.props}
              events={events}
              views={['month', 'week', 'day']}
              step={30}
              defaultDate={new Date(currYear, currMonth, 1)}
              defaultView='month'
              toolbar={true}
            />
            <BigCalendar className="d-md-none"
              {...this.props}
              events={events}
              views={['day']}
              step={30}
              defaultDate={new Date(currYear, currMonth, 1)}
              defaultView='day'
              toolbar={true}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Calendar;
