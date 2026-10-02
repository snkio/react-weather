export function toDate(e) {
  let getDate;
  const iso = e;

  if (iso) {
    getDate = new Date(iso);
  } else {
    getDate = new Date();
  }

  let day = getDate.toLocaleString(undefined, {
    weekday: "short",
  });
  const dateText = getDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  let timeText = getDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (getDate.toDateString() === new Date().toDateString()) {
    day = "Today";
  }

  const getTimeHour = getDate.getHours();
  const result = timeText.startsWith("0") ? timeText.slice(1) : timeText;

  return {
    day: day,
    text: dateText,
    hour: result,
    time: getTimeHour,
  };
}
