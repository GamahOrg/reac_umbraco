import axios from "axios";

const BASE_URL =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.BASE_URL;
if (!BASE_URL) throw new Error("BASE_URL is not defined, Please define it");

const httpClient = axios.create({
  baseURL: BASE_URL + "/umbraco/surface",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiService = {
  async postInspectionForm(data: SubmissionFormRequest) {
    return httpClient.post<SubmissionFormResponse>("/Inspection/Submit", data);
  },
  async listCreatedRequests() {
    return httpClient.get<ListCreatedRequestsResponse>(
      "/Inspection/GetRequests",
    );
  },
  async getRequestDetails(id: string) {
    return httpClient.get<ReportInspection>(
      `/Inspection/ReportDetails?reportId=${id}`,
    );
  },
  async updateRequest(data: SubmissionFormRequest, requestId: string) {
    return httpClient.post<SubmissionFormResponse>(
      "/Inspection/Update?reportId=" + requestId,
      data,
    );
  },
  async getRequest(api: string) {
    return httpClient.get<Response>(api);
  },
  async postRequest(api: string, data: any) {
    return httpClient.post<SubmissionFormResponse>(api, data);
  },
  async postSuggestionsInquiriesForm(api: string, data: any) {
    return httpClient.post<SuggestionsInquiriesSubmitResponse>(api, data);
  },
  async getCaseNumber(id: string) {
    return httpClient.get<CaseNumber>(
      `/SuggestionsInquiries/GetCaseNumber?caseId=${id}`,
    );
  },
};

export interface Response {
  errorEn: null | string;
  errorAr: null | string;
  success: boolean;
  data: any;
}
export interface SubmissionFormResponse {
  errorEn: null | string;
  errorAr: null | string;
  success: boolean;
  data: {
    id: string;
    eventNo: string;
  };
}

export interface SubmissionFormRequest {
  [key: string]: string;
}

export interface ListCreatedRequestsResponse {
  requests: Request[];
  totalCount: number;
}

export interface Request {
  id: number;
  typeName: string;
  activityName: string;
  formName: string;
  statusName: string;
  reporterName: string;
  assignedUnitName: string;
  assignedSubUnitName: string;
  assignedRoleName: string;
  reportedDate: string;
  lastUpdateDate: string;
  isEditable: boolean;
  isDeletable: boolean;
  isDue: boolean;
  eventNo: string;
}

export type ReportInspection = {
  id: number;
  statusName: string;
  createdDate: string;
  sections: Section[];
  history: History[];
};

export type Section = {
  englishLabel: string;
  arabicLabel: string;
  fields: Field[];
};

export type Field = {
  fieldId: string;
  englishLabel: string;
  arabicLabel: string;
  fieldType: FieldType;
  values: string[];
  labels: Label[];
};

export type FieldType =
  | "TEXT_BOX"
  | "NUMERICAL"
  | "GPS"
  | "DROPDOWN"
  | "TEXTAREA"
  | "ATTACHMENT_AREA";

export type Label = {
  id: string;
  enValue: string;
  arValue: string;
  answerGroupId: string;
  weight: string;
  parentAnswerId: string | null;
  parentAnswerNameAr: string | null;
  parentAnswerNameEn: string | null;
};

export type History = {
  actionType: string;
  actionDate: string;
};

export type CaseNumber = {
  data: {
    case_number: string;
  };
};

export type SuggestionsInquiriesSubmitResponse = {
  contactId: string;
  caseId: string;
};
