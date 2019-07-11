import React from 'react';
import PropTypes from 'prop-types';

//Chuyển vào param để  load lại paging.
const propTypes = {
  requestParamsNotPaging: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalPages: PropTypes.number.isRequired
}

const defaultProps = {
  initialPage: 1,
  pageSize: 10
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.totalPages && this.props.totalPages > 0) {
      this.setPage(this.props.initialPage);
    }
  }

  componentWillReceiveProps(nextProps){
    // reset page if items array has changed
    if(this.props.totalPages !== nextProps.totalPages){
      this.setDefaultPage(nextProps);
    }
    else if (nextProps !==null && JSON.stringify(this.props.requestParamsNotPaging) !== JSON.stringify(nextProps.requestParamsNotPaging)) {

      this.setDefaultPage(nextProps);
    }
  }

  setDefaultPage(newprops){
    var {pageSize, totalPages,initialPage } = newprops;
    var pager = this.state.pager;
    // restPage when new param Object
    pager = this.getPager(totalPages, initialPage, pageSize);

    // update state
    this.setState({ pager: pager });
  }

  setPage(page) {
    var {pageSize, totalPages } = this.props;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }
    // get new pager object for specified page
    pager = this.getPager(totalPages, page, pageSize);

    // update state
    this.setState({ pager: pager });

    // get new page of items by calling change page function in parent component
    this.props.onChangePage(page);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = totalItems;

    var startPage, endPage;
    if (totalPages <= 5) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 5;
        endPage = totalPages;
      } else {
        startPage = currentPage - 3;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }
    return (
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
        </li>
        {pager.pages.map((page, index) =>
          <li key={index} className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
        )}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;