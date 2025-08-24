import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createStore, StateMachineProvider } from "little-state-machine";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { NavigationPage } from "./pages/navigation-page/NavigationPage.tsx";
import { RequestCreated } from "./pages/request-created/RequestCreated.tsx";
import { SuggestionInquiriesRequestCreated } from "./pages/suggestions-inquiries/RequestCreated.tsx";
import { LoadingSpinner } from "./components/LoadingSpinn.tsx";
import "./i18n/config.ts";

const App = lazy(() => import("./App.tsx"));
const ViewRequest = lazy(() => import("./pages/view-request/ViewRequest.tsx"));
const ReviewCreatedRequests = lazy(
  () => import("./pages/review-created-requests/ReviewCreatedRequests.tsx"),
);
const CreateRequest = lazy(
  () => import("./pages/create-request/CreateRequest.tsx"),
);

const SuggestionsInquiriesCreateRequest = lazy(
  () => import("./pages/suggestions-inquiries/CreateRequest.tsx"),
);
createStore(
  {
    newRequestNumber: undefined,
  },
  {
    persist: "none", // onAction is default if not provided
  },
);

const NotFound = () => {
  const location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/:lang?/media-center/complaints/",
    element: (
      <Suspense fallback={<LoadingSpinner loading={true} />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<LoadingSpinner loading={true} />}>
            <NavigationPage />
          </Suspense>
        ),
      },
      {
        path: "create-request",
        element: (
          <Suspense fallback={<LoadingSpinner loading={true} />}>
            <CreateRequest />
          </Suspense>
        ),
      },
      {
        path: "request-created",
        element: (
          <Suspense fallback={<LoadingSpinner loading={true} />}>
            <RequestCreated />
          </Suspense>
        ),
      },
      {
        path: "review-requests",
        element: (
          <Suspense fallback={<LoadingSpinner loading={true} />}>
            <ReviewCreatedRequests />
          </Suspense>
        ),
      },
      {
        path: "view-request",
        element: (
          <Suspense fallback={<LoadingSpinner loading={true} />}>
            <ViewRequest />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/:lang?/media-center/suggestions-inquiries/",
    element: (
      <Suspense fallback={<LoadingSpinner loading={true} />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<LoadingSpinner loading={true} />}>
            <SuggestionsInquiriesCreateRequest />
          </Suspense>
        ),
      },
      {
        path: "request-created",
        element: (
          <Suspense fallback={<LoadingSpinner loading={true} />}>
            <SuggestionInquiriesRequestCreated
              successMsg="thank_you"
              successDesc="request_received"
            />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StateMachineProvider>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </StateMachineProvider>
  </StrictMode>,
);
