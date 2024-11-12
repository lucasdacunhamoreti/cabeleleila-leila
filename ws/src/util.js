const moment = require("moment");

module.exports = {
  SLOT_DURATION: 30,
  hourToMinutes: (hourMinute) => {
    const [hour, minutes] = hourMinute.split(":");
    return parseInt(parseInt(hour) * 60 + parseInt(minutes));
  },
  sliceMinutes: (start, end, duration) => {
    const slices = [];
    let count = 0;

    start = moment(start);
    end = moment(end);

    while (end > start) {
      slices.push(start.format("HH:mm"));

      start = start.add(duration, "minutes");
      count++;
    }
    return slices;
  },
};
