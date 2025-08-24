const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FormBuilder-B3jZ_QCD.js","assets/index-nbqgCPN1.js","assets/FormHelpers-usg8eVTc.js","assets/Request-Icons-DPsXcJcs.js","assets/index.esm-B-jqFwBf.js","assets/ReactSelect-j1lrboTu.js"])))=>i.map(i=>d[i]);
import { r as reactExports, _ as __vitePreload, d as a, b as useNavigate, a as useTranslation, j as jsxRuntimeExports, L as LoadingSpinner, C as ComplaintIcon, e as ConfirmIcon, U as UpdateRequestNumber } from "./index-nbqgCPN1.js";
import { u as useForm, F as FormProvider } from "./index.esm-B-jqFwBf.js";
import { A as ApiService } from "./ApiService-CYgh-FHm.js";
import { M as Modal } from "./index-CZcgZZVj.js";
const FormBuilder = reactExports.lazy(() => __vitePreload(() => import("./FormBuilder-B3jZ_QCD.js"), true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0));
Modal.setAppElement("#root");
const customStyles = {
  content: {
    justifyContent: "center"
  }
};
const CreateRequest = () => {
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const { actions } = a({
    UpdateRequestNumber
  });
  const [inspectionModel, setInspectionModel] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setInspectionModel(window.inspectionModel);
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, []);
  const methods = useForm({
    shouldUnregister: true
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [modalIsOpen, setIsOpen] = reactExports.useState(false);
  const basePath = currentLanguage == "ar" ? "/media-center/complaints" : "/en/media-center/complaints";
  const sectionsShouldBeShown = reactExports.useMemo(() => {
    const formSections = inspectionModel == null ? void 0 : inspectionModel.data.fields;
    if (!formSections) return [];
    return formSections.filter((section) => section.visibilityView.length === 0).sort((s) => s.fieldOrder);
  }, [inspectionModel]);
  if (!inspectionModel) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "يجري تجهيز النموذج" });
  if (!sectionsShouldBeShown) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "لا توجد بيانات لعرضها" });
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await ApiService.postInspectionForm(data);
      actions.UpdateRequestNumber(response.data.data.id);
      navigate(basePath + "/request-created", {
        replace: true
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { loading: isLoading, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-header p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row justify-content-center text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-12 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComplaintIcon, { width: 30, height: 30 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "title font-bold", children: t("new_ticket") })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-body p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-xs-12 col-sm-6 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "fw-bold", children: [
            t("full_name"),
            ":"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: " mx-2", children: inspectionModel.fullName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-xs-12 col-sm-6 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "fw-bold", children: [
            t("id_number"),
            ":"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: " mx-2", children: inspectionModel.idNumber })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormProvider, { ...methods, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormBuilder, { formSections: sectionsShouldBeShown }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn btn-primary d-block mx-auto my-2 w-40",
          onClick: methods.handleSubmit(openModal),
          children: t("create_ticket")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Modal,
        {
          closeTimeoutMS: 100,
          isOpen: modalIsOpen,
          className: "modal modal-dialog-centered ",
          style: customStyles,
          onRequestClose: closeModal,
          contentLabel: "تأكيد إنشاء البلاغ",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { width: "100%" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-11 d-flex align-items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginLeft: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmIcon, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "modal-title", children: "تأكيد إنشاء البلاغ" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-1 align-content-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: closeModal,
                      type: "button",
                      className: "btn-close",
                      "aria-label": "Close"
                    }
                  ) })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "سيتم إنشاء البلاغ بناءً على البيانات المدخلة ولا يمكن التعديل بعد الإرسال و تتحمل المسؤولية الكاملة عن البيانات المدخلة ." }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-footer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => (onSubmit(methods.getValues()), closeModal()),
                      type: "button",
                      className: "btn btn-primary",
                      children: "إرسال"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: closeModal,
                      type: "button",
                      className: "btn btn-secondary",
                      children: "إلغاء"
                    }
                  )
                ] })
              ]
            }
          )
        }
      )
    ] })
  ] }) });
};
export {
  CreateRequest as default
};
