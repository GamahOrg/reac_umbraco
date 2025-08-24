import { lazy, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DataModel } from "./DataModel.tsx";
import {
  ApiService,
  SubmissionFormRequest,
} from "../../backend/ApiService.tsx";
import { LoadingSpinner } from "../../components/LoadingSpinn.tsx";
import { useNavigate } from "react-router-dom";

const FormBuilder = lazy(() => import("./FormBuilder.tsx"));
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import form from "./form.json";
import { getDropdownValues } from "../../services/dropdownService.tsx";
import { Field } from "./DataModel.tsx";
import { ErrorModal } from "./ErrorModal.tsx";
import { ExclamationCircleIcon } from "../../Icons.tsx";
import { useStateMachine } from "little-state-machine";
import { UpdateRequestNumber } from "../../Actions.tsx";

Modal.setAppElement("#root");

const SuggestionsInquiriesCreateRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const { actions } = useStateMachine({
    UpdateRequestNumber,
  });
  // Open Error Modal when `errorMsg` changes
  useEffect(() => {
    if (errorMsg) {
      setIsErrorModalOpen(true);
    }
  }, [errorMsg]);

  const closeErrorModal = () => setIsErrorModalOpen(false);

  // main data model
  const [modelData, setModelData] = useState<DataModel | null>(null);

  // initialize the form methods
  const methods = useForm({
    shouldUnregister: true,
  });

  const { reset, watch } = methods;

  const [updatedSections, setSections] = useState<Field[]>(form?.sections);

  // get the data model from the window object on the first render
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = window.modelData as DataModel;

    setModelData(data);
    setIsLoading(false);

    // Update the form values after modelData is set
    if (data) {
      reset({
        full_name: `${data.data.first_name} ${data.data.last_name}`,
        ...data.data,
        national_id_c: data.idNumber,
      });
    }

    // Set fields dropdown values
    const fetchDropdownValues = async () => {
      try {
        if (form?.sections) {
          setIsLoading(true);
          const updatedSections = await Promise.all(
            form.sections.map(async (section) => ({
              ...section,
              fields: await getDropdownValues(section.fields),
            })),
          );
          setSections(updatedSections);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching dropdown values:", error);
      }
    };

    fetchDropdownValues();
  }, [reset]);

  // Watch all fields
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const basePath =
    currentLanguage == "ar"
      ? "/media-center/suggestions-inquiries"
      : "/en/media-center/suggestions-inquiries";

  // get the sections that should be shown
  if (!modelData) return <div>يجري تجهيز النموذج</div>;

  if (!updatedSections) return <div>لا توجد بيانات لعرضها</div>;

  const onSubmit = async (data: SubmissionFormRequest) => {
    try {
      setErrorMsg(null);

      const requestPayload = {
        contact: { ...modelData.data },
        caseData: { ...data },
        noteIds: data.attachments ?? [],
      };

      if (!modelData.data.id)
        requestPayload.contact = { ...modelData.data, ...data };
      requestPayload.contact.national_id_c = modelData.idNumber;

      setIsLoading(true);
      const caseResponse = await ApiService.postSuggestionsInquiriesForm(
        "/SuggestionsInquiries/Submit",
        requestPayload,
      );
      const caseDetailsResponse = await ApiService.getCaseNumber(
        caseResponse.data.caseId,
      );
      actions.UpdateRequestNumber(caseDetailsResponse.data.data.case_number);
      navigate(basePath + "/request-created", {
        replace: true,
      });
    } catch (e) {
      setErrorMsg("suggestions_and_inquiries.submission_error");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Watch form values
  const formValues = watch();
  // Define condition to hide the submit button
  const caseShowSubmitFields = ["mulkia", "Wafi", "Tasfiah", "Indicators"];
  const shouldShowSubmit =
    caseShowSubmitFields.includes(formValues.service_type_c) ||
    formValues.requestclassification_c === "complaint_c"; // Example condition

  return (
    <LoadingSpinner loading={isLoading}>
      <div className="card">
        <div className="card-header p-4">
          <div className="row justify-content-center text-center">
            <div className="col-12 mt-4 mb-2">
              <h3 className="title font-bold">
                {t("suggestions_and_inquiries.title")}
              </h3>
              <span className="mx-4">
                {t("suggestions_and_inquiries.description")}
              </span>
            </div>
          </div>
        </div>

        <div className="card-body p-4">
          <FormProvider {...methods}>
            <FormBuilder formSections={updatedSections} />
          </FormProvider>
        </div>

        <div className="card-footer">
          {shouldShowSubmit && ( // Hide button conditionally
            <button
              className="btn btn-primary d-block mx-auto my-2 w-40"
              onClick={() => methods.handleSubmit((data) => onSubmit(data))()}
            >
              {t("send")}
            </button>
          )}
        </div>
      </div>
      <ErrorModal
        body={{
          msg: errorMsg || "suggestions_and_inquiries.submission_error",
          style: { fontSize: "16px", marginTop: "20px" },
          icon: <ExclamationCircleIcon />,
        }}
        header={{
          withUpperCloseIcon: true,
        }}
        customStyles={{
          content: {
            justifyContent: "center",
          },
        }}
        isOpen={isErrorModalOpen}
        closeModal={closeErrorModal}
      />
    </LoadingSpinner>
  );
};

export default SuggestionsInquiriesCreateRequest;
