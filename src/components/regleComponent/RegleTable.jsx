import React, { useEffect, useState } from "react";
import CloseButton from "../formComponents/CloseButton";
import { get } from "../../utils/apiMethods";
import { headerRule } from "../../utils/listType";

function RegleTable({ isOpen, onClose, codope, lp }) {
  const [allRules, setAllRules] = useState([]);
  useEffect(() => {
    const getAllFunction = async () => {
      const getRegle = await get(`/Regle/regles/${codope}/${lp}`);
      setAllRules(getRegle);
    };
    getAllFunction();
  }, [codope, lp]);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 ">
          <div className="relative bg-white p-8 rounded-lg w-[1200px] h-[600px] overflow-hidden border border-gray-300 shadow-lg">
            <CloseButton
              className="absolute top-1 right-2"
              onClick={handleClose}
            />
            <h2 className="mt-2 text-xl text-primary font-semibold mb-4">
              informations sur les regles
            </h2>
            <div className="overflow-auto max-h-[500px]">
              <table className="border-collapse table-auto bg-white">
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
                        <tr key={index} className="bg-lightGrey">
                          <td className=" px-4 py-2">{regle.id}</td>
                          <td className=" px-4 py-2">{regle.codope}</td>
                          <td className=" px-4 py-2">{regle.lp}</td>
                          <td className=" px-4 py-2">{regle.flcfld}</td>
                          <td className=" px-4 py-2">{regle.src}</td>
                          <td className=" px-4 py-2">{regle.inityp}</td>
                          <td className=" px-4 py-2">{regle.ord}</td>
                          <td className=" px-4 py-2">{regle.typsrc}</td>
                          <td className=" px-4 py-2">{regle.dsc}</td>
                          <td className=" px-4 py-2">{regle.opr}</td>
                          <td className=" px-4 py-2">{regle.msgerr}</td>
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
          </div>
        </div>
      )}
    </>
  );
}

export default RegleTable;
