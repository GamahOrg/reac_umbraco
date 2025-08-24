import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinn.tsx";
import { ApiService, ReportInspection } from "../../backend/ApiService.tsx";
import { useLocation } from "react-router-dom";
import ShowRequestDetails from "./ShowRequestDetails.tsx";

const ViewRequest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  const [requestDetails, setRequestDetails] = useState<
    ReportInspection | undefined
  >();

  useEffect(() => {
    if (!state.requestID) console.error("Request ID is missing");
    ApiService.getRequestDetails(state.requestID)
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setRequestDetails(response.data as unknown as Report);
      })
      .finally(() => {
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [state.requestID]);

  return (
    <LoadingSpinner loading={isLoading} classes={["mt-4"]}>
      {requestDetails && <ShowRequestDetails requestDetails={requestDetails} />}
    </LoadingSpinner>
  );
};
export default ViewRequest;
