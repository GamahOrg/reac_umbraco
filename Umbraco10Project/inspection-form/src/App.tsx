import "./App.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    // if there is no inspection model, redirect to logout page
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // if (!window.inspectionModel) {
    //   // keep the host name and the port number
    //   window.location.href = "/umbraco/surface/services/LogOut?language=arabic";
    // }
    // redirect to the create request page
    // navigate("/media-center/complaints/view-request", {
    //   state: {
    //     requestID: 14079,
    //   },
    // });
  });

  return (
    <div style={{ minHeight: "calc(100vh - 500px)", width: "100%" }}>
      <Outlet />
    </div>
  );
}

export default App;
