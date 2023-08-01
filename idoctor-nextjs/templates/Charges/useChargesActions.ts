import {api} from "@/api";
import {errorHandler} from "@/hooks/errorHandler";
import {showToast} from "@/hooks/ShowToast";
import {IMedicalCareListType} from "@/types/IMedicalCare";
import {IPatient, IPatientVisit} from "@/types/IPatient";
import {SelectValues} from "@/types/utils";
import {useState, useEffect, useCallback} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

export const useChargesActions = (chargesId?: string) => {
  const [patient, setPatient] = useState<IPatient | undefined>();
  const [team, setTeam] = useState<{
    doctors: {label: string; value: string}[];
    physiotherapists: {label: string; value: string}[];
  }>({doctors: [], physiotherapists: []});
  const [charge, setCharge] = useState<IMedicalCareListType | undefined>(
    undefined
  );
  const formMethods = useForm<IMedicalCareListType>({
    defaultValues: {
      otherCosts: 0,
      pricePerVisit: 0,
    },
  });
  const getChargeById = useCallback(
    async (chargesId?: string) => {
      try {
        const getCharges =
          chargesId && chargesId !== "new" && api.get(`/charges/${chargesId}`);
        const [charge, team] = await Promise.all([
          getCharges,
          api.get(`/user/team`),
        ]);
        if (charge) {
          setCharge(charge.data);
          formMethods.reset(charge.data);
          setPatient(charge.data.patient);
        }

        setTeam(team.data);
      } catch (error) {
        errorHandler(error);
      }
    },
    [formMethods]
  );
  useEffect(() => {
    getChargeById(chargesId);
  }, [getChargeById, chargesId]);

  const [addPatientVisible, setAddPatientVisible] = useState<boolean>(false);

  const onUpdatePatient: SubmitHandler<IPatient> = async (data) => {
    try {
      if (data.gender && typeof data.gender !== "string") {
        data.gender = (data.gender as SelectValues).value;
      }
      if (
        data.socialAssuranceType &&
        typeof data.socialAssuranceType !== "string"
      )
        data.socialAssuranceType = (
          data.socialAssuranceType as SelectValues
        ).value;
      const response = await api.patch("/patient", data);
      setPatient(response.data);
      setAddPatientVisible(false);
      showToast("Le patient a été modifié avec succès", "success");
    } catch (error) {
      errorHandler(error);
    }
  };

  const onPatientChange = (value: string) => {
    return api
      .get(`/patient/byid/${value}`)
      .then((response) => {
        setPatient(response.data);
        formMethods.setValue("patient", response.data?._id);
      })
      .catch(errorHandler);
  };
  const [addVisitVisible, setAddVisitVisible] = useState<boolean>(false);
  const onAddVisit: SubmitHandler<IPatientVisit> = async (data) => {
    try {
      const response = await api.post("/visits", data);
      // @ts-ignore
      setCharge({...charge, visits: [...charge?.visits, response.data]});
      setAddVisitVisible(false);
      showToast("La visite a été ajoutée avec succès", "success");
    } catch (error) {
      errorHandler(error);
    }
  };
  const onConfirm: SubmitHandler<IMedicalCareListType> = async (data) => {
    try {
      if (!data.patient) Object.assign(data, {patient: patient?._id});
      const response = await api.post("/charges", data);
      setCharge({...charge, ...response.data});
      setAddVisitVisible(false);
      showToast(
        data._id
          ? "PEC a été modifier avec succès"
          : "PEC a été ajoutée avec succès",
        "success"
      );
    } catch (error) {
      errorHandler(error);
    }
  };

  const onRemoveVisit = async (visitId: string) => {
    try {
      await api.delete(`/visits/${visitId}`);
      setCharge({
        ...charge,
        // @ts-ignore
        visits: charge?.visits.filter((visit) => visit._id !== visitId),
      });

      showToast("La visite a été supprimée avec succès", "success");
    } catch (error) {
      errorHandler(error);
    }
  };

  return {
    onConfirm,
    addVisitVisible,
    setAddVisitVisible,
    onAddVisit,
    charge,
    onUpdatePatient,
    patient,
    onPatientChange,
    addPatientVisible,
    setAddPatientVisible,
    onRemoveVisit,
    formMethods,
    team,
  };
};
