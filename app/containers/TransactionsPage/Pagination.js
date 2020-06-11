import React from 'react';
import PropTypes from 'prop-types';

const Pagination = props => {
  /*
    @page = current page
    @count = total item count
    @pageCount = total page count
    @prev = previous page available?
    @next = next page available
    @startCount, @endCount = showing 6-10 of 15 items...

    @fetchData = fn = function to pass the current page
    @itemName = string = display name -> showing 1-5 of 15 {itemName}
  */

  const { pagination, fetchData, itemName = 'items' } = props;
  if (!pagination) return null;

  const {
    page,
    count,
    pageCount,
    // prev,
    // next,
    startCount,
    endCount,
  } = pagination;
  if (pageCount === 0) {
    return null;
  }

  let startNum = 1;
  let endNum = 1;

  if (pageCount < 5) {
    startNum = 1;
    endNum = pageCount;
  } else {
    if (page < 3) {
      const toAdd = 5 - page;
      endNum = page + toAdd;
    } else {
      endNum = page + 2;
    }

    if (endNum > pageCount) {
      endNum = pageCount;
    }

    startNum = endNum - 4;
    if (startNum < 1) {
      startNum = 1;
    }
  }

  // generate array
  const links = [];

  if (pageCount > 1) {
    for (let i = startNum; i <= endNum; i += 1) {
      if (i > 1 && i !== pageCount) {
        links.push(i);
      }
    }
  } else {
    for (let i = startNum; i <= endNum; i += 1) {
      links.push(i);
    }
  }

  const renderLinks = () =>
    links.map((number, key) => {
      let className = 'pagination-link';
      if (number === page) {
        className += ' is-current';
      }

      return (
        <li key={key}>
          <button
            className={className}
            aria-label={`Go to page ${number}`}
            onClick={() => {
              props.closeDropDownHandler();
              fetchData(number);
            }}
          >
            {number}
          </button>
        </li>
      );
    });

  const prevDisabled = page <= 1;
  const nextDisabled = page >= pageCount;
  const isPreviousCurrent =
    page === 1 ? 'pagination-link is-current' : 'pagination-link';
  const isNextCurrent =
    page >= pageCount ? 'pagination-link is-current' : 'pagination-link';

  const prevEllip =
    pageCount > 1 && page > 4 ? (
      <li>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
    ) : (
      ''
    );

  const nextEllip =
    count > 1 && page <= pageCount - 4 ? (
      <li>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
    ) : (
      ''
    );

  const executeFetch = (number, disabled) => {
    if (disabled) {
      return;
    }

    fetchData(number);
  };

  return (
    <nav className="pagination is-right" aria-label="pagination">
      {count === 0 ? (
        <p>Showing 0 - 0 of 0 {itemName}</p>
      ) : (
        <p>
          Showing {startCount} - {endCount} of {count} {itemName}
        </p>
      )}

      <ul className="pagination-list">
        <li>
          <button
            className="pagination-link"
            aria-label="Go previous page"
            disabled={prevDisabled}
            onClick={() => {
              props.closeDropDownHandler();
              executeFetch(page - 1, prevDisabled);
            }}
          >
            <i className="fas fa-caret-left fa-lg" />
          </button>
        </li>

        {pageCount > 1 && (
          <li>
            <button
              className={isPreviousCurrent}
              aria-label="Go to first page"
              onClick={() => {
                props.closeDropDownHandler();
                executeFetch(1, prevDisabled);
              }}
            >
              1
            </button>
          </li>
        )}

        {prevEllip}
        {renderLinks()}
        {nextEllip}

        {pageCount > 1 && (
          <li>
            <button
              className={isNextCurrent}
              aria-label="Goto last page"
              onClick={() => {
                props.closeDropDownHandler();
                executeFetch(pageCount, nextDisabled);
              }}
            >
              {pageCount}
            </button>
          </li>
        )}

        <li>
          <button
            className="pagination-link"
            aria-label="Goto next page"
            disabled={nextDisabled}
            onClick={() => {
              props.closeDropDownHandler();
              executeFetch(page + 1, nextDisabled);
            }}
          >
            <i className="fas fa-caret-right fa-lg" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object,
  fetchData: PropTypes.func,
  itemName: PropTypes.string,
  closeDropDownHandler: PropTypes.func,
};

export default Pagination;
