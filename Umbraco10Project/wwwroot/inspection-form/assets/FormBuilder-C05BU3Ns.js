import { a as useTranslation, r as reactExports, j as jsxRuntimeExports } from "./index-nbqgCPN1.js";
import { F as FilePondField, R as RequestIcons, s } from "./Request-Icons-DPsXcJcs.js";
import { a as useFormContext } from "./index.esm-B-jqFwBf.js";
import { c as classNames, R as ReactSelect, i as isValidIBAN } from "./ReactSelect-j1lrboTu.js";
const email = {
  template: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$",
  message: "validation.email"
};
const minMaxLength = {
  template: "^.{min,max}$",
  message: "validation.minMaxLength"
};
const numbersOnly = {
  template: "/^[0-9]*$/",
  message: "validation.numbers_only"
};
const phoneNumber = {
  template: "^05[0-9]{8}$",
  message: "validation.phoneNumber"
};
const rerRequestNumber = {
  template: "^(FR|SR|MJ|RJ|CR|DT|MR|EX)[a-zA-Z0-9]*$",
  message: "validation.rerRequestNumber"
};
const validationTemplates = {
  email,
  minMaxLength,
  numbersOnly,
  phoneNumber,
  rerRequestNumber
};
const prepareValidation = (templateKeys, min, max) => {
  const { t } = useTranslation();
  const templates = Array.isArray(templateKeys) ? templateKeys : [templateKeys];
  return templates.map((templateKey) => {
    const template = validationTemplates[templateKey];
    let regex = template.template;
    let param = {};
    if (min && max) {
      regex = regex.replace("min", min.toString()).replace("max", max.toString());
      param = { min, max };
    }
    const message = t(template.message, param);
    return {
      value: new RegExp(regex),
      message
    };
  });
};
const getValidation = (validationObj) => {
  const validations = prepareValidation(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    validationObj.templates,
    validationObj.minLength,
    validationObj.maxLength
  );
  return Object.fromEntries(
    validations.map(({ value, message }) => [
      message,
      (x) => new RegExp(value).test(x) || message
    ])
  );
};
const HasError = (errors, fieldId) => {
  return errors[fieldId] ? "is-invalid" : "";
};
const DynamicFormElement = ({ field }) => {
  var _a, _b;
  const {
    watch,
    control,
    register,
    formState: { errors }
  } = useFormContext();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const formValues = watch();
  const currentLanguage = i18n.language;
  const [isEmailInitiallyDisabled, setIsEmailInitiallyDisabled] = reactExports.useState(false);
  const [isPhoneNumberInitiallyDisabled, setIsPhoneNumberInitiallyDisabled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const initialValue = watch(field.id);
    if (field.id === "email1") {
      setIsEmailInitiallyDisabled(field.disabled || !!initialValue);
    }
    if (field.id === "phone_mobile") {
      setIsPhoneNumberInitiallyDisabled(field.disabled || !!initialValue);
    }
  }, []);
  switch (field.controlType) {
    case "DROPDOWN": {
      if (!field.groupOfAnswers || !field.groupOfAnswers.answerGroupValues)
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "لا توجد خيارات متاحة" });
      const options = field.groupOfAnswers.answerGroupValues.filter((c) => {
        if (!field.linkedParentFieldId) return c;
        if (formValues[field.linkedParentFieldId] && c.parentAnswerId === formValues[field.linkedParentFieldId])
          return c;
      }).sort((a, b) => {
        if (a.parentAnswerId) return a.arValue.localeCompare(b.arValue);
        return 0;
      }).map((option) => ({ value: option.id, label: option.arValue }));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReactSelect,
        {
          formField: field,
          isLoading: options.length === 0,
          options,
          isDisabled: field.disabled ?? false,
          isSearchable: options.length > 5,
          isClearable: true
        }
      );
    }
    case "TEXT_BOX": {
      let type = field.arLabel && field.arLabel.includes("البريد الإلكتروني") ? "email" : "text";
      let validate2 = void 0;
      if (field.arLabel && field.arLabel.includes("الايبان")) {
        validate2 = (value) => {
          if (field.required || value.length > 0) {
            if (!isValidIBAN(value)) return t("input_incorrect");
          }
          return true;
        };
      }
      validate2 = field.validation ? getValidation(field.validation) : validate2;
      const id2 = formValues[field.linkedParentFieldId];
      const message2 = ((_a = field.notes) == null ? void 0 : _a[id2]) || "";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        field.notes && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "form-text text-muted small text-secondary",
            dangerouslySetInnerHTML: { __html: t(message2) }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type,
            className: classNames("form-control", HasError(errors, field.id)),
            ...register(field.id, {
              validate: validate2,
              disabled: field.id == "email1" ? isEmailInitiallyDisabled : field.disabled ?? false,
              required: {
                value: field.required ?? false,
                message: `${currentLanguage === "ar" ? field.arLabel : field.enLabel} ${t("required_field")}`
              },
              shouldUnregister: true
            }),
            placeholder: currentLanguage === "ar" ? field.arPlaceholder : field.enPlaceholder
          }
        )
      ] });
    }
    case "NUMERICAL": {
      const validate2 = field.validation ? getValidation(field.validation) : void 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "tel",
          className: classNames("form-control", HasError(errors, field.id)),
          ...register(field.id, {
            validate: validate2,
            disabled: field.id == "phone_mobile" ? isPhoneNumberInitiallyDisabled : field.disabled ?? false,
            required: {
              value: field.required ?? false,
              message: (currentLanguage == "ar" ? field.arLabel : field.enLabel) + " " + t("required_field")
            },
            shouldUnregister: true
          }),
          placeholder: field.arPlaceholder
        }
      );
    }
    case "TEXTAREA":
      let validate = field.validation ? getValidation(field.validation) : void 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: classNames("form-control", HasError(errors, field.id)),
          ...register(field.id, {
            validate,
            disabled: field.disabled ?? false,
            required: {
              value: field.required ?? false,
              message: (currentLanguage == "ar" ? field.arLabel : field.enLabel) + " " + t("required_field")
            },
            shouldUnregister: true
          }),
          placeholder: field.arPlaceholder
        }
      );
    case "CHECKBOX":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "form-check-input",
          type: "checkbox",
          ...register(field.id, {
            disabled: field.disabled ?? false,
            required: {
              value: field.required ?? false,
              message: (currentLanguage == "ar" ? field.arLabel : field.enLabel) + " " + t("required_field")
            },
            shouldUnregister: true
          })
        }
      );
    case "ATTACHMENT_AREA":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilePondField,
        {
          control,
          formField: field,
          api: "/umbraco/surface/SuggestionsInquiries/Upload"
        }
      ) });
    case "SPAN":
      const id = formValues[field.linkedParentFieldId];
      const message = ((_b = field.messages) == null ? void 0 : _b[id]) || "";
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: t(message) } });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Unknown field type: ",
        field.controlType
      ] });
  }
};
const getFieldsToBeShown = (fieldsFlat, formValues) => {
  const shouldShowField = (field) => {
    if (field.arLabel === "المستندات الناقصة") return true;
    const { action, operator, conditions } = field.conditionalView;
    if (action === "hidden") {
      switch (operator) {
        case "or":
          return conditions.some(checkConditionalView);
        case "and":
          return conditions.every(checkConditionalView);
        default:
          throw new Error("Invalid operator");
      }
    }
  };
  const checkConditionalView = (condition) => {
    const linkedFieldId = condition.linkedFieldId;
    if (linkedFieldId === void 0)
      throw new Error("linkedFieldId is undefined, can't check");
    const linkedField = fieldsFlat.find((field) => field.id === linkedFieldId);
    if (!linkedField) {
      return false;
    }
    if (!shouldShowField(linkedField)) return false;
    if (Object.prototype.hasOwnProperty.call(formValues, linkedFieldId)) {
      const validatorValues = condition.validatorValues ?? [];
      const linkedFieldValue = formValues[linkedFieldId];
      if (Array.isArray(linkedFieldValue)) {
        return validatorValues.every(
          (value) => linkedFieldValue.includes(value)
        );
      }
      return validatorValues.includes(linkedFieldValue);
    }
    return false;
  };
  return fieldsFlat.map((field) => {
    if (field.conditionalView.conditions.length === 0) return field.id;
    if (field.conditionalView.action === "hidden") {
      if (shouldShowField(field)) return field.id;
    }
  }).filter((c) => c);
};
const BuildSection = ({
  section,
  fieldsToBeShown
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const {
    formState: { errors }
  } = useFormContext();
  const sectionFields = section.fields;
  const fieldsToBeRendered = sectionFields.filter((field) => fieldsToBeShown.includes(field.id));
  if (fieldsToBeRendered.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
    (section.arLabel || section.enLabel) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "title", style: { fontSize: "1.5rem" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "inline-block", marginLeft: "10px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RequestIcons, { requestLabel: section.arLabel }) }),
      currentLanguage == "ar" ? section.arLabel : section.enLabel
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: fieldsToBeRendered.map((field) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `col-lg-6 col-12 mb-3 has-validation ${field.gridSize ? field.gridSize : sectionFields.length === 1 ? "col-lg-12" : ""}`,
          children: [
            (field.arLabel || field.enLabel) && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: field.id, className: "p-1 form-label", children: [
              currentLanguage == "ar" ? field.arLabel : field.enLabel,
              ":",
              field.required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-danger mr-1", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicFormElement, { field }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              s,
              {
                errors,
                name: field.id,
                render: ({ message }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-danger mt-2", children: message })
              }
            )
          ]
        },
        field.id
      );
    }) })
  ] });
};
const FormBuilder = ({ formSections }) => {
  const fieldsFlat = reactExports.useMemo(
    () => formSections.map((section) => section.fields).flat(),
    [formSections]
  );
  const [fieldsToBeShown, setFieldsToBeShown] = reactExports.useState(
    fieldsFlat.map((field) => field.id)
  );
  const { watch, getValues, unregister, register } = useFormContext();
  const isInitialMount = reactExports.useRef(true);
  reactExports.useEffect(() => {
    const initialFields = (formValues) => {
      if (Object.keys(formValues).length === 0) return;
      const fieldsToBeShownInit = getFieldsToBeShown(
        fieldsFlat,
        formValues
      );
      if (JSON.stringify(fieldsToBeShown) !== JSON.stringify(fieldsToBeShownInit)) {
        setFieldsToBeShown(fieldsToBeShownInit);
      }
    };
    if (isInitialMount.current) {
      isInitialMount.current = false;
      initialFields(getValues());
    }
    const subscription = watch(initialFields);
    return () => subscription.unsubscribe();
  }, [fieldsFlat, fieldsToBeShown, getValues, register, unregister, watch]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: formSections.filter((section) => section.fields.length > 0).map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BuildSection, { section, fieldsToBeShown }) }, section.id)) });
};
export {
  FormBuilder,
  FormBuilder as default
};
