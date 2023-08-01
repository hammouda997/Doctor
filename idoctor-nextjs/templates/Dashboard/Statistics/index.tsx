import Icon from "@/components/Icon";

type StatisticsProps = {
  stats: {
    nbrOfVisitsToday: number;
    nbrOfVisitsWeek: number;
    nbrOfVisitsMonth: number;
  };
};

const Statistics = ({stats}: StatisticsProps) => (
  <div className="flex -mx-2.5 mb-5 md:block md:mx-0">
    <div
      className="w-[calc(50%-1.25rem)] mx-2.5 px-5 py-4.5 card md:w-full md:mx-0 md:mb-4 md:last:mb-0"
      key={"nbrOfVisitsToday"}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="text-sm font-bold">{"Rendez-vous - Aujourd'hui"}</div>
        <Icon className="icon-18 dark:fill-white" name={"calendar"} />
      </div>
      <div className="mb-3.5 text-h5">{stats.nbrOfVisitsToday}</div>
    </div>
    <div
      className="w-[calc(50%-1.25rem)] mx-2.5 px-5 py-4.5 card md:w-full md:mx-0 md:mb-4 md:last:mb-0"
      key={"nbrOfVisitsWeek"}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="text-sm font-bold">{"Rendez-vous - Semaine"}</div>
        <Icon className="icon-18 dark:fill-white" name={"calendar"} />
      </div>
      <div className="mb-3.5 text-h5">{stats.nbrOfVisitsWeek}</div>
    </div>
    <div
      className="w-[calc(50%-1.25rem)] mx-2.5 px-5 py-4.5 card md:w-full md:mx-0 md:mb-4 md:last:mb-0"
      key={"nbrOfVisitsMonth"}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="text-sm font-bold">{"Rendez-vous - Mois"}</div>
        <Icon className="icon-18 dark:fill-white" name={"calendar"} />
      </div>
      <div className="mb-3.5 text-h5">{stats.nbrOfVisitsMonth}</div>
    </div>
  </div>
);

export default Statistics;
