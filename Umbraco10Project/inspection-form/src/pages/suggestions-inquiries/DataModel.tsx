export interface DataModel {
  errorEn: any;
  errorAr: any;
  success: boolean;
  data: ContactData;
  fullName: string;
  idNumber: string;
}

export interface ContactData {
  id: string;
  first_name: string;
  last_name: string;
  email1: string;
  national_id_c: string;
  phone_mobile: string;
}

export interface Field {
  id: string;
  gridSize?: string;
  controlType: string;
  multiple: any;
  linkedParentFieldId: any;
  groupOfAnswers: any;
  enPlaceholder: any;
  arPlaceholder: any;
  required: boolean | null;
  disabled: boolean | null;
  enLabel: string | null;
  arLabel: string | null;
  fields: Field2[];
  notes?: { [key: string]: string };
  messages?: { [key: string]: string };
  conditionalView: ConditionalView;
}

export interface ConditionalView {
  action: string;
  operator: string;
  conditions: any[];
}

export interface Validation {
  templates: string[];
  minLength: number;
  maxLength: number;
}

export interface Field2 {
  id: string;
  gridSize?: string;
  controlType: string;
  multiple?: any;
  linkedParentFieldId: any;
  groupOfAnswers?: GroupOfAnswers | null;
  enPlaceholder: any;
  arPlaceholder: any;
  required: boolean | null;
  disabled: boolean | null;
  enLabel: string | null;
  arLabel: string | null;
  max?: number | null;
  fields: any;
  validation?: Validation | null;
  conditionalView: ConditionalView2;
  notes?: { [key: string]: string };
  messages?: { [key: string]: string };
}

export interface ConditionalView2 {
  action: string;
  operator: string;
  conditions: Condition[];
}

export interface Condition {
  linkedFieldId?: string;
  conditionType?: string;
  validatorValues?: string[];
  enErrorMsg?: string | null;
  arErrorMsg?: string | null;
}

export interface GroupOfAnswers {
  id: string;
  enName: string;
  arName: string;
  maxValue: number;
  minValue: number;
  parentId: any;
  answerGroupValues: AnswerGroupValue[] | [];
  answerGroupValuesApi?: string | null;
}

export interface AnswerGroupValue {
  id: string;
  arValue: string;
  enValue: string;
  parentAnswerId?: any;
  parentAnswerNameAr?: any;
  parentAnswerNameEn?: any;
}
