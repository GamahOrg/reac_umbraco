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
      const validatorValue = condition.validatorValue;
      const linkedFieldValue = formValues[linkedFieldId];
      if (Array.isArray(linkedFieldValue)) {
        return linkedFieldValue.includes(validatorValue);
      }
      return linkedFieldValue === validatorValue;
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
export {
  getFieldsToBeShown as g
};
