import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ar } from "react-day-picker/locale";
import { Field2 } from "../pages/create-request/InspectionModel.tsx";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export const DatePicker = ({
  formField,
  control,
}: {
  formField: Field2;
  control: any;
}) => {
  const defaultClassNames = getDefaultClassNames();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const renderDatePicker = ({
    field,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
  }) => {
    return (
      <DayPicker
        classNames={{
          selected: `${defaultClassNames.selected}`, // Change the background color of the selected day
          root: `${defaultClassNames.root}`, // Add a shadow to the root element
          chevron: `${defaultClassNames.chevron}`, // Change the color of the navigation chevrons
        }}
        locale={ar}
        style={{
          justifySelf: "center",
        }}
        captionLayout="dropdown"
        dir="rtl"
        mode="single"
        required={formField.required || undefined}
        numberOfMonths={1}
        timeZone=""
        onDayBlur={field.onBlur}
        onDayClick={(day) => {
          field.onChange(day.toLocaleDateString());
        }}
        // disable before 2020
        startMonth={new Date(2020, 0)}
        weekStartsOn={0}
      />
    );
  };
  return (
    <Controller
      name={formField.id}
      control={control}
      rules={{
        required: {
          value: formField.required,
          message:
            (currentLanguage == "ar" ? formField.arLabel : formField.enLabel) +
            " " +
            t("required_field"),
        },
        shouldUnregister: true,
      }}
      render={renderDatePicker}
    />
  );
};
