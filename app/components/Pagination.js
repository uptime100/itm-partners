import React from 'react';
import PropTypes from 'prop-types';

const Pagination = props => {
  /*
    @page = current page
    @total = total item total
    @pages = total page total
    @prev = previous page available?
    @next = next page available
    @startCount, @endCount = showing 6-10 of 15 items...

    @fetchData = fn = function to pass the current page
    @itemName = string = display name -> showing 1-5 of 15 {itemName}
  */

  const { pagination, fetchData, itemName = 'items' } = props;
  if (!pagination) return null;
  const { page, totalDocs: total, totalPages: pages, limit } = pagination;

  if (pages === 0) {
    return null;
  }

  let startNum = 1;
  let endNum = 1;

  if (pages < 5) {
    startNum = 1;
    endNum = pages;
  } else {
    if (page < 3) {
      const toAdd = 5 - page;
      endNum = page + toAdd;
    } else {
      endNum = page + 2;
    }

    if (endNum > pages) {
      endNum = pages;
    }

    startNum = endNum - 4;
    if (startNum < 1) {
      startNum = 1;
    }
  }

  let startCount = 1;
  startCount = (page - 1) * limit + 1;
  let endCount = page * limit;
  endCount = endCount > total ? total : endCount;

  // generate array
  const links = [];

  if (pages > 1) {
    for (let i = startNum; i <= endNum; i += 1) {
      if (i > 1 && i !== pages) {
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
              fetchData(number);
            }}
          >
            {number}
          </button>
        </li>
      );
    });

  const prevDisabled = page <= 1;
  const nextDisabled = page >= pages;
  const isPreviousCurrent =
    page === 1 ? 'pagination-link is-current' : 'pagination-link';
  const isNextCurrent =
    page >= pages ? 'pagination-link is-current' : 'pagination-link';

  const prevEllip =
    pages > 1 && page > 4 ? (
      <li>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
    ) : (
      ''
    );

  const nextEllip =
    total > 1 && page <= pages - 4 ? (
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
    <nav
      className="pagination is-right"
      aria-label="pagination"
      style={props.style}
    >
      <p>
        Showing {startCount} - {endCount} of {total} {itemName}
      </p>
      <ul className="pagination-list">
        <li>
          <button
            className="pagination-link"
            aria-label="Go previous page"
            disabled={prevDisabled}
            onClick={() => {
              executeFetch(page - 1, prevDisabled);
            }}
          >
            <i className="fas fa-caret-left fa-lg" />
          </button>
        </li>

        {pages > 1 && (
          <li>
            <button
              className={isPreviousCurrent}
              aria-label="Go to first page"
              onClick={() => {
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

        {pages > 1 && (
          <li>
            <button
              className={isNextCurrent}
              aria-label="Goto last page"
              onClick={() => {
                executeFetch(pages, nextDisabled);
              }}
            >
              {pages}
            </button>
          </li>
        )}
        <li>
          <button
            className="pagination-link"
            aria-label="Goto next page"
            disabled={nextDisabled}
            onClick={() => {
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
  style: PropTypes.any,
};

export default Pagination;
