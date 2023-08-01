import Layout from "@/components/Layout";
import Profile from "../../../templates/Charges/Profile";
import Icon from "@/components/Icon";

import Field from "@/components/Field";
import {useChargesActions} from "../../../templates/Charges/useChargesActions";
import AddPatientModal from "@/components/Modal/AddPatientModal";
import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import FormSelect from "@/components/Select/FormSelect";
import {FormProvider} from "react-hook-form";
import FormCheckBox from "@/components/Form/ControlledCheckBox";
import {NextPage} from "next";
import Select, {ISelectorOption} from "@/components/Select";
import AsyncSelect from "react-select/async";
import {api} from "@/api";
import {errorHandler} from "@/hooks/errorHandler";
import AddVisitModal from "@/components/Modal/AddVisitModal";
import {useRouter} from "next/router";
import {format} from "date-fns";
import ChargesTable from "@/components/ChargesTable";

export const getPatientsList = async (query: string) => {
  try {
    const {data} = await api.get<ISelectorOption<string>[]>(
      "/patient/optionlist?keyword=" + query || ""
    );

    return data;
  } catch (error) {
    errorHandler(error);
  }
};
const ChargeDetailsPage: NextPage = () => {
  const router = useRouter();
  const {
    addPatientVisible,
    onUpdatePatient,
    formMethods,
    patient,
    setAddPatientVisible,
    team,
    onPatientChange,
    addVisitVisible,
    setAddVisitVisible,
    onAddVisit,
    charge,
    onConfirm,
    onRemoveVisit,
  } = useChargesActions(router.query.id as string);

  const promiseOptions = (inputValue: string) =>
    new Promise<ISelectorOption<string>[]>((resolve) => {
      setTimeout(() => {
        // @ts-ignore
        resolve(getPatientsList(inputValue));
      }, 1000);
    });
  return (
    <Layout title="Prise en charge" back>
      <FormProvider {...formMethods}>
        <div className="flex pt-4 lg:block md:pt-0">
          <div className="shrink-0 w-[20rem] 4xl:w-[14.7rem] lg:w-full lg:mb-10 md:mb-8">
            {patient ? (
              <Profile
                patient={patient}
                onUpdate={() => setAddPatientVisible(true)}
              />
            ) : (
              <AsyncSelect
                cacheOptions
                placeholder="Rechercher un patient"
                defaultOptions
                loadOptions={promiseOptions}
                onChange={(item) => item?.value && onPatientChange(item?.value)}
              />
            )}
          </div>
          <div className="w-[calc(100%-20rem)] pl-[6.625rem] 4xl:w-[calc(100%-14.7rem)] 2xl:pl-16 xl:pl-10 lg:w-full lg:pl-0">
            <div className="card">
              <div className="card-title">Paramétre prise en charge</div>
              <div className="p-5">
                <div className="flex flex-wrap justify-between mx-3 mb-6">
                  <div className="flex mb-4 space-x-5 md:block md:space-x-0 md:space-y-4">
                    <Field
                      name="pricePerVisit"
                      className="w-20 mr-5"
                      label="Frais séance"
                      type="number"
                    />
                    <Field
                      name="otherCosts"
                      className="w-20"
                      label="Autres frais"
                      type="number"
                    />
                  </div>
                  <div className="flex mb-4 space-x-5 md:block md:space-x-0 md:space-y-4">
                    <FormSelect
                      label="Médecin"
                      items={team.doctors}
                      name="doctor"
                      isSearchable
                    />
                  </div>
                  <div className="flex mb-4 space-x-5 md:block md:space-x-0 md:space-y-4">
                    <FormSelect
                      label="Kinésithérapeute"
                      items={team.physiotherapists}
                      name="kine"
                      isSearchable
                    />
                  </div>
                </div>
                <div className="flex justify-between md:block md:mt-8">
                  <button
                    onClick={formMethods.handleSubmit(onConfirm)}
                    className="btn-purple min-w-[11.7rem] md:w-full"
                  >
                    {!charge?._id ? "Ajouter" : "Modifier"}
                  </button>
                </div>
              </div>
            </div>
            {charge && (
              <div className="mb-4 card">
                <div className="card-title">
                  Liste des séances
                  <button
                    onClick={() => setAddVisitVisible(true)}
                    className="btn-stroke btn-small shrink-0 min-w-[6rem] ml-4 md:hidden"
                  >
                    <Icon name="plus" />
                    <span>{"Ajouter séance "}</span>
                  </button>
                </div>

                <ChargesTable onRemove={onRemoveVisit} visits={charge.visits} />
              </div>
            )}
          </div>
        </div>
      </FormProvider>

      {patient && charge && (
        <AddVisitModal
          defaultValues={{patient, medicalCareId: charge._id}}
          onSubmit={onAddVisit}
          setVisible={setAddVisitVisible}
          visible={addVisitVisible}
        />
      )}
      <AddPatientModal
        defaultValues={patient}
        setVisible={setAddPatientVisible}
        visible={addPatientVisible}
        onSubmit={onUpdatePatient}
      />
    </Layout>
  );
};

export default AuthenticatedRoute(ChargeDetailsPage);
