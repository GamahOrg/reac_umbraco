import {
  DashboardSquareAddIcon,
  RightToLeftListNumberIcon,
} from "../../Icons.tsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const NavigationPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const basePath =
    currentLanguage == "ar"
      ? "/media-center/complaints"
      : "/en/media-center/complaints";
  return (
    <div>
      <div style={{ padding: "0 12px" }}>
        <p className="title h5">{t("complaints_service_title")}</p>
        <p className="lead">{t("complaints_service_desc")}</p>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-12 row-cols-lg-12 g-4 justify-content-center w-100 mx-auto">
        <div className="col">
          <div className={"card"}>
            <div className="card-body">
              <div className="row">
                <div className="col-auto justify-content-center">
                  <DashboardSquareAddIcon width={30} height={30} />
                </div>
                <div className="col">
                  <span className="title">{t("complaints_new_ticket")}</span>
                  <p className="content">{t("complaints_new_ticket_desc")}</p>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    // actions.UpdatePageState(PAGES.createRequest);
                    navigate(basePath + "/create-request");
                  }}
                >
                  {t("new_ticket")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className={"card"}>
            <div className="card-body">
              <div className="row">
                <div className="col-auto justify-content-center">
                  <RightToLeftListNumberIcon width={30} height={30} />
                </div>
                <div className="col">
                  <span className="title">
                    {t("complaints_previous_tickets")}
                  </span>
                  <p className="content">
                    {t("complaints_previous_tickets_desc")}
                  </p>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    // actions.UpdatePageState(PAGES.createRequest);
                    navigate(basePath + "/review-requests");
                  }}
                >
                  {t("previous_tickets")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
