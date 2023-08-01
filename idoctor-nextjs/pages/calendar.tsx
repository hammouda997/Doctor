import {useCallback, useEffect, useMemo, useState} from "react";
import Layout from "@/components/Layout";

import {Calendar, dateFnsLocalizer, Views} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import fr from "date-fns/locale/fr";

import "react-big-calendar/lib/css/react-big-calendar.css";
import {api} from "@/api";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: fr,
});

const CalendarPage = () => {
  const today = new Date();

  const {defaultDate, scrollToTime} = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(),
    }),
    []
  );

  const dayStart = today.getDay();
  const dayEnd = today.getDay();
  const [sessions, setSessions] =
    useState<{start: Date; end: Date; title: string; id: string}[]>();
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get<
          {start: string; end: string; title: string; id: string}[]
        >("/visits");
        setSessions(
          res.data.map((session) => ({
            ...session,
            start: new Date(session.start),
            end: new Date(session.end),
          }))
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchSessions();
  }, []);

  return (
    <Layout title="Calendar">
      <Calendar
        events={sessions}
        className="relative flex mb-6 lg:flex-wrap md:mb-5"
        defaultDate={defaultDate}
        min={
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            Number(dayStart)
          )
        }
        max={
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            Number(dayEnd) + 12
          )
        }
        localizer={localizer}
        defaultView={Views.MONTH}
        scrollToTime={scrollToTime}
        popup={true}
        style={{height: "100%"}}
        timeslots={1}
        culture="fr"
        messages={{
          today: "Aujourd'hui",
          previous: "précédente",
          next: "suivante",
          month: "Mois",
          tomorrow: "Demain",
          allDay: "Toute la journée",
          work_week: "Semaine de travail",
          yesterday: "Hier",
          week: "Semaine",
          day: "Jour",
          agenda: "Agenda",
          date: "Date",
          time: "Heure",
          event: "Événement",
          noEventsInRange: "Aucun événement dans cette plage",
          showMore: (total) => `+ ${total} événement(s) supplémentaire(s)`,
        }}
      />
    </Layout>
  );
};

export default CalendarPage;
