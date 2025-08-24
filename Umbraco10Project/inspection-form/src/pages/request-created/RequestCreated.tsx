import { SecurityCheckIcon } from "../../Icons.tsx";
import { useStateMachine } from "little-state-machine";
import { UpdateRequestNumber } from "../../Actions.tsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const RequestCreated = () => {
  const { actions, state } = useStateMachine({
    UpdateRequestNumber,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const basePath =
    currentLanguage == "ar"
      ? "/media-center/complaints"
      : "/en/media-center/complaints";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const goBackHomepage = () => {
    actions.UpdateRequestNumber(undefined);
    navigate(basePath + "/");
  };

  return (
    <div className="card justify-content-center text-center">
      <div className="card-header">
        <SecurityCheckIcon height={30} width={30} />
        <span className={"text-3xl font-bold"} style={{ lineHeight: "normal" }}>
          {t("successfully_submitted")}
        </span>
      </div>
      <div className="card-body">
        <p>
          {t("ticket_number")}:
          <span className={"badge bg-primary mx-2"}>
            {state.newRequestNumber}
          </span>
        </p>

        <p>{t("successfully_submitted_desc")}</p>
        <button className={"btn btn-primary"} onClick={goBackHomepage}>
          {t("back_to_homepage")}
        </button>
      </div>
    </div>
  );
};
