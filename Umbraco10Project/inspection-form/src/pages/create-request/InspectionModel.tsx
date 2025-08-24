export interface InspectionModel {
  errorEn: any;
  errorAr: any;
  success: boolean;
  data: Data;
  fullName: string;
  idNumber: string;
}

export interface Data {
  fields: Field[];
}

export interface Field {
  readinessIndicator: any;
  controlType: string;
  multiple: any;
  representation: any;
  enableOther: any;
  otherScore: any;
  linkedParentFieldId: any;
  linkedChildrenIds: any;
  groupOfAnswers: any;
  violationId: any;
  enPlaceholder: any;
  arPlaceholder: any;
  required: any;
  disabled: any;
  hasAttachments: any;
  hasNotes: any;
  responsibleUnit: any;
  severityLevel: any;
  id: string;
  templateQuestionId: any;
  enLabel: string;
  arLabel: string;
  fieldOrder: number;
  sectionId: any;
  conditionalView: ConditionalView;
  visibilityView: number[];
  locationTypesVisibility: any[];
  assetTypesVisibility: any[];
  instructionsPrimary: any;
  instructionsSecondary: any;
  enableFlatAnswer: boolean;
  fields: Field2[];
}

export interface ConditionalView {
  action: string;
  operator: string;
  conditions: any[];
}

export interface Field2 {
  readinessIndicator: any;
  controlType: string;
  multiple?: boolean;
  representation?: string;
  enableOther?: boolean;
  otherScore: any;
  linkedParentFieldId: any;
  linkedChildrenIds?: any[];
  groupOfAnswers?: GroupOfAnswers;
  violationId: any;
  enPlaceholder: any;
  arPlaceholder: any;
  required: boolean;
  disabled: boolean;
  hasAttachments: boolean;
  hasNotes: boolean;
  responsibleUnit: any;
  severityLevel: any;
  id: string;
  templateQuestionId?: string;
  enLabel: string;
  arLabel: string;
  fieldOrder: number;
  sectionId: string;
  conditionalView: ConditionalView2;
  visibilityView: number[];
  locationTypesVisibility: any[];
  assetTypesVisibility: any[];
  instructionsPrimary: string;
  instructionsSecondary: string;
  enableFlatAnswer: boolean;
  fields: any;
}

export interface GroupOfAnswers {
  id: string;
  enName: string;
  arName: string;
  isSystem: boolean;
  isAvailableForAllUnits: boolean;
  status: number;
  isDeleted: number;
  maxValue: number;
  minValue: number;
  parentId: any;
  answerGroupValues: AnswerGroupValue[];
  answerGroupValuesCount: number;
  canEdit: boolean;
  unitIds: any[];
}

export interface AnswerGroupValue {
  id: string;
  enValue: string;
  arValue: string;
  answerGroupId: string;
  weight: number;
  parentAnswerId: any;
  parentAnswerNameAr: any;
  parentAnswerNameEn: any;
}

export interface ConditionalView2 {
  action: string;
  operator: string;
  conditions: Condition[];
}

export interface Condition {
  linkedFieldId?: string;
  conditionType?: string;
  validatorValue?: string;
  enErrorMsg?: string;
  arErrorMsg?: string;
}
