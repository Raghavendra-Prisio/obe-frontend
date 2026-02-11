// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import {
//   createBrowserRouter,
//   Navigate,
//   RouterProvider,
// } from "react-router-dom";
// import Main from "./components/Main.jsx";
// import Login from "./components/Login.jsx";

// import { PublicClientApplication } from "@azure/msal-browser";
// import { MsalProvider, useIsAuthenticated } from "@azure/msal-react";
// import { msalConfig } from "./msalConfig";

// const msalInstance = new PublicClientApplication(msalConfig);

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = useIsAuthenticated();

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Login />,
//       },

//       {
//         path: "chat",
//         element: (
//           <ProtectedRoute>
//             <Main />
//           </ProtectedRoute>
//         ),
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <MsalProvider instance={msalInstance}>
//       <RouterProvider router={router} />
//     </MsalProvider>
//   </StrictMode>,
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Main from "./components/Main.jsx";
import Login from "./components/Login.jsx";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { msalConfig } from "./msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);

// ⭐ FIX #1 — Wait for MSAL before rendering
msalInstance.initialize().then(() => {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
    const { inProgress } = useMsal();

    // ⭐ CRITICAL — wait while MSAL processes redirect
    if (inProgress !== "none") {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "chat",
          element: (
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <RouterProvider router={router} />
      </MsalProvider>
    </StrictMode>,
  );
});
