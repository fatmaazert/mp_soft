import React, { useEffect, useState } from "react";
import MainTitle from "../components/formComponents/MainTitle";
import IconInput from "../components/formComponents/IconInput";
import { GrContactInfo } from "react-icons/gr";
import Button from "../components/formComponents/Button";
import { toast } from "react-toastify";
import { get, post, remove, update } from "../utils/apiMethods";
import { typeRegle } from "../utils/listType";
import { FaEye } from "react-icons/fa";
import RegleTable from "../components/regleComponent/RegleTable";
import UsersModal from "../components/Modals/UsersModal";
import { FaUserTie } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { FcConferenceCall } from "react-icons/fc";
import SearchableDropdown from "../components/SearchComp";
import { FcRules } from "react-icons/fc";
function ReglePage() {
  const [RUBINILIST, setRubiniList] = useState([]);
  const [CODEOPLIST, setCodeList] = useState([]);

  const [selectedRegle, setSelectedRegle] = useLocalStorage(
    "selectedRegle",
    null
  );

  useEffect(() => {
    async function getCodeOps() {
      const res = await get("/Regle/codope");
      if (!res) return;
      setCodeList(res);
    }
    getCodeOps();
  }, []);

  const { user } = useAuth();
  const [formData, setFormData] = useState({
    codope: "",
    lp: "",
    DSC: "",
    ord: "",
    rubini: "",
    rubdst: "",
    src: "",
    opr: "",
    cmsr: "",
  });
  const [libope, setLibOpe] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [usersModalOpen, setUsersModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmitSelectedUsers = (selectedUserId) => {
    setSelectedUser(selectedUserId);
  };

  const CMSRIOptions = [
    {
      text: "tous les modes",
      value: "*",
    },
    {
      text: "mode création",
      value: "C",
    },
    {
      text: "mode modification",
      value: "M",
    },
    {
      text: "mode suppression",
      value: "S",
    },
    {
      text: "mode réactivation",
      value: "R",
    },
    {
      text: "mode affichage",
      value: "A",
    },
  ];

  useEffect(() => {
    if (selectedRegle) {
      // lowercase everything

      setFormData(selectedRegle);
    }
  }, [selectedRegle]);

  useEffect(() => {
    handleSearch();
  }, [formData.codope]);

  const handleSearch = async () => {
    if (!formData.codope && !selectedRegle.codope) return;
    try {
      const result = await get(`Regle/tope/${formData.codope}`);
      if (result) {
        setLibOpe(result[0]?.LIBOPE);
      }

      const resultRubini = await get(`Table/${formData.codope}`);
      if (resultRubini) {
        setRubiniList(resultRubini);
      }
    } catch (error) {
      console.log(error);
      toast.error("erreur :", error);
    }
  };

  const handleType = (e) => {
    const { name, value } = e.target;
    if (name !== "lp") return;
    const index = typeRegle.findIndex((element) => {
      return element.name === value;
    });
    setFormData({
      ...formData,
      [name]: value,
      DSC: typeRegle[index].description,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleOpenPopup = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenUsersModal = () => {
    setUsersModalOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if its an EDIT
    if (selectedRegle?.mode == "EDIT") {
      const res = await update(
        `Regle/modifyRegle/${selectedRegle?.id}/${user?.id}/${selectedUser?.id}`,
        {
          ...formData,
        }
      );
      if (!res) {
        toast.error("erreur regle");
        return;
      }
      setSelectedRegle(null);
      toast.success("Regle updated successfully");
      setTimeout(() => navigate("/profile/gestiondesregles"), 1000);
    } else if (selectedRegle?.mode == "DELETE") {
      try {
        await remove(
          `Regle/remove-regle/${selectedRegle?.id}/${user?.id}/${selectedUser?.id}`
        );
        setSelectedRegle(null);

        setTimeout(() => navigate("/profile/gestiondesregles"), 1000);
      } catch (e) {
        return;
      }
    } else {
      // verify all the fields should be filled in

      if (
        formData.codope == "" ||
        formData.lp == "" ||
        formData.DSC == "" ||
        formData.ord == "" ||
        formData.rubini == "" ||
        formData.rubdst == "" ||
        formData.src == "" ||
        formData?.cmsr == ""
      ) {
        toast.error("Veuillez remplir tous les champs");
        return;
      }
      // if there is no selected user error message
      if (!selectedUser) {
        toast.error("Veuillez sélectionner un responsable");
        return;
      }
      console.log({ formData });
      const res = await post(
        `Regle/${user?.id}/${selectedUser?.id}/Add-regle`,
        formData
      );
      toast.success("Regle Added successfully");
      navigate("/profile/gestiondesregles");
      console.log({ res });
    }
  };

  const handelCodepeChange = (val) => {
    setFormData({ ...formData, codope: val });
    handleSearch();
  };

  return (
    <>
      <div className="py-10 bg-gradient-to-r from-teal-800 to-neutral-400">
        <h1 className="text-3xl mt-4 flex gap-x-1 justify-center items-center bg-gray-300 max-w-7xl mx-auto">
          <FcRules size={38} />{" "}
          {selectedRegle?.mode == "EDIT"
            ? "Demande de modification de regle"
            : selectedRegle?.mode == "DELETE"
            ? "Demande de suppression de regle"
            : "Demande d'ajout d'une regle"}
        </h1>
        <form onSubmit={handleSubmit} className="max-w-7xl mt-20 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:justify-items-center ">
            <div>
              <div className="flex">
                <div className="pl-2">
                  <SearchableDropdown
                    name="codeope"
                    id="codope"
                    options={CODEOPLIST}
                    className="w-[450px] py-2 px-4 mb-2 bg-lightGrey  focus:outline-none rounded-lg	"
                    selectedVal={formData?.codope}
                    handleChange={(val) => handelCodepeChange(val)}
                  />
                </div>
                <div className="w-full">
                  <Button
                    type="button"
                    onClick={handleSearch}
                    className="bg-primary text-white ml-2"
                  >
                    Rechercher
                  </Button>
                </div>
              </div>
              <div className="w-full pl-2">
                <IconInput
                  className="w-[450px]"
                  id="libope"
                  type="text"
                  name="libope"
                  value={libope}
                  disabled
                  icon={<GrContactInfo />}
                  placeholder="lib Ope"
                />
              </div>
              <div className="w-full pl-2">
                <select
                  name="lp"
                  value={formData?.lp?.toUpperCase()}
                  onChange={handleType}
                  className="w-[450px] py-2 px-4 mb-2 bg-lightGrey rounded-lg focus:outline-none"
                >
                  <option key={0} value={""}>
                    choisir le type de regle
                  </option>
                  {typeRegle?.map((type, index) => (
                    <option key={index} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full pl-2">
                <IconInput
                  className="w-[450px]"
                  id="DSC"
                  type="text"
                  name="DSC"
                  value={formData.DSC}
                  onChange={handleInputChange}
                  placeholder="description"
                  disabled={true}
                  icon={<GrContactInfo />}
                />
              </div>
              <div className="flex justify-center">
                <div
                  onClick={(e) => handleOpenPopup()}
                  className="cursor-pointer flex flex-col items-center justify-center gap-1 bg-teal-900 w-52 h-36 rounded-md mt-3"
                >
                  <div>
                    <FaEye size="60px" />
                  </div>
                  <h2 className="text-gray-50 text-4xl">Consulter </h2>
                </div>
              </div>
            </div>

            <div>
              <div className="w-full pl-2">
                <IconInput
                  className="w-[450px]"
                  id="ord"
                  type="number"
                  name="ord"
                  value={formData.ord}
                  onChange={handleInputChange}
                  icon={<GrContactInfo />}
                  placeholder="ord"
                />
              </div>

              <div className="w-full pl-2">
                <select
                  name="rubini"
                  value={formData.rubini}
                  onChange={handleInputChange}
                  className="w-[450px] py-2 px-4 mb-2 bg-lightGrey rounded-lg focus:outline-none"
                >
                  <option key={0} value={""}>
                    choisir Rubini
                  </option>
                  {RUBINILIST?.length > 0 &&
                    RUBINILIST?.map((rub, index) => (
                      <option key={index} value={rub}>
                        {rub}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex">
                <div className="pl-2">
                  <IconInput
                    className="w-[450px]"
                    id="rubdst"
                    type="text"
                    name="rubdst"
                    value={formData.rubdst}
                    onChange={handleInputChange}
                    icon={<GrContactInfo />}
                    placeholder="RUBDST"
                  />
                </div>
              </div>
              <div className="w-full pl-2">
                <select
                  name="opr"
                  value={formData.opr}
                  onChange={handleInputChange}
                  className="w-[450px] py-2 px-4 mb-2 bg-lightGrey rounded-lg focus:outline-none"
                >
                  <option key={0} value={""}>
                    choisir l OPR
                  </option>
                  <option key={1} value={"="}>
                    = : égal
                  </option>
                  <option key={1} value={"=="}>
                    == : égal strictement
                  </option>
                  <option key={2} value={"!="}>
                    != : différent
                  </option>
                  <option key={3} value={"<="}>
                    &#8804; : inférieur ou égal
                  </option>
                  <option key={4} value={">="}>
                    &#8805; : supérieur ou égal
                  </option>
                  <option key={5} value={">"}>
                    &gt; : strictement supérieur
                  </option>
                  <option key={6} value={"<"}>
                    &lt; : strictement inférieur
                  </option>
                </select>
              </div>

              <div className="flex">
                <div className="pl-2">
                  <IconInput
                    className="w-[450px]"
                    id="src"
                    type="text"
                    name="src"
                    value={formData.src}
                    onChange={handleInputChange}
                    icon={<GrContactInfo />}
                    placeholder="SRC"
                  />
                </div>
              </div>

              <div className="flex">
                <div className="pl-2">
                  <textarea
                    className="w-[450px] h-44 min-h-24 p-2"
                    id="msgerr"
                    type="text"
                    name="msgerr"
                    value={formData.msgerr}
                    onChange={handleInputChange}
                    icon={<GrContactInfo />}
                    placeholder="MSGERR"
                  />
                </div>
              </div>
              <div className="w-full pl-2">
                <select
                  name="cmsr"
                  value={formData.cmsr}
                  onChange={handleInputChange}
                  className="w-[450px] py-2 px-4 mb-2 bg-lightGrey rounded-lg focus:outline-none"
                >
                  {CMSRIOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {`${option.value} : ${option.text}`}
                    </option>
                  ))}
                </select>
              </div>

              {selectedUser && (
                <div className="flex">
                  <div className="pl-2">
                    <IconInput
                      className="w-[450px]"
                      type="text"
                      value={`Responsable choisi: ${selectedUser?.username}`}
                      disabled
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4">
                {user.roles[0] === "ROLE_GESTIONNAIRE" && (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleOpenUsersModal()}
                  >
                    <FaUserTie size="60px" />
                  </div>
                )}

                <button className="bg-sky-600 hover:bg-sky-400 text-white font-bold py-2 px-4 border-b-4 border-sky-700 hover:border-sky-500 rounded">
                  {selectedRegle?.mode == "EDIT"
                    ? "Modifier"
                    : selectedRegle?.mode == "DELETE"
                    ? "Supprimer"
                    : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <RegleTable
        codope={formData.codope}
        lp={formData.lp}
        isOpen={isOpen}
        onClose={handleOpenPopup}
      />

      <UsersModal
        isOpen={usersModalOpen}
        onClose={handleOpenUsersModal}
        submit={handleSubmitSelectedUsers}
      />
    </>
  );
}

export default ReglePage;
