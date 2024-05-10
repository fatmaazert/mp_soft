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
const ReglePage = React.lazy(() =>
  import("./pages/responsablePages/ReglePage")
);
const ProtectedRoute = React.lazy(() => import("./pages/ProtextedPages"));
function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <ToastContainer />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProtectedRoute />} />
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
