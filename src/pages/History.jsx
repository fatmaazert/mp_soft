import { useEffect, useState } from "react";
import { get } from "../utils/apiMethods";
import { FcConferenceCall, FcCheckmark, FcCancel } from "react-icons/fc";
import { MdHistoryEdu } from "react-icons/md";
function History() {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const retrieveHistory = async () => {
      const history = await get("historique/retrieve-all-historique");
      if (history) {
        setHistories(history);
      }
    };
    retrieveHistory();
  }, []);

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour12: true,
  };

  // Create an Intl.DateTimeFormat object
  const formatter = new Intl.DateTimeFormat("en-TN", options);

  /*
   {
        "id": 31,
        "userId": null,
        "actionType": "AJOUT",
        "status": null,
        "actionDate": null,
        "regleId": 33,
        "delivered": false,
        "deliveredResponsable": true,
        "read": false,
        "content": "amira demande d'ajoute regle "
    }
  */

  const headers = [
    "Id",
    "Action Type",
    "Content",
    "Status",
    "Date",
    "Delivered",
    "Delivered Responsable",
    "Read",
  ];
  return (
    <div className="mt-10">
      <h1 className="text-3xl mt-4 flex gap-x-1 justify-center items-center bg-gray-300 max-w-7xl mx-auto">
        <MdHistoryEdu size={38} /> Consulter l'historique
      </h1>

      <div className="overflow-y-scroll max-h-[500px] max-w-6xl my-10 mx-auto">
        <table className="table-auto mx-auto w-full bg-white">
          <thead>
            <tr className="text-center">
              {headers?.map((title, index) => (
                <th
                  key={index}
                  className="bg-primary bg-100 sticky top-0 border-b border-gray-200 px-6 py-4 text-white text-600 font-bold tracking-wider uppercase text-xs"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          {histories?.length > 0 ? (
            <>
              <tbody>
                {histories.map((history, index) => (
                  <tr
                    key={index}
                    className="bg-lightGrey border-b-2 text-center"
                  >
                    <td className=" px-4 py-2">{history.id}</td>
                    <td className=" px-4 py-2">{history.actionType}</td>
                    <td className=" px-4 py-2">{history.content}</td>
                    <td className=" px-4 py-2">{history.status || "------"}</td>
                    <td className=" px-4 py-2">
                      {history.actionDate
                        ? new Date(history.actionDate).toLocaleDateString()
                        : "------"}
                    </td>
                    <td className=" px-4 py-2 flex justify-center">
                      {history.delivered ? (
                        <FcCheckmark size={20} />
                      ) : (
                        <FcCancel size={20} />
                      )}
                    </td>
                    <td className=" px-4 py-2">
                      {String(history.deliveredResponsable)}
                    </td>
                    <td className=" px-4 py-2 flex justify-center">
                      {history.read ? (
                        <FcCheckmark size={20} />
                      ) : (
                        <FcCancel size={20} />
                      )}
                    </td>
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
  );
}

export default History;
