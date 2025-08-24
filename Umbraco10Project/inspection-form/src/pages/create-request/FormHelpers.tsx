import { Condition, Field2 } from "./InspectionModel.tsx";

export const getFieldsToBeShown = (
  fieldsFlat: Field2[],
  formValues: Record<string, string | string[]>,
) => {
  const shouldShowField = (field: Field2) => {
    // this is used in edit mode, to show the field if it's hidden
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

  // true => show
  // false => hide
  const checkConditionalView = (condition: Condition) => {
    const linkedFieldId = condition.linkedFieldId;
    if (linkedFieldId === undefined)
      throw new Error("linkedFieldId is undefined, can't check");
    // find the field that has the linkedFieldId
    const linkedField = fieldsFlat.find((field) => field.id === linkedFieldId);
    if (!linkedField) {
      return false;
    }

    // check if the linkedField is in the formValues, but it should be hidden then we should hide it
    if (!shouldShowField(linkedField)) return false;

    // get it from fieldsFlat
    if (Object.prototype.hasOwnProperty.call(formValues, linkedFieldId)) {
      const validatorValue = condition.validatorValue;
      const linkedFieldValue = formValues[linkedFieldId];
      // handle the case when the linkedField is an array
      if (Array.isArray(linkedFieldValue)) {
        return linkedFieldValue.includes(validatorValue as string);
      }

      return linkedFieldValue === validatorValue;
    }

    // if it's not in the watchFields, then it's not shown yet and we should show it
    return false;
  };

  return fieldsFlat
    .map((field) => {
      // this is for the fields that don't have conditional view, so we always show them
      if (field.conditionalView.conditions.length === 0) return field.id;

      // if the action is hidden, then we should hide the field if any of the conditions are met
      if (field.conditionalView.action === "hidden")
        if (shouldShowField(field)) return field.id; // return undefined to filter it out
    })
    .filter((c) => c);
};
