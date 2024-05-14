import React, { useEffect, useState } from "react";
import MainTitle from "../components/formComponents/MainTitle";
import IconInput from "../components/formComponents/IconInput";
import { GrContactInfo } from "react-icons/gr";
import Button from "../components/formComponents/Button";
import { toast } from "react-toastify";
import { get, post } from "../utils/apiMethods";
import { typeRegle } from "../utils/listType";
import { FaEye } from "react-icons/fa";
import RegleTable from "../components/regleComponent/RegleTable";
import UsersModal from "../components/Modals/UsersModal";
import { FaUserTie } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";
import AllRegles from "../components/regleComponent/AllReglesComp";

function ReglePage() {
  const [RUBINILIST, setRubiniList] = useState([]);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    codope: "",
    lp: "",
    DSC: "",
    ord: "",
    RUBINI: "",
    RUBDST: "",
    SRC: "",
    CMSR: [],
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
    const getAllRunibi = async () => {
      const result = await get(`Table/${formData.codope}`);
      if (result) {
        setRubiniList(result);
      }
    };

    getAllRunibi();
  }, [formData.codope]);

  const handleSearch = async () => {
    if (!formData.codope) return;
    try {
      const result = await get(`Regle/tope/${formData.codope}`);
      if (result) {
        setLibOpe(result[0].LIBOPE);
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
      DSC: typeRegle[index].description, // mefemech description lel RUBINI
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOpenPopup = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenUsersModal = () => {
    setUsersModalOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await post(`Regle/${selectedUser}/Add-regle`, formData);
    console.log({ res });
  };
  return (
    <>
      <AllRegles />
      <div className="ml-20">
        <MainTitle opString="Ajout de regles" />
        <form onSubmit={handleSubmit} className="max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="flex">
                <div className="pl-2">
                  <IconInput
                    className="w-[335px]"
                    id="codope"
                    type="text"
                    name="codope"
                    value={formData.codope}
                    icon={<GrContactInfo />}
                    onChange={handleInputChange}
                    placeholder="code Ope"
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
                  onChange={handleInputChange}
                  icon={<GrContactInfo />}
                  placeholder="lib Ope"
                />
              </div>
              <div className="w-full pl-2">
                <select
                  name="lp"
                  value={formData.lp}
                  onChange={handleType}
                  className="w-[450px] py-2 px-4 mb-2 bg-lightGrey rounded-lg focus:outline-none"
                  required
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
              <div className="flex justify-center mr-14">
                <div
                  onClick={(e) => handleOpenPopup()}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <div>
                    <FaEye size="60px" />
                  </div>
                  <MainTitle opString={"Consulter"} />
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
                  name="RUBINI"
                  value={formData.RUBINI}
                  onChange={handleInputChange}
                  className="w-[450px] py-2 px-4 mb-2 bg-lightGrey rounded-lg focus:outline-none"
                >
                  <option key={0} value={""}>
                    choisir Rubini
                  </option>
                  {RUBINILIST.length > 0 &&
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
                    id="RUBDST"
                    type="text"
                    name="RUBDST"
                    value={formData.RUBDST}
                    onChange={handleInputChange}
                    icon={<GrContactInfo />}
                    placeholder="RUBDST"
                  />
                </div>
              </div>
              <div className="w-full pl-2">
                <select
                  name="OPR"
                  value={formData.OPR}
                  onChange={handleInputChange}
                  className="w-[450px] py-2 px-4 mb-2 bg-lightGrey rounded-lg focus:outline-none"
                  required
                >
                  <option key={0} value={""}>
                    choisir l OPR
                  </option>
                  <option key={1} value={"="}>
                    = : égal
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
              {/* <div className="flex">
                <div className="pl-2">
                  <IconInput
                    className="w-[450px]"
                    id="SRC"
                    disabled
                    type="text"
                    name="SRC"
                    value={formData.SRC}
                    icon={<GrContactInfo />}
                    placeholder="SRC"
                  />
                </div>
              </div> */}
              <div className="flex">
                <div className="pl-2">
                  <IconInput
                    className="w-[450px]"
                    id="SRC"
                    type="text"
                    name="SRC"
                    value={formData.SRC}
                    onChange={handleInputChange}
                    icon={<GrContactInfo />}
                    placeholder="SRC"
                  />
                </div>
              </div>
              <div className="w-full pl-2">
                <select
                  name="SRC"
                  value={formData.SRC}
                  onChange={handleInputChange}
                  className="w-[450px] py-2 px-4 mb-2 bg-lightGrey rounded-lg focus:outline-none"
                  required
                >
                  <option key={0} value={""}>
                    choisir l Type SRC
                  </option>
                  <option key={1} value={"cst "}>
                    cst : constante 
                  </option>
                  <option key={2} value={"var "}>
                    var : variable 
                  </option>
                  <option key={3} value={"sql "}>
                    sql : requête SQL 
                  </option>
                  <option key={4} value={"afp "}>
                    afp : état  (voir anex1)
                  </option>
                  <option key={5} value={"seq"}>
                    seq séquence 
                  </option>
                  <option key={6} value={"obl "}>
                    obl :
                  </option>
                </select>
              </div>

              <div className="flex">
                <div className="pl-2">
                  <IconInput
                    className="w-[450px]"
                    id="MSGERR"
                    type="text"
                    name="MSGERR"
                    value={formData.MSGERR}
                    onChange={handleInputChange}
                    icon={<GrContactInfo />}
                    placeholder="MSGERR"
                  />
                </div>
              </div>
              <div className="w-full pl-2">
                <select
                  name="CMSR"
                  value={formData.CMSR}
                  onChange={handleInputChange}
                  className="w-[450px] py-2 px-4 mb-2 bg-lightGrey rounded-lg focus:outline-none"
                  required
                >
                  {CMSRIOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {`${option.value} : ${option.text}`}
                    </option>
                  ))}
                </select>
              </div>

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
                  Ajouter
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
