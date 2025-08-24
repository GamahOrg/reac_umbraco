import Select, { OptionsOrGroups } from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import { Field2 } from "../pages/create-request/InspectionModel.tsx";
import { Field2 as SIField2 } from "../pages/suggestions-inquiries/DataModel.tsx";

const ReactSelect = ({
  formField,
  options,
  isClearable,
  isSearchable,
  isLoading,
}: {
  formField: Field2 | SIField2;
  options: { value: string; label: string }[];
  isDisabled: boolean;
  isSearchable: boolean;
  isClearable: boolean;
  isLoading: boolean;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  const error = errors[formField.id] ?? null;

  return (
    <Controller
      name={formField.id}
      control={control}
      rules={{
        required: {
          value: formField.required ?? false,
          message: formField.arLabel + " خانة مطلوبة",
        },
        shouldUnregister: true,
      }}
      render={({ field }) => (
        <>
          <Select
            tabIndex={0}
            isLoading={isLoading}
            onFocus={field.onBlur}
            ref={field.ref}
            styles={{
              control: (baseStyles) => {
                return {
                  ...baseStyles,
                  borderColor: error ? "red" : "#dee2e7",
                  "&:hover": {
                    borderColor: error ? "red" : "#ced4da",
                  },
                };
              },
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#488354",
                primary75: "#619b6d", // 75% lighter
                primary50: "#81b191", // 50% lighter
                primary25: "#c9e1cd", // 25% lighter
                danger: "#dc3545", // Bootstrap danger red
                dangerLight: "#f8d7da", // Bootstrap light danger
                neutral0: "#ffffff", // White
                neutral5: "#f2f2f2", // Light gray (5% black)
                neutral10: "#e6e6e6", // Light gray (10% black)
                neutral20: "#cccccc", // Light gray (20% black)
                neutral30: "#b3b3b3", // Gray (30% black)
                neutral40: "#999999", // Gray (40% black)
                neutral50: "#808080", // Gray (50% black)
                neutral60: "#666666", // Dark gray (60% black)
                neutral70: "#4d4d4d", // Darker gray (70% black)
                neutral80: "#333333", // Very dark gray (80% black)
                neutral90: "#1a1a1a", // Near black (90% black)
              },
            })}
            onBlur={field.onBlur}
            onChange={(option) => field.onChange(option?.value)}
            className="basic-single"
            classNamePrefix="select"
            isDisabled={field.disabled || isLoading}
            required={formField.required ?? false}
            value={options.find((option) => option.value === field.value)}
            isClearable={isClearable}
            isRtl={true}
            isSearchable={isSearchable}
            name={formField.id}
            placeholder={"إختر من القائمة ..."}
            noOptionsMessage={() => "لا توجد نتائج"}
            options={options as OptionsOrGroups}
          />
        </>
      )}
    />
  );
};

export default ReactSelect;
