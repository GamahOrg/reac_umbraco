import { lazy, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InspectionModel } from "./InspectionModel.tsx";
import {
  ApiService,
  SubmissionFormRequest,
} from "../../backend/ApiService.tsx";
import { ComplaintIcon, ConfirmIcon } from "../../Icons.tsx";
import { useStateMachine } from "little-state-machine";
import { UpdateRequestNumber } from "../../Actions.tsx";
import { LoadingSpinner } from "../../components/LoadingSpinn.tsx";
import { useNavigate } from "react-router-dom";

const FormBuilder = lazy(() => import("./FormBuilder.tsx"));
import { useTranslation } from "react-i18next";
import Modal from "react-modal";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    justifyContent: "center",
  },
};
const CreateRequest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { actions } = useStateMachine({
    UpdateRequestNumber,
  });
  //
  // main inspection model
  const [inspectionModel, setInspectionModel] =
    useState<InspectionModel | null>(null);
  // get the inspection model from the window object on the first render
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setInspectionModel(window.inspectionModel as InspectionModel);
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, []);

  // initialize the form methods
  const methods = useForm({
    shouldUnregister: true,
  });
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [modalIsOpen, setIsOpen] = useState(false);

  const basePath =
    currentLanguage == "ar"
      ? "/media-center/complaints"
      : "/en/media-center/complaints";

  // get the sections that should be shown
  const sectionsShouldBeShown = useMemo(() => {
    const formSections = inspectionModel?.data.fields;
    if (!formSections) return [];

    return formSections
      .filter((section) => section.visibilityView.length === 0)
      .sort((s) => s.fieldOrder);
  }, [inspectionModel]);
  if (!inspectionModel) return <div>يجري تجهيز النموذج</div>;
  if (!sectionsShouldBeShown) return <div>لا توجد بيانات لعرضها</div>;
  const onSubmit = async (data: SubmissionFormRequest) => {
    try {
      setIsLoading(true);
      const response = await ApiService.postInspectionForm(data);
      actions.UpdateRequestNumber(response.data.data.id);
      navigate(basePath + "/request-created", {
        replace: true,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <LoadingSpinner loading={isLoading}>
      <div className="card">
        <div className="card-header p-4">
          <div className="row justify-content-center text-center">
            <div className="col-12 mt-4">
              <ComplaintIcon width={30} height={30} />
              <h3 className="title font-bold">{t("new_ticket")}</h3>
            </div>
          </div>
        </div>

        <div className="card-body p-4">
          <div className="row">
            <div className="col-xs-12 col-sm-6 mt-2">
              <span className="fw-bold">{t("full_name")}:</span>
              <span className=" mx-2">{inspectionModel.fullName}</span>
            </div>
            <div className="col-xs-12 col-sm-6 mt-2">
              <span className="fw-bold">{t("id_number")}:</span>

              <span className=" mx-2">{inspectionModel.idNumber}</span>
            </div>
          </div>

          <FormProvider {...methods}>
            <FormBuilder formSections={sectionsShouldBeShown} />
          </FormProvider>
        </div>

        <div className="card-footer">
          <button
            className="btn btn-primary d-block mx-auto my-2 w-40"
            onClick={methods.handleSubmit(openModal)}
          >
            {t("create_ticket")}
          </button>
          <Modal
            closeTimeoutMS={100}
            isOpen={modalIsOpen}
            className="modal modal-dialog-centered "
            style={customStyles}
            onRequestClose={closeModal}
            contentLabel="تأكيد إنشاء البلاغ"
          >
            <div
              className="modal-content"
              style={{
                maxWidth: 500,
                width: "90%",
                minWidth: 380,
              }}
            >
              <div className="modal-header">
                <div className="row" style={{ width: "100%" }}>
                  <div className={"col-11 d-flex align-items-center"}>
                    <div style={{ marginLeft: 8 }}>
                      <ConfirmIcon />
                    </div>
                    <h4 className="modal-title">تأكيد إنشاء البلاغ</h4>
                  </div>
                  <div className={"col-1 align-content-center"}>
                    <button
                      onClick={closeModal}
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <p>
                  سيتم إنشاء البلاغ بناءً على البيانات المدخلة ولا يمكن التعديل
                  بعد الإرسال و تتحمل المسؤولية الكاملة عن البيانات المدخلة .
                </p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => (onSubmit(methods.getValues()), closeModal())}
                  type="button"
                  className="btn btn-primary"
                >
                  إرسال
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="btn btn-secondary"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </LoadingSpinner>
  );
};

export default CreateRequest;
