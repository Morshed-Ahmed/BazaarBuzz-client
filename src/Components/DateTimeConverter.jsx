const DateTimeConverter = ({ dateTimeString }) => {
  const formatDateAndTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    const formattedDate = dateTime.toLocaleDateString(undefined, dateOptions);
    const formattedTime = dateTime.toLocaleTimeString(undefined, timeOptions);

    return `${formattedDate} ${formattedTime}`;
  };

  return <div>{formatDateAndTime(dateTimeString)}</div>;
};

export default DateTimeConverter;
