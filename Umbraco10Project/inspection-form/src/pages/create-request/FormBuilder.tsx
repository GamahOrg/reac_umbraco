import { Field } from "./InspectionModel.tsx";
import { getFieldsToBeShown } from "./FormHelpers.tsx";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { useEffect, useMemo, useRef, useState } from "react";
import { DynamicFormElement } from "./DynamicFormElement.tsx";
import { useTranslation } from "react-i18next";
import RequestIcons from "../../components/Request-Icons.tsx";

const BuildSection = ({
  section,
  fieldsToBeShown,
}: {
  section: Field;
  fieldsToBeShown: string[];
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const {
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  const sectionFields = useMemo(
    () =>
      section.fields
        .filter((subField) => subField.visibilityView.length === 0)
        .sort((f) => f.fieldOrder),
    [section.fields],
  );
  const fieldsToBeRendered = sectionFields
    // filter the fields that should be shown based on the fieldsToBeShown
    .filter(
      (field) =>
        ![
          "bf538fb6-d7f6-4dc3-873c-b5eda1380aa0",
          "3f6e6154-ab61-468b-9a5c-65a7adcb952c",
        ].includes(field.id),
    )
    .filter((field) => fieldsToBeShown.includes(field.id));
  if (fieldsToBeRendered.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="title" style={{ fontSize: "1.5rem" }}>
        <div style={{ display: "inline-block", marginLeft: "10px" }}>
          <RequestIcons requestLabel={section.arLabel} />
        </div>
        {currentLanguage == "ar" ? section.arLabel : section.enLabel}
      </p>
      <div className="row">
        {fieldsToBeRendered.map((field) => {
          return (
            <div
              key={field.id}
              className={`col-lg-6 col-12 mb-3 has-validation ${sectionFields.length === 1 ? "col-lg-12" : ""}`}
            >
              <label htmlFor={field.id} className={"p-1 form-label"}>
                {currentLanguage == "ar" ? field.arLabel : field.enLabel}:
                {field.required && <span className="text-danger mr-1">*</span>}
              </label>

              <DynamicFormElement field={field} />

              <ErrorMessage
                errors={errors}
                name={field.id}
                render={({ message }) => (
                  <div className="text-danger mt-2">{message}</div>
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const FormBuilder = ({ formSections }: { formSections: Field[] }) => {
  const fieldsFlat = useMemo(
    () =>
      formSections
        .map((section) => section.fields)
        .flat()
        .filter(
          (field) =>
            ![
              "bf538fb6-d7f6-4dc3-873c-b5eda1380aa0",
              "3f6e6154-ab61-468b-9a5c-65a7adcb952c",
            ].includes(field.id),
        ),
    [formSections],
  );

  // initialize the fieldsToBeShown with all the fields
  const [fieldsToBeShown, setFieldsToBeShown] = useState<string[]>(
    fieldsFlat.map((field) => field.id),
  );
  // watch the fields to be shown
  const { watch, getValues, unregister, register } = useFormContext(); // retrieve all hook methods
  const isInitialMount = useRef(true);
  useEffect(() => {
    const initialFields = (formValues: Record<string, string>) => {
      if (Object.keys(formValues).length === 0) return;
      // the function that gets the fields that should be shown based on the conditions
      const fieldsToBeShownInit = getFieldsToBeShown(
        fieldsFlat,
        formValues,
      ) as string[];

      // Check if the new fieldsToBeShownInit is different from the current state
      if (
        JSON.stringify(fieldsToBeShown) !== JSON.stringify(fieldsToBeShownInit)
      ) {
        setFieldsToBeShown(fieldsToBeShownInit);
      }
    };
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // wait for the form to be initialized
      initialFields(getValues());
    }
    const subscription = watch(initialFields);
    return () => subscription.unsubscribe();
  }, [fieldsFlat, fieldsToBeShown, getValues, register, unregister, watch]);
  return (
    <>
      {formSections
        .filter((section) => section.fields.length > 0)
        .sort((f) => f.fieldOrder)
        .map((section) => (
          <div key={section.id}>
            <BuildSection section={section} fieldsToBeShown={fieldsToBeShown} />
          </div>
        ))}
    </>
  );
};

export default FormBuilder;
