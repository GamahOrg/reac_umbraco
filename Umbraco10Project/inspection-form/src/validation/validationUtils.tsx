import { Validation } from "../pages/suggestions-inquiries/DataModel";
import validationTemplates from "./validationTemplates.json";
import { useTranslation } from "react-i18next";

type ValidationTemplateKeys = keyof typeof validationTemplates;

type ValidationRule = {
  value: RegExp;
  message: string;
};

/**
 * Dynamically generates validation rules based on template keys and parameters.
 * @param templateKeys - The keys to retrieve templates from validationTemplates.
 * @param min - The minimum value for the validation.
 * @param max - The maximum value for the validation.
 * @returns An array of validation rules with regex and messages.
 */
const prepareValidation = (
  templateKeys: ValidationTemplateKeys | ValidationTemplateKeys[],
  min: number | null,
  max: number | null,
): ValidationRule[] => {
  const { t } = useTranslation();

  // Ensure templateKeys is always an array
  const templates = Array.isArray(templateKeys) ? templateKeys : [templateKeys];

  // Generate validation rules for each template
  return templates.map((templateKey) => {
    const template = validationTemplates[templateKey];
    let regex = template.template;
    let param = {};

    if (min && max) {
      regex = regex
        .replace("min", min.toString())
        .replace("max", max.toString());
      param = { min, max };
    }

    const message = t(template.message, param);

    return {
      value: new RegExp(regex),
      message: message,
    };
  });
};

export const getValidation = (validationObj: Validation) => {
  const validations = prepareValidation(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    validationObj.templates,
    validationObj.minLength,
    validationObj.maxLength,
  );

  return Object.fromEntries(
    validations.map(({ value, message }) => [
      message,
      (x: string) => new RegExp(value).test(x) || message,
    ]),
  );
};
