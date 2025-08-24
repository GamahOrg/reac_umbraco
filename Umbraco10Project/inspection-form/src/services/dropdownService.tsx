import { Field2 } from "../pages/suggestions-inquiries/DataModel";
import { ApiService } from "../backend/ApiService.tsx";

export const getDropdownValues = async (
  formSections: Field2[],
): Promise<Field2[]> => {
  try {
    const promises = formSections
      .filter(
        (field) =>
          field.controlType === "DROPDOWN" &&
          field.groupOfAnswers?.answerGroupValuesApi,
      )
      .map(async (field) => {
        await ApiService.getRequest(field.groupOfAnswers!.answerGroupValuesApi!)
          .then((response) => {
            field.groupOfAnswers!.answerGroupValues = response.data.data;
          })
          .catch(() => {
            field.groupOfAnswers!.answerGroupValues = null;
          });
      });

    // Wait for all promises to resolve
    await Promise.all(promises);
    return formSections;
  } catch (error) {
    console.error("Error fetching dropdown values:", error);
  }
};
