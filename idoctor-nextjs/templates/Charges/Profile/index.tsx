import Icon from "@/components/Icon";
import {IPatient} from "@/types/IPatient";

type ProfileProps = {
  patient: IPatient;
  onUpdate: () => void;
};

const Profile = ({patient, onUpdate}: ProfileProps) => (
  <div className="lg:card">
    <div className="card-title hidden lg:flex">Contact details</div>

    <div className="lg:px-5 lg:py-6">
      <div className="text-h4">{patient.fullName}</div>

      <div className="mt-5 pt-5 border-t border-dashed border-n-1 lg:mt-0 lg:pt-0 lg:border-none dark:border-white">
        <div>
          <div className="mb-5 text-sm last:mb-0">
            <div className="mb-0.5">{"Date de naissance"}</div>
            <div className="font-bold">{patient.dob}</div>
          </div>
        </div>
        <div>
          <div className="mb-5 text-sm last:mb-0">
            <div className="mb-0.5">{"Genre"}</div>
            <div className="font-bold">{patient.gender}</div>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-dashed border-n-1 lg:mt-0 lg:pt-0 lg:border-none dark:border-white">
          <div>
            <div className="mb-5 text-sm last:mb-0">
              <div className="mb-0.5">{"Email"}</div>
              <div className="font-bold">{patient.email}</div>
            </div>
          </div>

          <div>
            <div className="mb-5 text-sm last:mb-0">
              <div className="mb-0.5">{"Téléphone"}</div>
              <div className="font-bold">{patient.phoneNumber}</div>
            </div>
          </div>
          <div>
            <div className="mb-5 text-sm last:mb-0">
              <div className="mb-0.5">{"Profession"}</div>
              <div className="font-bold">{patient.job}</div>
            </div>
          </div>
        </div>
        {patient.socialAssuranceType && (
          <div className="mt-5 pt-5 border-t border-dashed border-n-1 lg:mt-0 lg:pt-0 lg:border-none dark:border-white">
            <div>
              <div className="mb-0.5">{"Assurance social"}</div>
              <div className="mb-5 text-sm last:mb-0">
                <div className="mb-0.5">{"Type"}</div>
                <div className="font-bold">{patient.socialAssuranceType}</div>
              </div>
            </div>

            <div>
              <div className="mb-5 text-sm last:mb-0">
                <div className="mb-0.5">{"Numero"}</div>
                <div className="font-bold">{patient.assuranceNumber}</div>
              </div>
            </div>
            <div>
              <div className="mb-5 text-sm last:mb-0">
                <div className="mb-0.5">{"Clé"}</div>
                <div className="font-bold">{patient.assuranceKey}</div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-5 pt-5 border-t border-dashed border-n-1 lg:mt-0 lg:pt-0 lg:border-none dark:border-white">
          <div className="mb-5 text-sm last:mb-0">
            <div className="mb-0.5">{"Notes"}</div>
            <div className="font-bold">{patient.notes}</div>
          </div>
        </div>
        <div className="flex mt-5 pt-5 border-t border-dashed border-n-1 lg:mt-6 lg:pt-0 lg:border-none dark:border-white">
          <button
            onClick={onUpdate}
            className="btn-purple btn-medium grow dark:border-transparent"
          >
            <Icon name="add-circle" />
            <span>Modifier Patient</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
