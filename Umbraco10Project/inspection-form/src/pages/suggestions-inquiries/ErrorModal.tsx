import { useTranslation } from "react-i18next";
import Modal from "react-modal";

export const ErrorModal = ({
  header,
  body,
  customStyles,
  isOpen,
  closeModal,
}: {
  header?: {
    title?: string;
    icon?: React.ReactNode;
    withUpperCloseIcon: boolean;
  };
  body: {
    msg: string;
    icon?: React.ReactNode;
    style: object;
  };
  customStyles: object;
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      closeTimeoutMS={100}
      isOpen={isOpen}
      className="modal modal-dialog-centered "
      style={customStyles}
      onRequestClose={closeModal}
    >
      <div
        className="modal-content"
        style={{
          maxWidth: 500,
          width: "90%",
          minWidth: 380,
        }}
      >
        {header && (
          <div className="modal-header" style={{ borderBottom: "none" }}>
            <div className="row" style={{ width: "100%" }}>
              <div className="col-11 d-flex align-items-center">
                {header.icon && (
                  <div style={{ marginLeft: 8 }}>{header.icon}</div>
                )}
                {header.title && (
                  <h5 className="modal-title">{t(header.title)}</h5>
                )}
              </div>
              {header.withUpperCloseIcon && (
                <div className="col-1 align-content-center">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="modal-body" style={{ marginTop: -20 }}>
          {body.icon && (
            <div className="col-12 d-flex justify-content-center align-items-center">
              {body.icon}
            </div>
          )}

          <div className="col-12 d-flex flex-column align-items-center">
            <div style={body.style} className="text-center">
              <p>{t(body.msg)}</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
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
  );
};
