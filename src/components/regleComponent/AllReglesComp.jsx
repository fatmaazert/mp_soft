import { useEffect, useState } from "react";
import { headerRule } from "../../utils/listType";
import { get } from "../../utils/apiMethods";
import { FcConferenceCall } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

function AllRegles() {
  const [allRules, setAllRules] = useState([]);
  const [selectedRegle, setSelectedRegle] = useLocalStorage(
    "selectedRegle",
    null
  );

  const hendleSelectedRegle = (regle) => {
    if (regle) {
      if (selectedRegle && regle.id == selectedRegle.id) {
        setSelectedRegle(null);
        return;
      }
      setSelectedRegle(regle);
      console.log({ selectedRegle });
    }
  };

  const navigate = useNavigate();
  const navigateTo = (path, mode = null) => {
    setSelectedRegle((prev) => ({ ...prev, mode }));

    setTimeout(() => {
      navigate(path);
    }, 1000);
  };

  useEffect(() => {
    const allRegles = async () => {
      const result = await get(`/Regle/retrieve-all-regle`);
      if (result) {
        setAllRules(result);
      }
    };
    allRegles();
  }, []);

  return (
    <>
      <h1 className="text-3xl mt-20 flex gap-x-1 justify-center items-center bg-gray-300 max-w-7xl mx-auto">
        <FcConferenceCall size={38} /> Gestion des regles
      </h1>

      <div className="flex items-center justify-end gap-5 mt-6 max-w-7xl mx-auto">
        <button
          onClick={() => navigateTo("/profile/ajoutregles")}
          className="p-2 rounded bg-blue-500 text-white w-36"
        >
          Ajouter Regle
        </button>
        {selectedRegle && (
          <>
            <button
              onClick={() => navigateTo("/profile/ajoutregles", "EDIT")}
              className="p-2 rounded bg-green-500 text-white w-36"
            >
              Modifier Regle
            </button>
            <button
              onClick={() => navigateTo("/profile/ajoutregles", "DELETE")}
              className="p-2 rounded bg-red-500 text-white w-36"
            >
              Supprimer Regle
            </button>
          </>
        )}
      </div>

      <div className="mx-auto mt-10 overflow-auto max-w-7xl max-h-[480px]">
        <table className="table-auto bg-white">
          <thead>
            <tr className="text-left">
              {headerRule?.map((title, index) => (
                <th
                  key={index}
                  className="bg-primary bg-100 sticky top-0 border-b border-gray-200 px-6 py-4 text-white text-600 font-bold tracking-wider uppercase text-xs"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          {allRules?.length > 0 ? (
            <>
              <tbody>
                {allRules.map((regle, index) => (
                  <tr key={index} className="bg-lightGrey border-b-2">
                    <td className="flex px-4 py-2 gap-2 items-center mt-3">
                      {" "}
                      <input
                        checked={selectedRegle && selectedRegle?.id == regle.id}
                        onChange={() => hendleSelectedRegle(regle)}
                        type="checkbox"
                        className="w-4 h-4"
                      />
                      <span>{regle.id}</span>
                    </td>
                    <td className=" px-4 py-2">{regle.codope}</td>
                    <td className=" px-4 py-2">{regle.lp}</td>
                    <td className=" px-4 py-2">{regle.flcfld}</td>
                    <td className=" px-4 py-2">{regle.src}</td>
                    <td className=" px-4 py-2">{regle.inityp}</td>
                    <td className=" px-4 py-2">{regle.ord}</td>
                    <td className=" px-4 py-2">{regle.typsrc}</td>
                    <td className=" px-4 py-2">{regle.dsc}</td>
                    <td className=" px-4 py-2">{regle.opr}</td>
                    <td className=" px-4 py-2 min-w-72">{regle.msgerr}</td>
                    <td className=" px-4 py-2">{regle.ins}</td>
                    <td className=" px-4 py-2">{regle.inisrc}</td>
                    <td className=" px-4 py-2">{regle.cmsr}</td>
                    <td className=" px-4 py-2">{regle.ansnvlsrc}</td>
                    <td className=" px-4 py-2">{regle.rubini}</td>
                    <td className=" px-4 py-2">{regle.ansnvldst}</td>
                    <td className=" px-4 py-2">{regle.iniopr}</td>
                    <td className=" px-4 py-2">{regle.rubdst}</td>
                    <td className=" px-4 py-2">{regle.dmjobj}</td>
                    <td className=" px-4 py-2">{regle.suobj}</td>
                    <td className=" px-4 py-2">{regle.copobj}</td>
                    <td className=" px-4 py-2">{regle.timobj}</td>
                    <td className=" px-4 py-2">{regle.sttope}</td>
                    <td className=" px-4 py-2">{regle.empobj}</td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <>Aucune donnée disponible </>
          )}
        </table>
      </div>
    </>
  );
}

export default AllRegles;
