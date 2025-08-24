import { Field2 } from "./DataModel.tsx";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import { isValidIBAN } from "ibantools";
import { FilePondField } from "../../components/FilepondComponent.tsx";
import { useEffect, useState } from "react";
import "react-day-picker/style.css";
// import { DatePicker } from "../../components/DatePicker.tsx";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../components/ReactSelect.tsx";
import { getValidation } from "../../validation/validationUtils.tsx";

// const MapSelector = lazy(() => import("../../components/MapSelector.tsx"));

const HasError = (errors: any, fieldId: string) => {
  return errors[fieldId] ? "is-invalid" : "";
};
export const DynamicFormElement = ({ field }: { field: Field2 }) => {
  const {
    watch,
    control,
    register,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const formValues = watch();
  const currentLanguage = i18n.language;

  const [isEmailInitiallyDisabled, setIsEmailInitiallyDisabled] =
    useState(false);
  const [isPhoneNumberInitiallyDisabled, setIsPhoneNumberInitiallyDisabled] =
    useState(false);

  // Capture the initial value and determine if the field should be disabled
  useEffect(() => {
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
        return <div>لا توجد خيارات متاحة</div>;

      const options = field.groupOfAnswers.answerGroupValues
        .filter((c) => {
          // if no linkedParentFieldId so return all values
          if (!field.linkedParentFieldId) return c;
          // in case for the city and area
          if (
            formValues[field.linkedParentFieldId] &&
            c.parentAnswerId === formValues[field.linkedParentFieldId]
          )
            return c;
        })
        .sort((a, b) => {
          // if there is parentAnswerId then sort by the order
          if (a.parentAnswerId) return a.arValue.localeCompare(b.arValue);
          // else do not sort
          return 0;
        })
        .map((option) => ({ value: option.id, label: option.arValue }));

      return (
        <ReactSelect
          formField={field}
          isLoading={options.length === 0}
          options={options}
          isDisabled={field.disabled ?? false}
          isSearchable={options.length > 5}
          isClearable={true}
        />
      );
    }
    case "TEXT_BOX": {
      let type =
        field.arLabel && field.arLabel.includes("البريد الإلكتروني")
          ? "email"
          : "text";
      let validate = undefined;

      if (field.arLabel && field.arLabel.includes("الايبان")) {
        validate = (value: string) => {
          if (field.required || value.length > 0)
            if (!isValidIBAN(value)) return t("input_incorrect");
          return true;
        };
      }

      validate = field.validation ? getValidation(field.validation) : validate;

      const id = formValues[field.linkedParentFieldId];
      const message = field.notes?.[id] || "";

      return (
        <>
          {field.notes && (
            <p
              className="form-text text-muted small text-secondary"
              dangerouslySetInnerHTML={{ __html: t(message) }}
            ></p>
          )}

          <input
            type={type}
            className={classNames("form-control", HasError(errors, field.id))}
            {...register(field.id, {
              validate,
              disabled:
                field.id == "email1"
                  ? isEmailInitiallyDisabled
                  : (field.disabled ?? false),
              required: {
                value: field.required ?? false,
                message: `${
                  currentLanguage === "ar" ? field.arLabel : field.enLabel
                } ${t("required_field")}`,
              },
              shouldUnregister: true,
            })}
            placeholder={
              currentLanguage === "ar"
                ? field.arPlaceholder
                : field.enPlaceholder
            }
          />
        </>
      );
    }
    // case "GPS": {
    //   return <MapSelector formField={field} control={control} />;
    // }
    case "NUMERICAL": {
      const validate = field.validation
        ? getValidation(field.validation)
        : undefined;

      return (
        <input
          type="tel"
          className={classNames("form-control", HasError(errors, field.id))}
          {...register(field.id, {
            validate,
            disabled:
              field.id == "phone_mobile"
                ? isPhoneNumberInitiallyDisabled
                : (field.disabled ?? false),
            required: {
              value: field.required ?? false,
              message:
                (currentLanguage == "ar" ? field.arLabel : field.enLabel) +
                " " +
                t("required_field"),
            },
            shouldUnregister: true,
          })}
          placeholder={field.arPlaceholder}
        />
      );
    }
    case "TEXTAREA":
      let validate = field.validation
        ? getValidation(field.validation)
        : undefined;
      return (
        <textarea
          className={classNames("form-control", HasError(errors, field.id))}
          {...register(field.id, {
            validate,
            disabled: field.disabled ?? false,
            required: {
              value: field.required ?? false,
              message:
                (currentLanguage == "ar" ? field.arLabel : field.enLabel) +
                " " +
                t("required_field"),
            },
            shouldUnregister: true,
          })}
          placeholder={field.arPlaceholder}
        />
      );
    // case "CALENDER":
    //   return (
    //     <div className={"grid"}>
    //       <DatePicker control={control} formField={field} />
    //     </div>
    //   );
    case "CHECKBOX":
      return (
        <input
          className="form-check-input"
          type="checkbox"
          {...register(field.id, {
            disabled: field.disabled ?? false,
            required: {
              value: field.required ?? false,
              message:
                (currentLanguage == "ar" ? field.arLabel : field.enLabel) +
                " " +
                t("required_field"),
            },
            shouldUnregister: true,
          })}
        />
      );
    case "ATTACHMENT_AREA":
      return (
        <div>
          <FilePondField
            control={control}
            formField={field}
            api="/umbraco/surface/SuggestionsInquiries/Upload"
          />
        </div>
      );
    case "SPAN":
      const id = formValues[field.linkedParentFieldId];
      const message = field.messages?.[id] || "";
      return <span dangerouslySetInnerHTML={{ __html: t(message) }}></span>;
    default:
      return <div>Unknown field type: {field.controlType}</div>;
  }
};
