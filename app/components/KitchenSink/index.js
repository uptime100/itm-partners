/**
 *
 * KitchenSink
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import colourStyles from './colourStyle';

/* eslint-disable react/prefer-stateless-function */

class KitchenSink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const items = [
      { value: 'item1', label: 'Item 1' },
      { value: 'item2', label: 'Item 2' },
      { value: 'item3', label: 'Item 3' },
      { value: 'item4', label: 'Item 4' },
    ];

    return (
      <div className="container" style={{ marginBottom: '150px' }}>
        {/* COLOR PALLETE */}
        <div className="content">
          <h2>Colour Pallete</h2>
          <div className="box" style={{ padding: '30px' }}>
            <div className="columns">
              <div className="column">
                <h4>Sky Blue</h4>
                <div className="columns">
                  <div className="column is-1 skyblue-1 has-text-white has-text-weight-bold">
                    P
                  </div>
                  <div className="column is-1 skyblue-2" />
                  <div className="column is-1 skyblue-3" />
                  <div className="column is-1 skyblue-4" />
                  <div className="column is-1 skyblue-5" />
                  <div className="column is-1 skyblue-6" />
                </div>
                <p className="is-size-7">
                  Pantone: <strong>2915 C</strong>
                </p>
                <p className="is-size-7">
                  CMYK: <strong>60,9,0,0</strong>
                </p>
                <p className="is-size-7">
                  RGB: <strong>98,181,229</strong>
                </p>
                <p className="is-size-7">
                  HEX: <strong>#62B5E5</strong>
                </p>
              </div>

              <div className="column">
                <h4> Cadet Blue</h4>
                <div className="columns">
                  <div className="column is-1 cadetBlue-1 has-text-white has-text-weight-bold">
                    P
                  </div>
                  <div className="column is-1 cadetBlue-2" />
                  <div className="column is-1 cadetBlue-3" />
                  <div className="column is-1 cadetBlue-4" />
                  <div className="column is-1 cadetBlue-5" />
                  <div className="column is-1 cadetBlue-6" />
                </div>
                <p className="is-size-7">
                  Pantone: <strong>7484 C</strong>
                </p>
                <p className="is-size-7">
                  CMYK: <strong>90,64,0,0</strong>
                </p>
                <p className="is-size-7">
                  RGB: <strong>56,94,157</strong>
                </p>
                <p className="is-size-7">
                  HEX: <strong>#385E9D</strong>
                </p>
              </div>

              <div className="column">
                <h4>Shore Green</h4>
                <div className="columns">
                  <div className="column is-1 shoreGreen-1 has-text-white has-text-weight-bold">
                    P
                  </div>
                  <div className="column is-1 shoreGreen-2" />
                  <div className="column is-1 shoreGreen-3" />
                  <div className="column is-1 shoreGreen-4" />
                  <div className="column is-1 shoreGreen-5" />
                  <div className="column is-1 shoreGreen-6" />
                </div>
                <p className="is-size-7">
                  Pantone: <strong>566 C</strong>
                </p>
                <p className="is-size-7">
                  CMYK: <strong>17,0,12,0</strong>
                </p>
                <p className="is-size-7">
                  RGB: <strong>185,220,210</strong>
                </p>
                <p className="is-size-7">
                  HEX: <strong>#B9DCD2</strong>
                </p>
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <h4>Dusky Liac</h4>
                <div className="columns">
                  <div className="column is-1 duskyLiac-1 has-text-white has-text-weight-bold">
                    P
                  </div>
                  <div className="column is-1 duskyLiac-2" />
                  <div className="column is-1 duskyLiac-3" />
                  <div className="column is-1 duskyLiac-4" />
                  <div className="column is-1 duskyLiac-5" />
                  <div className="column is-1 duskyLiac-6" />
                </div>
                <p className="is-size-7">
                  Pantone: <strong>7446 C</strong>
                </p>
                <p className="is-size-7">
                  CMYK: <strong>50,46,0,0</strong>
                </p>
                <p className="is-size-7">
                  RGB: <strong>137,134,202</strong>
                </p>
                <p className="is-size-7">
                  HEX: <strong>#8986CA</strong>
                </p>
              </div>

              <div className="column">
                <h4>Dark Purple</h4>
                <div className="columns">
                  <div className="column is-1 darkPurple-1 has-text-white has-text-weight-bold">
                    P
                  </div>
                  <div className="column is-1 darkPurple-2" />
                  <div className="column is-1 darkPurple-3" />
                  <div className="column is-1 darkPurple-4" />
                  <div className="column is-1 darkPurple-5" />
                  <div className="column is-1 darkPurple-6" />
                </div>
                <p className="is-size-7">
                  Pantone: <strong>699 C</strong>
                </p>
                <p className="is-size-7">
                  CMYK: <strong>87,97,8,49</strong>
                </p>
                <p className="is-size-7">
                  RGB: <strong>63,42,86</strong>
                </p>
                <p className="is-size-7">
                  HEX: <strong>#3F2A56</strong>
                </p>
              </div>

              <div className="column">
                <h4>Flash Pink</h4>
                <div className="columns">
                  <div className="column is-1 flashPink-1 has-text-white has-text-weight-bold">
                    P
                  </div>
                  <div className="column is-1 flashPink-2" />
                  <div className="column is-1 flashPink-3" />
                  <div className="column is-1 flashPink-4" />
                  <div className="column is-1 flashPink-5" />
                  <div className="column is-1 flashPink-6" />
                </div>
                <p className="is-size-7">
                  Pantone: <strong>698 C</strong>
                </p>
                <p className="is-size-7">
                  CMYK: <strong>0,16,4,0</strong>
                </p>
                <p className="is-size-7">
                  RGB: <strong>63,42,86</strong>
                </p>
                <p className="is-size-7">
                  HEX: <strong>#3F2A56</strong>
                </p>
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <h4>Neutral Black</h4>
                <div className="columns">
                  <div className="column is-1 neutralBlack-1 has-text-white has-text-weight-bold">
                    P
                  </div>
                  <div className="column is-1 neutralBlack-2" />
                  <div className="column is-1 neutralBlack-3" />
                  <div className="column is-1 neutralBlack-4" />
                  <div className="column is-1 neutralBlack-5" />
                  <div className="column is-1 neutralBlack-6" />
                </div>
                <p className="is-size-7">
                  Pantone: <strong>Black C</strong>
                </p>
                <p className="is-size-7">
                  CMYK: <strong>71,65,64,69</strong>
                </p>
                <p className="is-size-7">
                  RGB: <strong>38,38,38</strong>
                </p>
                <p className="is-size-7">
                  HEX: <strong>#262626</strong>
                </p>
              </div>

              <div className="column">
                <h4>Green</h4>
                <div className="columns">
                  <div className="column is-1 green-1 has-text-white has-text-weight-bold">
                    P
                  </div>
                  <div className="column is-1 green-2" />
                  <div className="column is-1 green-3" />
                  <div className="column is-1 green-4" />
                  <div className="column is-1 green-5" />
                  <div className="column is-1 green-6" />
                </div>
                <p className="is-size-7">
                  Pantone: <strong>347 C</strong>
                </p>
                <p className="is-size-7">
                  CMYK: <strong>51,0,44,33</strong>
                </p>
                <p className="is-size-7">
                  RGB: <strong>42,172,60</strong>
                </p>
                <p className="is-size-7">
                  HEX: <strong>#2AAC3C</strong>
                </p>
              </div>

              <div className="column">
                <h4>Red</h4>
                <div className="columns">
                  <div className="column is-1 red-1 has-text-white has-text-weight-bold">
                    P
                  </div>
                  <div className="column is-1 red-2" />
                  <div className="column is-1 red-3" />
                  <div className="column is-1 red-4" />
                  <div className="column is-1 red-5" />
                  <div className="column is-1 red-6" />
                </div>
                <p className="is-size-7">
                  Pantone: <strong>Warm Red C</strong>
                </p>
                <p className="is-size-7">
                  CMYK: <strong>0,67,67,13</strong>
                </p>
                <p className="is-size-7">
                  RGB: <strong>222,51,51</strong>
                </p>
                <p className="is-size-7">
                  HEX: <strong>#DE3333</strong>
                </p>
              </div>
            </div>

            <div className="columns">
              <div className="column is-4">
                <h4>Yellow</h4>
                <div className="columns">
                  <div className="column is-1 yellow-1 has-text-white has-text-weight-bold">
                    P
                  </div>
                  <div className="column is-1 yellow-2" />
                  <div className="column is-1 yellow-3" />
                  <div className="column is-1 yellow-4" />
                  <div className="column is-1 yellow-5" />
                  <div className="column is-1 yellow-6" />
                </div>
                <p className="is-size-7">
                  Pantone: <strong>804 C</strong>
                </p>
                <p className="is-size-7">
                  CMYK: <strong>0,23,76,5</strong>
                </p>
                <p className="is-size-7">
                  RGB: <strong>242,184,47</strong>
                </p>
                <p className="is-size-7">
                  HEX: <strong>#F2B82F</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* END OF COLOR PALLETE */}

        {/* TYPOGRAPHY */}
        <div className="content">
          <h2>Typhography</h2>
          <div className="columns">
            <div
              className="column"
              style={{ backgroundColor: '#62B5E5', padding: '40px' }}
            >
              {/* Primary Font */}
              <h4 className="has-text-white">Primary Font</h4>
              <div className="columns">
                <div
                  className="column has-text-centered"
                  style={{ backgroundColor: '#FFF', fontSize: '7rem' }}
                >
                  Aa
                  <hr />
                  <div
                    style={{
                      backgroundColor: '#FFF',
                      fontSize: '1rem',
                      color: '#62B5E5',
                    }}
                  >
                    Montserrat
                  </div>
                </div>
                <div className="column has-text-light">
                  <div className="has-text-weight-bold">
                    Montserrat Font Family
                  </div>
                  <br />
                  <div className="has-text-weight-light">Light</div>
                  <div className="has-text-weight-normal">Regular</div>
                  <div className="has-text-weight-semibold">Semibold</div>
                  <div className="has-text-weight-bold">Bold</div>
                  <br />
                  <div>Montserrat is used for headings and titles</div>
                </div>
              </div>
            </div>
            <div
              className="column"
              style={{ backgroundColor: '#385E9D', padding: '40px' }}
            >
              {/* Secondary Font */}
              <h4 className="has-text-white">
                <p>Secondary Font</p>
              </h4>
              <div className="columns">
                <div
                  className="column has-text-centered"
                  style={{
                    backgroundColor: '#FFF',
                    fontSize: '7rem',
                    fontFamily: 'SF Pro',
                  }}
                >
                  Aa
                  <hr />
                  <div
                    style={{
                      backgroundColor: '#FFF',
                      fontSize: '1rem',
                      color: '#62B5E5',
                    }}
                  >
                    <p>San Francisco Pro Display</p>
                  </div>
                </div>
                <div className="column has-text-light">
                  <div className="has-text-weight-bold">
                    <p>SF Pro Display Font Family</p>
                  </div>
                  <br />
                  <div className="has-text-weight-light">
                    <p>Light</p>
                  </div>
                  <div className="has-text-weight-normal">
                    <p>Regular</p>
                  </div>
                  <div className="has-text-weight-semibold">
                    <p>Semibold</p>
                  </div>
                  <div className="has-text-weight-bold">
                    <p>Bold</p>
                  </div>
                  <br />
                  <div>
                    <p>SF Pro Display is used for body</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="columns"
            style={{ backgroundColor: '#FFF', padding: '40px' }}
          >
            <div className="column is-4">
              {/* Headings */}
              <h4>Headings</h4>
              <h1>H1 - Heading 1</h1>
              <h2>H2 - Heading 2</h2>
              <h3>H3 - Heading 3</h3>
              <h4>H4 - Heading 4</h4>
              <h5>H5 - Heading 5</h5>
              <h6>H6 - Heading 6</h6>
            </div>
            <div className="column is-5">
              {/* Body */}
              <h4>Body</h4>
              <p>
                Lorizzle ipsizzle pimpin boom shackalack amizzle mah nizzle.
              </p>
              <p>Dollar and rates</p>
              <p>
                Dollar figures that are positive{' '}
                <strong className="has-text-success"> +4.43%</strong>
              </p>
              <p>
                Dollar figures that are negative{' '}
                <strong className="has-text-danger"> -4.43%</strong>
              </p>
            </div>
            <div className="column is-3">
              {/* List */}
              <h4>List</h4>
              <ul>
                <li>
                  <p>item 1</p>
                </li>
                <li>
                  <p>item 2</p>
                </li>
                <li>
                  <p>item 3</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* END OF TYPOGRAPHY */}

        {/* BUTTONS */}
        <div className="content">
          <h2>Buttons</h2>
          <div className="columns box" style={{ backgroundColor: 'white' }}>
            {/* PRIMARY BUTTON */}
            <div className="column">
              <h4>Primary Button</h4>
              <div className="columns">
                <div className="column">
                  <button className="button is-primary is-hovered">
                    Primary Button
                  </button>
                </div>
                <div className="column">
                  <button className="button is-primary is-hovered">
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>

              <div className="columns">
                <div className="column">
                  <button className="button is-primary" disabled>
                    Disabled
                  </button>
                </div>
                <div className="column">
                  <button className="button is-primary" disabled>
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>

              <button className="button is-primary is-hovered">Export</button>
            </div>

            {/* SECONDARY BUTTON */}
            <div className="column">
              <h4>Secondary Button</h4>
              <div className="columns">
                <div className="column">
                  <button className="button is-primary is-outlined">
                    Secondary Button
                  </button>
                </div>
                <div className="column">
                  <button className="button is-primary is-outlined">
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>

              <div className="columns">
                <div className="column">
                  <button className="button is-primary is-outlined" disabled>
                    Disabled
                  </button>
                </div>
                <div className="column">
                  <button className="button is-primary is-outlined" disabled>
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>

              <button className="button is-primary is-outlined">Cancel</button>
            </div>
          </div>
        </div>

        {/* END OF BUTTONS */}

        {/* FORM */}
        <div className="content">
          <h2>Form</h2>
          <div className="columns box" style={{ backgroundColor: 'white' }}>
            <div className="column">
              {/* Form Fields */}
              <h4>Form Fields</h4>
              Default
              <input
                className="input"
                type="text"
                value="Default Copy"
                placeholder="Text input"
              />
              Error
              <input
                className="input is-danger"
                type="text"
                value="Error State"
                placeholder="Text input"
              />
              Warning
              <input
                className="input is-warning"
                type="text"
                value="Warning State"
                placeholder="Text input"
              />
              Info
              <input
                className="input is-info"
                type="text"
                value="Information State"
                placeholder="Text input"
              />
              Dropdown
              <Select
                className="dropDownSelect"
                placeholder="Default Selected Item"
                options={items}
                styles={colourStyles}
              />
            </div>
            <div className="column box">
              <h4>Date and Time Picker</h4>
              {/* Date Picker */}
              <span className="is-block">Date Range From</span>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />

              <h4 style={{ marginTop: '10px' }}>Checkbox</h4>
              {/* Checkbox */}
              <div className="field">
                <input
                  className="is-checkradio"
                  id="exampleCheckbox"
                  type="checkbox"
                  name="exampleCheckbox"
                />
                <label htmlFor="exampleCheckbox">Default</label>
                <input
                  className="is-checkradio"
                  id="exampleCheckbox2"
                  type="checkbox"
                  name="exampleCheckbox"
                  disabled
                />
                <label htmlFor="exampleCheckbox2">Disabled</label>
              </div>

              <h4>Radio Button</h4>
              {/* Radio Button */}
              <div className="field">
                <input
                  className="is-checkradio"
                  id="exampleRadioInline1"
                  type="radio"
                  name="exampleRadioInline"
                  checked="checked"
                />
                <label htmlFor="exampleRadioInline1">Selected</label>
                <input
                  className="is-checkradio"
                  id="exampleRadioInline2"
                  type="radio"
                  name="exampleRadioInline"
                />
                <label htmlFor="exampleRadioInline2">Default</label>
                <input
                  className="is-checkradio"
                  id="exampleRadioInline3"
                  type="radio"
                  name="exampleRadioInline"
                  disabled
                />
                <label htmlFor="exampleRadioInline3">Disabled</label>
              </div>

              <h4>Switches</h4>
              {/* Switches */}
              <div className="field">
                <input
                  id="switchRoundedDefault"
                  type="checkbox"
                  name="switchRoundedDefault"
                  className="switch is-rounded"
                />
                <label htmlFor="switchRoundedDefault">
                  Switch rounded default
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* END OF FORM */}

        {/* TABLE */}
        <div className="content">
          <h2>Table</h2>
          <div className="columns">
            <div className="column">
              <table className="table is-hoverable">
                <thead>
                  <tr>
                    <th className="has-text-white">
                      <p>DATE</p>
                    </th>
                    <th className="has-text-white">
                      <p>DETAILS</p>
                    </th>
                    <th className="has-text-white">
                      <p>CRYPTO</p>
                    </th>
                    <th className="has-text-white">
                      <p>CRYPTO BALANCE</p>
                    </th>
                    <th className="has-text-white">
                      <p>USD</p>
                    </th>
                    <th className="has-text-white">
                      <p>USD BAL</p>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th>1</th>
                    <td>Leicester City</td>
                    <td>38</td>
                    <td>23</td>
                    <td>12</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>Arsenal</td>
                    <td>38</td>
                    <td>20</td>
                    <td>11</td>
                    <td>7</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Tottenham Hotspur</td>
                    <td>38</td>
                    <td>19</td>
                    <td>13</td>
                    <td>6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* END OF TABLE */}

        {/* PAGINATION AND SORTING */}
        <div className="content">
          <h2>Pagination and sorting</h2>
          <div className="box">
            <div className="columns">
              <div className="column is-3">
                <p>Showing 1 - 20 of 20 transactions</p>
              </div>
              <div className="column is-9">
                <nav
                  className="pagination is-right toolkit"
                  aria-label="pagination"
                >
                  <ul className="pagination-list">
                    <li>
                      <button
                        className="pagination-link"
                        aria-label="Go to first page"
                      >
                        <i className="fas fa-fast-backward" />
                      </button>
                    </li>
                    <li>
                      <button
                        className="pagination-link"
                        aria-label="Go previous page"
                      >
                        <i className="fas fa-caret-left fa-lg" />
                      </button>
                    </li>
                    <li>
                      <a className="pagination-link" aria-label="Goto page 1">
                        1
                      </a>
                    </li>
                    <li>
                      <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                      <a className="pagination-link" aria-label="Goto page 45">
                        45
                      </a>
                    </li>
                    <li>
                      <a
                        className="pagination-link is-current"
                        aria-label="Page 46"
                        aria-current="page"
                      >
                        46
                      </a>
                    </li>
                    <li>
                      <a className="pagination-link" aria-label="Goto page 47">
                        47
                      </a>
                    </li>
                    <li>
                      <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                      <a className="pagination-link" aria-label="Goto page 86">
                        86
                      </a>
                    </li>

                    <li>
                      <button
                        className="pagination-link"
                        aria-label="Goto next page"
                      >
                        <i className="fas fa-caret-right fa-lg" />
                      </button>
                    </li>
                    <li>
                      <button
                        className="pagination-link"
                        aria-label="Goto last page"
                      >
                        <i className="fas fa-fast-forward" />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                Sort:
                <Select
                  className="dropDownSelect dropdownAlternative"
                  placeholder="Default Selected Item"
                  options={items}
                />
              </div>
            </div>
          </div>
        </div>
        {/* END OF PAGINATION AND SORTING */}
      </div>
    );
  }
}

KitchenSink.propTypes = {};

export default KitchenSink;
