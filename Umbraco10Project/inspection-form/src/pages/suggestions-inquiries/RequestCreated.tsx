import { DoubleCheckIcon } from "../../Icons.tsx";
import { useTranslation } from "react-i18next";
import { useStateMachine } from "little-state-machine";
import { UpdateRequestNumber } from "../../Actions.tsx";

export const SuggestionInquiriesRequestCreated = ({
  successMsg,
  successDesc,
}: {
  successMsg: string;
  successDesc: string;
}) => {
  const { t } = useTranslation();
  const { state } = useStateMachine({
    UpdateRequestNumber,
  });
  return (
    <div className="card justify-content-center text-center">
      {/* <div className="card-header">
                <ComplaintIcon height={30} width={30}/>
                <span className={"text-3xl font-bold"} style={{lineHeight: "normal"}}>
                    {t(successMsg)}
                </span>

            </div> */}
      <div className="card-body">
        <p>
          <DoubleCheckIcon height={30} width={30} />
          <span
            className={"px-2 text-3xl font-bold title text-primary"}
            style={{ lineHeight: "normal" }}
          >
            {t(successMsg)}
          </span>
        </p>

        <p>{t(successDesc)}</p>
        <p>
          {t("ticket_number_general")}:
          <span className={"badge bg-primary mx-2"}>
            {state.newRequestNumber}
          </span>
        </p>
      </div>
    </div>
  );
};
