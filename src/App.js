import { Route, Routes } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from "./hooks/useAuth";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/SignUpPage"));

const ProtectedRoute = React.lazy(() => import("./pages/ProtectedPages"));
const Compte = React.lazy(() => import("./pages/Compte"));
const AdminGestionDesUsers = React.lazy(() =>
  import("./pages/Gestion_des_Users")
);

const HomePage = React.lazy(() => import("./pages/Home_Page.jsx"));
const GestionReglePage = React.lazy(() =>
  import("./pages/Gestion_des_regles.jsx")
);

const NotificationsPage = React.lazy(() => import("./pages/Notifications.jsx"));
const GestionRolePage = React.lazy(() =>
  import("./pages/Gestion_de_roles.jsx")
);
const GestionUserPage = React.lazy(() =>
  import("./pages/Gestion_des_Users.jsx")
);
const HistoryPage = React.lazy(() => import("./pages/History.jsx"));
const AllReglesComponent = React.lazy(() =>
  import("./components/regleComponent/AllReglesComp.jsx")
);

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <ToastContainer />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProtectedRoute />}>
              <Route index element={<HomePage />} />
              <Route path="compte" element={<Compte />} />
              <Route path="gestiondesroles" element={<GestionRolePage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route
                path="gestiondesutilisateurs"
                element={<GestionUserPage />}
              />
              <Route
                path="validationregles"
                element={<AdminGestionDesUsers />}
              />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="ajoutregles" element={<GestionReglePage />} />
              <Route path="notification" element={<HistoryPage />} />

              <Route path="gestiondesregles" element={<AllReglesComponent />} />
            </Route>
            <Route
              path="*"
              element={
                <ErrorPage
                  status="404"
                  message="Page non trouvée"
                  details="Désolé, nous n'avons pas trouvé la page que vous recherchez"
                />
              }
            />
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  );
}

export default App;
