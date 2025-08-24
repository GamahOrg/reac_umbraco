import { j as jsxRuntimeExports, u as useLocation, a as useTranslation, b as useNavigate, r as reactExports, L as LoadingSpinner } from "./index-nbqgCPN1.js";
import { A as ApiService } from "./ApiService-CYgh-FHm.js";
import { M as Map, a as Marker } from "./exports-mapbox-CaNunxlW.js";
import { u as useForm } from "./index.esm-B-jqFwBf.js";
import { F as FilePondField, s, R as RequestIcons } from "./Request-Icons-DPsXcJcs.js";
import { g as getFieldsToBeShown } from "./FormHelpers-usg8eVTc.js";
function ShowRequestedFiles({
  requestedFiles,
  setIsLoading
}) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { state } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await ApiService.updateRequest(data, state.requestID);
      navigate(0);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    requestedFiles.map((file, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
        file.arabicLabel,
        ":"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-sm-9", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilePondField,
          {
            control,
            formField: {
              id: file.fieldId,
              disabled: false,
              required: true,
              arLabel: file.arabicLabel
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          s,
          {
            errors,
            name: file.fieldId,
            render: ({ message }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-danger mt-2", children: message })
          }
        )
      ] }) }, index) })
    ] })),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "btn btn-primary",
        onClick: handleSubmit(onSubmit, () => {
        }),
        children: t("upload_required_files")
      }
    )
  ] });
}
const adapter = (field) => {
  return {
    ...field,
    id: field.fieldId,
    arLabel: field.arabicLabel,
    enLabel: field.englishLabel
  };
};
const RequestedFilesSection = ({
  attachments,
  requestedFilesSection,
  setIsLoading
}) => {
  const requestFilesField = requestedFilesSection == null ? void 0 : requestedFilesSection.fields.find(
    (c) => c.arabicLabel === "المستندات الناقصة"
  );
  if (!requestFilesField) return null;
  const allFields = [...attachments.fields.map(adapter)];
  allFields.push(adapter(requestFilesField));
  const fieldsToBeShown = getFieldsToBeShown(allFields, {
    [requestFilesField.fieldId]: requestFilesField.values
  });
  return fieldsToBeShown.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
    ShowRequestedFiles,
    {
      requestedFiles: attachments.fields.filter((c) => {
        return fieldsToBeShown.includes(c.fieldId);
      }),
      setIsLoading
    }
  );
};
const ATTACHMENTS_BASE_URL = window.ATTACHMENTS_BASE_URL;
const FieldValue = ({ field }) => {
  const labelsMap = reactExports.useMemo(() => {
    return field.labels.reduce(
      (acc, label) => {
        acc[label.id] = label.arValue;
        return acc;
      },
      {}
    );
  }, [field.labels]);
  if (field.fieldType === "GPS") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
        field.arabicLabel,
        ":"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Map,
        {
          latitude: +field.values[1],
          longitude: +field.values[0],
          zoom: 12,
          mapStyle: "https://rei-api.rega.gov.sa/get-map-style",
          mapboxAccessToken: "pk.eyJ1IjoiYWhhc2hpbTMwIiwiYSI6ImNtMnVhcTFrZTAwOGoya3F0MGFqbmd0dWIifQ.FUSY5EMmczUKNvEu98MeGQ",
          dragPan: false,
          dragRotate: false,
          scrollZoom: false,
          doubleClickZoom: false,
          style: {
            width: "100%",
            height: "500px"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Marker,
            {
              longitude: +field.values[0],
              latitude: +field.values[1],
              anchor: "bottom",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "red", fontSize: "24px" }, children: "📍" })
            }
          )
        }
      ) })
    ] });
  }
  const fieldValue = field.values.length > 0 ? field.values.map((valueId) => labelsMap[valueId] || valueId).join(", ") : "N/A";
  if (fieldValue === "N/A") return;
  if (field.fieldType === "ATTACHMENT_AREA")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
        field.arabicLabel,
        ":"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-9", children: field.values.map((valueId, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `${ATTACHMENTS_BASE_URL}${valueId}`,
          target: "_blank",
          rel: "noreferrer",
          children: "عرض الملف"
        },
        index
      )) })
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
      field.arabicLabel,
      ":"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-9", children: fieldValue })
  ] });
};
const adjustDate = (date) => {
  const timeOffsetInMS = -date.getTimezoneOffset() * 6e4;
  date.setTime(date.getTime() + timeOffsetInMS);
  return date;
};
const ShowRequestDetails = ({
  requestDetails
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = reactExports.useState(false);
  let requestedFiles = requestDetails.sections.find(
    (section) => section.arabicLabel === "المستندات الناقصة"
  );
  const attachments = requestDetails.sections.find(
    (section) => section.arabicLabel === "المرفقات"
  );
  if (requestDetails.statusName !== "المستندات الناقصة")
    requestedFiles = void 0;
  const filteredSections = reactExports.useMemo(
    () => requestDetails.sections.filter(
      (section) => section.arabicLabel !== "المستندات الناقصة"
    ),
    [requestDetails.sections]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { loading: isLoading, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "title fw-bold mb-0", style: { fontSize: "1.5rem" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "inline-block", marginLeft: "10px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RequestIcons, { requestLabel: t("ticket_details") }) }),
        t("ticket_details")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            t("ticket_number"),
            ":"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge text-bg-light", children: requestDetails.id }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            t("status"),
            ":"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `badge ${requestDetails.statusName === "مفتوح" ? "bg-danger" : "bg-success"}`,
              children: requestDetails.statusName
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            t("created_at"),
            ":"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-sm-9", children: adjustDate(
            new Date(requestDetails.createdDate)
          ).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }) })
        ] })
      ] })
    ] }),
    filteredSections.filter(
      (section) => section.fields.length > 0 && section.fields.map((field) => field.values.length > 0).includes(true)
    ).map((section, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: "title fw-bold mb-0",
          style: { fontSize: "1.5rem" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "inline-block", marginLeft: "10px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RequestIcons, { requestLabel: section.arabicLabel }) }),
            section.arabicLabel
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: section.fields.map((field, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(FieldValue, { field }, index2)) })
    ] }, index)),
    requestedFiles && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "title fw-bold mb-0", children: requestedFiles.arabicLabel }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        RequestedFilesSection,
        {
          attachments,
          setIsLoading,
          requestedFilesSection: requestedFiles
        }
      ) })
    ] })
  ] }) });
};
const ViewRequest = () => {
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const { state } = useLocation();
  const [requestDetails, setRequestDetails] = reactExports.useState();
  reactExports.useEffect(() => {
    if (!state.requestID) console.error("Request ID is missing");
    ApiService.getRequestDetails(state.requestID).then((response) => {
      setRequestDetails(response.data);
    }).finally(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    });
  }, [state.requestID]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { loading: isLoading, classes: ["mt-4"], children: requestDetails && /* @__PURE__ */ jsxRuntimeExports.jsx(ShowRequestDetails, { requestDetails }) });
};
export {
  ViewRequest as default
};
