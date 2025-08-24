import {
  ApiService,
  Field,
  Section,
  SubmissionFormRequest,
} from "../../backend/ApiService.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FilePondField,
  formFieldType,
} from "../../components/FilepondComponent.tsx";
import { ErrorMessage } from "@hookform/error-message";
import { Field2 } from "../create-request/InspectionModel.tsx";
import { useTranslation } from "react-i18next";
import { getFieldsToBeShown } from "../create-request/FormHelpers.tsx";

function ShowRequestedFiles({
  requestedFiles,
  setIsLoading,
}: {
  requestedFiles: Field[];
  setIsLoading: (value: boolean) => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { state } = useLocation();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onSubmit = async (data: SubmissionFormRequest) => {
    try {
      setIsLoading(true);
      await ApiService.updateRequest(data, state.requestID);
      navigate(0);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {requestedFiles.map((file, index) => (
        <div className="row mb-2">
          <div className="col-sm-3">
            <strong>{file.arabicLabel}:</strong>
          </div>
          <div className="col-sm-9">
            <div className="row mb-2" key={index}>
              <div className="col-sm-9">
                <FilePondField
                  control={control}
                  formField={
                    {
                      id: file.fieldId,
                      disabled: false,
                      required: true,
                      arLabel: file.arabicLabel,
                    } as formFieldType
                  }
                />
                <ErrorMessage
                  errors={errors}
                  name={file.fieldId}
                  render={({ message }) => (
                    <div className="text-danger mt-2">{message}</div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        className="btn btn-primary"
        onClick={handleSubmit(onSubmit, () => {})}
      >
        {t("upload_required_files")}
      </button>
    </>
  );
}

// adapter to Field2
const adapter = (field: Field): Field2 => {
  return {
    ...field,
    id: field.fieldId,
    arLabel: field.arabicLabel,
    enLabel: field.englishLabel,
  } as unknown as Field2;
};
const RequestedFilesSection = ({
  attachments,
  requestedFilesSection,
  setIsLoading,
}: {
  attachments: Section;
  requestedFilesSection: Section;
  setIsLoading: (value: boolean) => void;
}) => {
  const requestFilesField = requestedFilesSection?.fields.find(
    (c) => c.arabicLabel === "المستندات الناقصة",
  );
  if (!requestFilesField) return null;
  const allFields: Field2[] = [...attachments.fields.map(adapter)];
  allFields.push(adapter(requestFilesField));

  const fieldsToBeShown = getFieldsToBeShown(allFields, {
    [requestFilesField.fieldId]: requestFilesField.values,
  });

  return (
    fieldsToBeShown.length > 0 && (
      <ShowRequestedFiles
        requestedFiles={attachments.fields.filter((c) => {
          return fieldsToBeShown.includes(c.fieldId);
        })}
        setIsLoading={setIsLoading}
      />
    )
  );
};

export default RequestedFilesSection;
