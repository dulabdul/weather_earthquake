import React from 'react';
import PropTypes from 'prop-types';
export default function FormatterDate({ dateFormat, isWithHour }) {
  if (isWithHour) {
    const dateFormatterWIBWtihHour = (dateFormat) => {
      const year = dateFormat.slice(0, 4);
      const month = dateFormat.slice(4, 6) - 1;
      const day = dateFormat.slice(6, 8);
      const hour = dateFormat.slice(8, 10);
      const minute = dateFormat.slice(10, 12);

      const date = new Date(Date.UTC(year, month, day, hour, minute));

      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
      };
      return date.toLocaleString('id-ID', options);
    };
    return <span>{dateFormatterWIBWtihHour(dateFormat)}</span>;
  }
  const dateFormatterWIBWtihoutHour = (dateFormat) => {
    const year = dateFormat.slice(0, 4);
    const month = dateFormat.slice(4, 6) - 1;
    const day = dateFormat.slice(6, 8);

    const date = new Date(Date.UTC(year, month, day));

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Jakarta',
    };
    return date.toLocaleString('id-ID', options);
  };
  return <span>{dateFormatterWIBWtihoutHour(dateFormat)}</span>;
}

FormatterDate.propTypes = {
  dateFormat: PropTypes.string,
  isWithHour: PropTypes.bool,
};
