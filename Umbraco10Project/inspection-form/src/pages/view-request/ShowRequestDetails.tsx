import { Field, ReportInspection } from "../../backend/ApiService.tsx";
import { useMemo, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { LoadingSpinner } from "../../components/LoadingSpinn.tsx";
import RequestedFilesSection from "./RequestFilesUpload.tsx";
import { useTranslation } from "react-i18next";
import RequestIcons from "../../components/Request-Icons.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const ATTACHMENTS_BASE_URL = window.ATTACHMENTS_BASE_URL;
export const FieldValue = ({ field }: { field: Field }) => {
  // Create a mapping of label IDs to their Arabic values for quick lookup

  const labelsMap = useMemo(() => {
    return field.labels.reduce(
      (acc, label) => {
        acc[label.id] = label.arValue;
        return acc;
      },
      {} as { [key: string]: string },
    );
  }, [field.labels]);

  // Check if the field type is GPS
  if (field.fieldType === "GPS") {
    return (
      <div className="row mb-2">
        <div className="col-sm-3">
          <strong>{field.arabicLabel}:</strong>
        </div>
        <div className="col-sm-9">
          <ReactMapGL
            latitude={+field.values[1]}
            longitude={+field.values[0]}
            zoom={12}
            mapStyle="https://rei-api.rega.gov.sa/get-map-style"
            mapboxAccessToken="pk.eyJ1IjoiYWhhc2hpbTMwIiwiYSI6ImNtMnVhcTFrZTAwOGoya3F0MGFqbmd0dWIifQ.FUSY5EMmczUKNvEu98MeGQ"
            dragPan={false}
            dragRotate={false}
            scrollZoom={false}
            doubleClickZoom={false}
            style={{
              width: "100%",
              height: "500px",
            }}
          >
            <Marker
              longitude={+field.values[0]}
              latitude={+field.values[1]}
              anchor="bottom"
            >
              <div style={{ color: "red", fontSize: "24px" }}>📍</div>
            </Marker>
          </ReactMapGL>
        </div>
      </div>
    );
  }

  // Map the field values to their corresponding labels
  const fieldValue =
    field.values.length > 0
      ? field.values.map((valueId) => labelsMap[valueId] || valueId).join(", ")
      : "N/A";
  if (fieldValue === "N/A") return;

  if (field.fieldType === "ATTACHMENT_AREA")
    return (
      <div className="row mb-2">
        <div className="col-sm-3">
          <strong>{field.arabicLabel}:</strong>
        </div>
        <div className="col-sm-9">
          {field.values.map((valueId, index) => (
            <a
              href={`${ATTACHMENTS_BASE_URL}${valueId}`}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              عرض الملف
            </a>
          ))}
        </div>
      </div>
    );

  return (
    <div className="row mb-2">
      <div className="col-sm-3">
        <strong>{field.arabicLabel}:</strong>
      </div>
      <div className="col-sm-9">{fieldValue}</div>
    </div>
  );
};
const adjustDate = (date: Date) => {
  const timeOffsetInMS: number = -date.getTimezoneOffset() * 60000;
  date.setTime(date.getTime() + timeOffsetInMS);
  return date;
};

const ShowRequestDetails = ({
  requestDetails,
}: {
  requestDetails: ReportInspection;
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  let requestedFiles = requestDetails.sections.find(
    (section) => section.arabicLabel === "المستندات الناقصة",
  );
  const attachments = requestDetails.sections.find(
    (section) => section.arabicLabel === "المرفقات",
  );
  if (requestDetails.statusName !== "المستندات الناقصة")
    requestedFiles = undefined;

  const filteredSections = useMemo(
    () =>
      requestDetails.sections.filter(
        (section) => section.arabicLabel !== "المستندات الناقصة",
      ),
    [requestDetails.sections],
  );

  return (
    <LoadingSpinner loading={isLoading}>
      <div className="container mt-4">
        {/* Request Information */}

        <div className="card mb-3">
          <div className="card-header">
            <p className="title fw-bold mb-0" style={{ fontSize: "1.5rem" }}>
              <div style={{ display: "inline-block", marginLeft: "10px" }}>
                <RequestIcons requestLabel={t("ticket_details")} />
              </div>
              {t("ticket_details")}
            </p>
          </div>

          <div className="card-body">
            <div className="row mb-2">
              <div className="col-sm-3">
                <strong>{t("ticket_number")}:</strong>
              </div>
              <div className="col-sm-9">
                <span className={"badge text-bg-light"}>
                  {requestDetails.id}
                </span>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-3">
                <strong>{t("status")}:</strong>
              </div>
              <div className="col-sm-9">
                <span
                  className={`badge ${
                    requestDetails.statusName === "مفتوح"
                      ? "bg-danger"
                      : "bg-success"
                  }`}
                >
                  {requestDetails.statusName}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <strong>{t("created_at")}:</strong>
              </div>
              <div className="col-sm-9">
                {adjustDate(
                  new Date(requestDetails.createdDate),
                ).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        {filteredSections
          .filter(
            (section) =>
              section.fields.length > 0 &&
              section.fields
                .map((field) => field.values.length > 0)
                .includes(true),
          )
          .map((section, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-header">
                <p
                  className="title fw-bold mb-0"
                  style={{ fontSize: "1.5rem" }}
                >
                  <div style={{ display: "inline-block", marginLeft: "10px" }}>
                    <RequestIcons requestLabel={section.arabicLabel} />
                  </div>
                  {section.arabicLabel}
                </p>
              </div>
              <div className="card-body">
                {section.fields.map((field, index) => (
                  <FieldValue field={field} key={index} />
                ))}
              </div>
            </div>
          ))}

        {/* requestedFiles */}
        {requestedFiles && (
          <div className="card mb-3">
            <div className="card-header">
              <p className="title fw-bold mb-0">{requestedFiles.arabicLabel}</p>
            </div>
            <div className="card-body">
              <RequestedFilesSection
                attachments={attachments}
                setIsLoading={setIsLoading}
                requestedFilesSection={requestedFiles}
              />
            </div>
          </div>
        )}

        {/* History */}
        {/*<div className="card mb-3">*/}
        {/*  <div className="card-header">*/}
        {/*    <p className="title mb-0">{t("activity_log")}</p>*/}
        {/*  </div>*/}
        {/*  <div className="card-body">*/}
        {/*    {requestDetails.history.map((historyItem, historyIndex) => (*/}
        {/*      <div className="row mb-2" key={historyIndex}>*/}
        {/*        <div className="col-sm-3">*/}
        {/*          <strong>{historyItem.actionType}:</strong>*/}
        {/*        </div>*/}
        {/*        <div className="col-sm-9">*/}
        {/*          {new Date(requestDetails.createdDate).toLocaleDateString(*/}
        {/*            "ar-EG",*/}
        {/*            {*/}
        {/*              year: "numeric",*/}
        {/*              month: "long",*/}
        {/*              day: "numeric",*/}
        {/*              hour: "2-digit",*/}
        {/*              minute: "2-digit",*/}
        {/*            },*/}
        {/*          )}*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </LoadingSpinner>
  );
};

export default ShowRequestDetails;
