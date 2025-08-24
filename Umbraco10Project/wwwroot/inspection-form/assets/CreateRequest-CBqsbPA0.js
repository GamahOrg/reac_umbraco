const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FormBuilder-C05BU3Ns.js","assets/index-nbqgCPN1.js","assets/Request-Icons-DPsXcJcs.js","assets/index.esm-B-jqFwBf.js","assets/ReactSelect-j1lrboTu.js"])))=>i.map(i=>d[i]);
import { a as useTranslation, j as jsxRuntimeExports, r as reactExports, _ as __vitePreload, d as a, b as useNavigate, L as LoadingSpinner, E as ExclamationCircleIcon, U as UpdateRequestNumber } from "./index-nbqgCPN1.js";
import { u as useForm, F as FormProvider } from "./index.esm-B-jqFwBf.js";
import { A as ApiService } from "./ApiService-CYgh-FHm.js";
import { M as Modal } from "./index-CZcgZZVj.js";
const sections = [
  {
    id: "personal_info_section",
    controlType: "SECTION",
    multiple: false,
    linkedParentFieldId: null,
    groupOfAnswers: null,
    enPlaceholder: null,
    arPlaceholder: null,
    required: null,
    disabled: null,
    enLabel: "Personal Information",
    arLabel: "المعلومات الشخصية",
    fields: [
      {
        id: "full_name",
        controlType: "TEXT_BOX",
        multiple: null,
        linkedParentFieldId: null,
        groupOfAnswers: null,
        enPlaceholder: null,
        arPlaceholder: null,
        required: false,
        disabled: true,
        enLabel: "Name",
        arLabel: "الاسم",
        fields: null,
        conditionalView: {
          action: "hidden",
          operator: "and",
          conditions: []
        }
      },
      {
        id: "national_id_c",
        controlType: "NUMERICAL",
        multiple: null,
        linkedParentFieldId: null,
        groupOfAnswers: null,
        enPlaceholder: null,
        arPlaceholder: null,
        required: false,
        disabled: true,
        enLabel: "National ID",
        arLabel: "رقم الهوية",
        fields: null,
        conditionalView: {
          action: "hidden",
          operator: "and",
          conditions: []
        }
      },
      {
        id: "email1",
        controlType: "TEXT_BOX",
        multiple: null,
        linkedParentFieldId: null,
        groupOfAnswers: null,
        enPlaceholder: null,
        arPlaceholder: null,
        required: true,
        disabled: false,
        enLabel: "Email",
        arLabel: "البريد الإلكتروني",
        fields: null,
        validation: {
          templates: [
            "email"
          ]
        },
        conditionalView: {
          action: "hidden",
          operator: "and",
          conditions: []
        }
      },
      {
        id: "phone_mobile",
        controlType: "NUMERICAL",
        multiple: null,
        linkedParentFieldId: null,
        groupOfAnswers: null,
        enPlaceholder: null,
        arPlaceholder: null,
        required: true,
        disabled: false,
        enLabel: "Mobile Number",
        arLabel: "رقم الجوال",
        fields: null,
        validation: {
          templates: [
            "phoneNumber"
          ]
        },
        conditionalView: {
          action: "hidden",
          operator: "and",
          conditions: []
        }
      },
      {
        id: "rejon_c",
        controlType: "DROPDOWN",
        multiple: false,
        linkedParentFieldId: null,
        groupOfAnswers: {
          id: "region",
          enName: "Region",
          arName: "المنطقة",
          maxValue: 0,
          minValue: 0,
          parentId: null,
          answerGroupValuesApi: "/SuggestionsInquiries/GetRegions",
          answerGroupValues: []
        },
        enPlaceholder: null,
        arPlaceholder: null,
        required: false,
        disabled: false,
        enLabel: "Region",
        arLabel: "المنطقة",
        fields: null,
        conditionalView: {
          action: "hidden",
          operator: "and",
          conditions: []
        }
      },
      {
        id: "requestclassification_c",
        controlType: "DROPDOWN",
        multiple: false,
        linkedParentFieldId: null,
        groupOfAnswers: {
          id: "requestـclassification",
          enName: "Request Type",
          arName: "نوع الطلب",
          maxValue: 0,
          minValue: 0,
          parentId: null,
          answerGroupValuesApi: null,
          answerGroupValues: [
            {
              id: "enquiry_c",
              enValue: "Enquiry",
              arValue: "استفسار"
            },
            {
              id: "suggestion_c",
              enValue: "Suggestion",
              arValue: "اقتراح"
            },
            {
              id: "complaint_c",
              enValue: "Complaint",
              arValue: "شكوى"
            }
          ]
        },
        enPlaceholder: null,
        arPlaceholder: null,
        required: true,
        disabled: false,
        enLabel: "Request Type",
        arLabel: "نوع الطلب",
        fields: null,
        conditionalView: {
          action: "hidden",
          operator: "and",
          conditions: []
        }
      },
      {
        id: "service_type_c",
        enLabel: "Service",
        arLabel: "البرنامج",
        controlType: "DROPDOWN",
        multiple: false,
        linkedParentFieldId: null,
        groupOfAnswers: {
          id: "service_type",
          enName: "Service",
          arName: "البرنامج",
          maxValue: 0,
          minValue: 0,
          parentId: null,
          answerGroupValuesApi: "/SuggestionsInquiries/GetServices",
          answerGroupValues: []
        },
        enPlaceholder: null,
        arPlaceholder: null,
        required: true,
        disabled: false,
        fields: null,
        conditionalView: {
          action: "hidden",
          operator: "and",
          conditions: []
        }
      }
    ],
    conditionalView: {
      action: "hidden",
      operator: "and",
      conditions: []
    }
  },
  {
    id: "extra_details_section",
    controlType: "SECTION",
    multiple: null,
    linkedParentFieldId: null,
    groupOfAnswers: null,
    enPlaceholder: null,
    arPlaceholder: null,
    required: null,
    disabled: null,
    enLabel: null,
    arLabel: null,
    fields: [
      {
        controlType: "TEXT_BOX",
        multiple: null,
        linkedParentFieldId: "service_type_c",
        groupOfAnswers: null,
        enPlaceholder: null,
        arPlaceholder: null,
        required: true,
        disabled: false,
        validation: {
          templates: [
            "minMaxLength"
          ],
          minLength: 3,
          maxLength: 50
        },
        conditionalView: {
          action: "hidden",
          operator: "and",
          conditions: [
            {
              linkedFieldId: "requestclassification_c",
              conditionType: "Value",
              validatorValues: [
                "complaint_c"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            },
            {
              linkedFieldId: "service_type_c",
              conditionType: "Value",
              validatorValues: [
                "Egar",
                "Fal",
                "Srei",
                "Mullak",
                "Farz",
                "Rer",
                "mulkia",
                "Wafi",
                "Tasfiah"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            }
          ]
        },
        id: "reference_number_c",
        enLabel: "رقم الشكوى من البرنامج",
        arLabel: "رقم الشكوى من البرنامج",
        notes: {
          Egar: "extra_details_section.complaint_number.ejar",
          Fal: "extra_details_section.complaint_number.fal",
          Srei: "extra_details_section.complaint_number.srei",
          Mullak: "extra_details_section.complaint_number.mullak",
          Farz: "extra_details_section.complaint_number.subdivision",
          Rer: "extra_details_section.complaint_number.rer",
          mulkia: "extra_details_section.complaint_number.mulkia",
          Wafi: "extra_details_section.complaint_number.wafi",
          Tasfiah: "extra_details_section.complaint_number.realEstateContributions"
        },
        fields: null
      },
      {
        controlType: "SPAN",
        multiple: null,
        linkedParentFieldId: "service_type_c",
        groupOfAnswers: null,
        enPlaceholder: null,
        arPlaceholder: null,
        required: false,
        disabled: false,
        conditionalView: {
          action: "hidden",
          operator: "and",
          conditions: [
            {
              linkedFieldId: "requestclassification_c",
              conditionType: "Value",
              validatorValues: [
                "enquiry_c"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            },
            {
              linkedFieldId: "service_type_c",
              conditionType: "Value",
              validatorValues: [
                "Egar",
                "Fal",
                "Srei",
                "Mullak",
                "Farz",
                "Rer",
                "Reac"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            }
          ]
        },
        id: "enquiry_info",
        enLabel: null,
        arLabel: null,
        messages: {
          Egar: "extra_details_section.enquiry_info.ejar",
          Fal: "extra_details_section.enquiry_info.fal",
          Srei: "extra_details_section.enquiry_info.srei",
          Mullak: "extra_details_section.enquiry_info.mullak",
          Farz: "extra_details_section.enquiry_info.subdivision",
          Rer: "extra_details_section.enquiry_info.rer",
          Reac: "extra_details_section.enquiry_info.reac"
        },
        fields: null
      },
      {
        controlType: "SPAN",
        multiple: null,
        linkedParentFieldId: "service_type_c",
        groupOfAnswers: null,
        enPlaceholder: null,
        arPlaceholder: null,
        required: false,
        disabled: false,
        conditionalView: {
          action: "hidden",
          operator: "and",
          conditions: [
            {
              linkedFieldId: "requestclassification_c",
              conditionType: "Value",
              validatorValues: [
                "suggestion_c"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            },
            {
              linkedFieldId: "service_type_c",
              conditionType: "Value",
              validatorValues: [
                "Egar",
                "Fal",
                "Srei",
                "Mullak",
                "Farz",
                "Rer",
                "Reac"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            }
          ]
        },
        id: "suggestion_info",
        enLabel: null,
        arLabel: null,
        messages: {
          Egar: "extra_details_section.suggestion_info.ejar",
          Fal: "extra_details_section.suggestion_info.fal",
          Srei: "extra_details_section.suggestion_info.srei",
          Mullak: "extra_details_section.suggestion_info.mullak",
          Farz: "extra_details_section.suggestion_info.subdivision",
          Rer: "extra_details_section.suggestion_info.rer",
          Reac: "extra_details_section.suggestion_info.reac"
        },
        fields: null
      }
    ],
    conditionalView: {
      action: "hidden",
      operator: "and",
      conditions: []
    }
  },
  {
    id: "extra_details_request_number_section",
    controlType: "SECTION",
    multiple: null,
    linkedParentFieldId: null,
    groupOfAnswers: null,
    enPlaceholder: null,
    arPlaceholder: null,
    required: null,
    disabled: null,
    enLabel: null,
    arLabel: null,
    fields: [
      {
        controlType: "TEXT_BOX",
        gridSize: "col-lg-6",
        multiple: null,
        linkedParentFieldId: "service_type_c",
        groupOfAnswers: null,
        enPlaceholder: null,
        arPlaceholder: null,
        required: true,
        disabled: false,
        validation: {
          templates: [
            "minMaxLength",
            "rerRequestNumber"
          ],
          minLength: 3,
          maxLength: 50
        },
        conditionalView: {
          action: "hidden",
          operator: "and",
          conditions: [
            {
              linkedFieldId: "requestclassification_c",
              conditionType: "Value",
              validatorValues: [
                "complaint_c"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            },
            {
              linkedFieldId: "service_type_c",
              conditionType: "Value",
              validatorValues: [
                "Rer"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            }
          ]
        },
        id: "request_number_c",
        enLabel: "Request number",
        arLabel: "رقم الطلب",
        notes: {
          Rer: "extra_details_request_number_section.request_number.rer"
        },
        fields: null
      }
    ],
    conditionalView: {
      action: "hidden",
      operator: "and",
      conditions: []
    }
  },
  {
    id: "details_section",
    controlType: "SECTION",
    multiple: null,
    linkedParentFieldId: null,
    groupOfAnswers: null,
    enPlaceholder: null,
    arPlaceholder: null,
    required: null,
    disabled: null,
    enLabel: "Request Details",
    arLabel: "تفاصيل المشاركة",
    fields: [
      {
        controlType: "TEXT_BOX",
        multiple: null,
        linkedParentFieldId: "service_type_c",
        groupOfAnswers: null,
        enPlaceholder: null,
        arPlaceholder: null,
        required: true,
        disabled: false,
        validation: {
          templates: [
            "minMaxLength"
          ],
          minLength: 3,
          maxLength: 50
        },
        id: "name",
        enLabel: "Request Title",
        arLabel: "عنوان الشكوى / الاستفسار / المقترح",
        fields: null,
        conditionalView: {
          action: "hidden",
          operator: "or",
          conditions: [
            {
              linkedFieldId: "requestclassification_c",
              conditionType: "Value",
              validatorValues: [
                "complaint_c"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            },
            {
              linkedFieldId: "service_type_c",
              conditionType: "Value",
              validatorValues: [
                "mulkia",
                "Wafi",
                "Tasfiah",
                "Indicators"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            }
          ]
        }
      },
      {
        controlType: "TEXTAREA",
        gridSize: "col-lg-7",
        multiple: null,
        linkedParentFieldId: null,
        groupOfAnswers: null,
        enPlaceholder: null,
        arPlaceholder: null,
        required: true,
        disabled: false,
        id: "description",
        enLabel: "Request description",
        arLabel: "وصف الطلب",
        fields: null,
        validation: {
          templates: [
            "minMaxLength"
          ],
          minLength: 3,
          maxLength: 100
        },
        conditionalView: {
          action: "hidden",
          operator: "or",
          conditions: [
            {
              linkedFieldId: "requestclassification_c",
              conditionType: "Value",
              validatorValues: [
                "complaint_c"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            },
            {
              linkedFieldId: "service_type_c",
              conditionType: "Value",
              validatorValues: [
                "mulkia",
                "Wafi",
                "Tasfiah",
                "Indicators"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            }
          ]
        }
      }
    ],
    conditionalView: {
      action: "hidden",
      operator: "and",
      conditions: [
        {
          linkedFieldId: "requestclassification_c",
          conditionType: "Value",
          validatorValues: [
            "enquiry_c",
            "suggestion_c"
          ],
          enErrorMsg: null,
          arErrorMsg: null
        },
        {
          linkedFieldId: "service_type_c",
          conditionType: "Value",
          validatorValues: [
            "mulkia",
            "Wafi",
            "Tasfiah",
            "Indicators"
          ],
          enErrorMsg: null,
          arErrorMsg: null
        }
      ]
    }
  },
  {
    controlType: "SECTION",
    multiple: true,
    linkedParentFieldId: null,
    groupOfAnswers: null,
    enPlaceholder: null,
    arPlaceholder: null,
    required: null,
    disabled: null,
    id: "attachments_section",
    enLabel: "Attachments",
    arLabel: "المرفقات",
    fields: [
      {
        id: "attachments",
        controlType: "ATTACHMENT_AREA",
        multiple: true,
        max: 4,
        linkedParentFieldId: null,
        groupOfAnswers: null,
        enPlaceholder: null,
        arPlaceholder: null,
        required: false,
        disabled: false,
        enLabel: "Others",
        arLabel: "اخرى",
        fields: null,
        conditionalView: {
          action: "hidden",
          operator: "or",
          conditions: [
            {
              linkedFieldId: "requestclassification_c",
              conditionType: "Value",
              validatorValues: [
                "complaint_c"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            },
            {
              linkedFieldId: "service_type_c",
              conditionType: "Value",
              validatorValues: [
                "mulkia",
                "Wafi",
                "Tasfiah",
                "Indicators"
              ],
              enErrorMsg: null,
              arErrorMsg: null
            }
          ]
        }
      }
    ],
    conditionalView: {
      action: "hidden",
      operator: "and",
      conditions: []
    }
  }
];
const form = {
  sections
};
const getDropdownValues = async (formSections) => {
  try {
    const promises = formSections.filter(
      (field) => {
        var _a;
        return field.controlType === "DROPDOWN" && ((_a = field.groupOfAnswers) == null ? void 0 : _a.answerGroupValuesApi);
      }
    ).map(async (field) => {
      await ApiService.getRequest(field.groupOfAnswers.answerGroupValuesApi).then((response) => {
        field.groupOfAnswers.answerGroupValues = response.data.data;
      }).catch(() => {
        field.groupOfAnswers.answerGroupValues = null;
      });
    });
    await Promise.all(promises);
    return formSections;
  } catch (error) {
    console.error("Error fetching dropdown values:", error);
  }
};
const ErrorModal = ({
  header,
  body,
  customStyles,
  isOpen,
  closeModal
}) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      closeTimeoutMS: 100,
      isOpen,
      className: "modal modal-dialog-centered ",
      style: customStyles,
      onRequestClose: closeModal,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "modal-content",
          style: {
            maxWidth: 500,
            width: "90%",
            minWidth: 380
          },
          children: [
            header && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-header", style: { borderBottom: "none" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { width: "100%" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-11 d-flex align-items-center", children: [
                header.icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginLeft: 8 }, children: header.icon }),
                header.title && /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "modal-title", children: t(header.title) })
              ] }),
              header.withUpperCloseIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-1 align-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: closeModal,
                  type: "button",
                  className: "btn-close",
                  "aria-label": "Close"
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-body", style: { marginTop: -20 }, children: [
              body.icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12 d-flex justify-content-center align-items-center", children: body.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-12 d-flex flex-column align-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: body.style, className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t(body.msg) }) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: closeModal,
                type: "button",
                className: "btn btn-secondary",
                children: "إلغاء"
              }
            ) })
          ]
        }
      )
    }
  );
};
const FormBuilder = reactExports.lazy(() => __vitePreload(() => import("./FormBuilder-C05BU3Ns.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
Modal.setAppElement("#root");
const SuggestionsInquiriesCreateRequest = () => {
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [errorMsg, setErrorMsg] = reactExports.useState();
  const [isErrorModalOpen, setIsErrorModalOpen] = reactExports.useState(false);
  const { actions } = a({
    UpdateRequestNumber
  });
  reactExports.useEffect(() => {
    if (errorMsg) {
      setIsErrorModalOpen(true);
    }
  }, [errorMsg]);
  const closeErrorModal = () => setIsErrorModalOpen(false);
  const [modelData, setModelData] = reactExports.useState(null);
  const methods = useForm({
    shouldUnregister: true
  });
  const { reset, watch } = methods;
  const [updatedSections, setSections] = reactExports.useState(form == null ? void 0 : form.sections);
  reactExports.useEffect(() => {
    const data = window.modelData;
    setModelData(data);
    setIsLoading(false);
    if (data) {
      reset({
        full_name: `${data.data.first_name} ${data.data.last_name}`,
        ...data.data,
        national_id_c: data.idNumber
      });
    }
    const fetchDropdownValues = async () => {
      try {
        if (form == null ? void 0 : form.sections) {
          setIsLoading(true);
          const updatedSections2 = await Promise.all(
            form.sections.map(async (section) => ({
              ...section,
              fields: await getDropdownValues(section.fields)
            }))
          );
          setSections(updatedSections2);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching dropdown values:", error);
      }
    };
    fetchDropdownValues();
  }, [reset]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const basePath = currentLanguage == "ar" ? "/media-center/suggestions-inquiries" : "/en/media-center/suggestions-inquiries";
  if (!modelData) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "يجري تجهيز النموذج" });
  if (!updatedSections) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "لا توجد بيانات لعرضها" });
  const onSubmit = async (data) => {
    try {
      setErrorMsg(null);
      const requestPayload = {
        contact: { ...modelData.data },
        caseData: { ...data },
        noteIds: data.attachments ?? []
      };
      if (!modelData.data.id)
        requestPayload.contact = { ...modelData.data, ...data };
      requestPayload.contact.national_id_c = modelData.idNumber;
      setIsLoading(true);
      const caseResponse = await ApiService.postSuggestionsInquiriesForm(
        "/SuggestionsInquiries/Submit",
        requestPayload
      );
      const caseDetailsResponse = await ApiService.getCaseNumber(caseResponse.data.caseId);
      actions.UpdateRequestNumber(caseDetailsResponse.data.data.case_number);
      navigate(basePath + "/request-created", {
        replace: true
      });
    } catch (e) {
      setErrorMsg("suggestions_and_inquiries.submission_error");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const formValues = watch();
  const caseShowSubmitFields = ["mulkia", "Wafi", "Tasfiah", "Indicators"];
  const shouldShowSubmit = caseShowSubmitFields.includes(formValues.service_type_c) || formValues.requestclassification_c === "complaint_c";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LoadingSpinner, { loading: isLoading, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-header p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-12 mt-4 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "title font-bold", children: t("suggestions_and_inquiries.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-4", children: t("suggestions_and_inquiries.description") })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormProvider, { ...methods, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormBuilder, { formSections: updatedSections }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-footer", children: shouldShowSubmit && // Hide button conditionally
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn btn-primary d-block mx-auto my-2 w-40",
          onClick: () => methods.handleSubmit((data) => onSubmit(data))(),
          children: t("send")
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorModal,
      {
        body: {
          msg: errorMsg || "suggestions_and_inquiries.submission_error",
          style: { fontSize: "16px", marginTop: "20px" },
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ExclamationCircleIcon, {})
        },
        header: {
          withUpperCloseIcon: true
        },
        customStyles: {
          content: {
            justifyContent: "center"
          }
        },
        isOpen: isErrorModalOpen,
        closeModal: closeErrorModal
      }
    )
  ] });
};
export {
  SuggestionsInquiriesCreateRequest as default
};
