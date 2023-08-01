import {api} from "@/api";
import {errorHandler} from "@/hooks/errorHandler";
import {useState, useEffect} from "react";
import {IHomeData} from "@/types/IHomeData";
export const useHome = () => {
  const [filter, setFilter] = useState({
    keyword: "",
    startDate: null,
    endDate: null,
    page: 1,
  });

  const [stats, setStats] = useState<IHomeData>({
    visits: [],
    latestPatients: [],
    nbrOfVisitsWeek: 0,
    nbrOfVisitsToday: 0,
    nbrOfVisitsMonth: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const {data} = await api.get<IHomeData>("/stats");
        setStats(data);
      } catch (error) {
        errorHandler(error);
      }
    };
    fetchStats();
  }, [filter]);

  return {
    stats,
    filter,
    setFilter,
  };
};
