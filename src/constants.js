import { FaWallet } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";

export const rules = [
  {
    role: "ROLE_ADMIN",
    id: 2,
  },
  {
    role: "ROLE_RESPONSABLE",
    id: 3,
  },
  {
    role: "ROLE_GESTIONNAIRE",
    id: 4,
  },
  {
    role: "ROLE_USER",
    id: 1,
  },
];

export const rulesPath = [
  {
    rule: "Gestion des règles",
    path: "gestiondesregles",
    icon: <IoCreate size={25} className="mr-2" />,
  },
  {
    rule: "Consultation historique",
    path: "history",
    icon: <FaWallet size={25} className="mr-2" />,
  },
  {
    rule: "Gestion des utilisateurs",
    path: "gestiondesutilisateurs",
    icon: <IoCreate size={25} className="mr-2" />,
  },
  {
    rule: "Validation des règles",
    path: "validationregles",
    icon: <IoCreate size={25} className="mr-2" />,
  },
  {
    rule: "Consultation notifications",
    path: "notifications",
    icon: <IoCreate size={25} className="mr-2" />,
  },
  {
    rule: "Gestion des roles",
    path: "gestiondesroles",
    icon: <IoCreate size={25} className="mr-2" />,
  },
];
