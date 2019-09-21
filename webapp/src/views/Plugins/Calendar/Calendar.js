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
    title: 'Today',
    start: new Date(),
    end: new Date()
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
