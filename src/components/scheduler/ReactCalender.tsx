import React, { FC, useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import addHours from "date-fns/addHours";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import parse from "date-fns/parse";
import startOfHour from "date-fns/startOfHour";
import startOfWeek from "date-fns/startOfWeek";
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const ReactCalender: FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      title: "Learn cool stuff",
      start,
      end,
    },
  ]);

  const onEventResize: withDragAndDropProps["onEventResize"] = (data: { start: any; end: any }) => {
    const { start, end } = data;

    setEvents((currentEvents) => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, firstEvent];
    });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    console.log(data);
  };

  return (
    <DnDCalendar
      defaultView="week"
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: "100vh" }}
    />
  );
};

const locales = {
  "en-US": enUS,
};
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);
// import React from "react";

// export const ReactCalender = () => {
//   return <div>ReactCalender</div>;
// };
