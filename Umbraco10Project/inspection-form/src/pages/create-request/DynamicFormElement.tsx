import { Field2 } from "./InspectionModel";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import { isValidIBAN } from "ibantools";
import { FilePondField } from "../../components/FilepondComponent.tsx";
import { lazy } from "react";
import "react-day-picker/style.css";
import { DatePicker } from "../../components/DatePicker.tsx";
import { useTranslation } from "react-i18next";
import ReactSelect from "../../components/ReactSelect.tsx";

const MapSelector = lazy(() => import("../../components/MapSelector.tsx"));

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
          isDisabled={false}
          isSearchable={options.length > 5}
          isClearable={true}
        />
      );
    }
    // return (
    //   <select
    //     {...register(field.id, {
    //       required: {
    //         value: field.required,
    //         message:
    //           (currentLanguage == "ar" ? field.arLabel : field.enLabel) +
    //           " " +
    //           t("required_field"),
    //       },
    //       shouldUnregister: true,
    //     })}
    //     className="form-select"
    //   >
    //     {field.groupOfAnswers.answerGroupValues
    //       .filter((c) => {
    //         // if no linkedParentFieldId so return all values
    //         if (!field.linkedParentFieldId) return c;
    //         // in case for the city and area
    //         if (c.parentAnswerId === formValues[field.linkedParentFieldId])
    //           return c;
    //       })
    //       .map((option) => (
    //         <option value={option.id}>{option.arValue}</option>
    //       ))}
    //   </select>
    // );
    case "TEXT_BOX": {
      let type = "text";
      let template = undefined;
      let validate = undefined;

      if (field.arLabel.includes("البريد الإلكتروني")) {
        type = "email";
        template = {
          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: t("input_incorrect"),
        };
      }
      if (field.arLabel.includes("الايبان")) {
        validate = (value: string) => {
          if (field.required || value.length > 0)
            if (!isValidIBAN(value)) return t("input_incorrect");
          return true;
        };
      }

      return (
        <input
          type={type}
          className={classNames("form-control", HasError(errors, field.id))}
          {...register(field.id, {
            validate: validate,
            pattern: template,
            required: {
              value: field.required,
              message:
                (currentLanguage == "ar" ? field.arLabel : field.enLabel) +
                " " +
                t("required_field"),
            },
            shouldUnregister: true,
          })}
          placeholder={
            currentLanguage == "ar" ? field.arPlaceholder : field.enPlaceholder
          }
        />
      );
    }
    case "GPS": {
      return <MapSelector formField={field} control={control} />;
    }
    case "NUMERICAL": {
      // رقم التواصل مع المبلغ
      let pattern = {
        value: /^[0-9]*$/,
        message: t("numbers_only"),
      };
      let maxLength = undefined;
      let minLength = undefined;
      if (field.arLabel.includes("رقم التواصل مع المبلغ")) {
        // 10 digits
        // 05xxxxxxxx
        pattern = {
          // 05
          value: /^05[0-9]*$/,
          message: t("mobile_should_start_with_zero"),
        };
        maxLength = {
          value: 10,
          message: t("mobile_greater_than_ten"),
        };
        minLength = {
          value: 10,
          message: t("mobile_less_than_ten"),
        };
      }
      return (
        <input
          type="tel"
          className={classNames("form-control", HasError(errors, field.id))}
          {...register(field.id, {
            pattern,
            maxLength,
            minLength,
            required: {
              value: field.required,
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
      return (
        <textarea
          className={classNames("form-control", HasError(errors, field.id))}
          {...register(field.id, {
            required: {
              value: field.required,
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
    case "CALENDER":
      return (
        <div className={"grid"}>
          <DatePicker control={control} formField={field} />
        </div>
      );
    case "CHECKBOX":
      return (
        <input
          className="form-check-input"
          type="checkbox"
          {...register(field.id, {
            required: {
              value: field.required,
              message:
                (currentLanguage == "ar" ? field.arLabel : field.enLabel) +
                " " +
                t("required_field"),
            },
            shouldUnregister: true,
          })}
        />
      );
    // case "RADIO":
    //   if (!field.groupOfAnswers || !field.groupOfAnswers.answerGroupValues)
    //     return <div>No options available</div>;
    //   return (
    //     <div className="form-check">
    //       {field.groupOfAnswers.answerGroupValues.map((option) => (
    //         <div key={option.id}>
    //           <input
    //             type="radio"
    //             className="form-check-input"
    //             id={option.id}
    //             name={field.id}
    //             required={field.required}
    //           />
    //           <label className="form-check-label" htmlFor={option.id}>
    //             {option.arValue}
    //           </label>
    //         </div>
    //       ))}
    //     </div>
    //   );
    case "ATTACHMENT_AREA":
      return (
        <div>
          <FilePondField
            control={control}
            formField={field}
            api="/umbraco/surface/Inspection/Upload"
          />
        </div>
      );
    default:
      return <div>Unknown field type: {field.controlType}</div>;
  }
};
