import { ReactNode } from "react";

export const LoadingSpinner = ({
  classes = [],
  children,
  loading,
}: {
  classes?: string[];
  children?: ReactNode;
  loading: boolean;
}) => {
  return (
    <div className={`position-relative ${classes.join(" ")}`}>
      {loading && (
        <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary z-1" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {children && (
        <div
          className={loading ? "pe-none" : ""}
          style={loading ? { filter: "blur(4px)" } : undefined}
        >
          {children}
        </div>
      )}
      {!children && loading && (
        <div className="w-100" style={{ height: "500px" }}></div>
      )}
    </div>
  );
};
