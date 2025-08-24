import { ApiService } from "../../backend/ApiService.tsx";
import { useEffect, useState } from "react";
import ReblDataTable from "../../components/ReblDataTable.tsx";
import { TableColumn } from "react-data-table-component/dist/DataTable/types";
import { Folder02Icon } from "../../Icons.tsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface CreatedRequests {
  id: string;
  created_at: string;
  last_update: string;
  status: string;
}

const ReviewCreatedRequests = () => {
  const [reports, setReports] = useState<CreatedRequests[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const basePath =
    currentLanguage == "ar"
      ? "/media-center/complaints"
      : "/en/media-center/complaints";

  useEffect(() => {
    ApiService.listCreatedRequests()
      .then((response) => {
        setReports(
          response.data.requests.map((r) => ({
            id: r.id.toString(),
            created_at: r.reportedDate,
            last_update: r.lastUpdateDate,
            status: r.statusName,
          })),
        );
      })
      .finally(() => {
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  // function to get the color of the status badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case "مفتوحة":
        return "bg-primary";
      case "مغلقة":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };
  const columns: TableColumn<CreatedRequests>[] = [
    {
      cell: () => (
        <Folder02Icon
          style={{ fill: "#43a047", width: 50, height: 50 }}
          width={70}
          height={70}
        />
      ),
      width: "56px", // custom width for icon button
      style: {
        borderBottom: "1px solid #FFFFFF",
        marginBottom: "-1px",
      },
    },
    {
      name: t("ticket_number"),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      selector: (row: CreatedRequests) => (
        <h6 className={"m-0"}>
          <span className={"badge text-bg-light"}>{row.id}</span>
        </h6>
      ),
      sortable: true,
      style: {
        color: "#202124",
        fontSize: "14px",
        fontWeight: 500,
      },
    },
    {
      name: t("created_at"),
      cell: (row: CreatedRequests) =>
        new Date(row.created_at).toLocaleDateString(),
      sortable: true,
      style: {
        color: "rgba(0,0,0,.54)",
        minWidth: 200,
        textAlign: "center",
      },
    },
    {
      name: t("last_update"),
      cell: (row: CreatedRequests) =>
        new Date(row.last_update).toLocaleDateString(),
      sortable: true,
      style: {
        color: "rgba(0,0,0,.54)",
        minWidth: 200,
        textAlign: "center",
      },
    },
    {
      name: t("status"),
      cell: (row: CreatedRequests) => (
        <h6 className={"m-0"}>
          <span className={`badge ${getStatusColor(row.status)}`}>
            {row.status}
          </span>
        </h6>
      ),
      sortable: true,
      style: {
        color: "rgba(0,0,0,.54)",
      },
    },
  ];

  return (
    <div>
      <p className="title h5 mb-4">{t("previous_tickets")}</p>
      <div className="card">
        <div className="card-body">
          <ReblDataTable<CreatedRequests>
            isLoading={isLoading}
            columns={columns}
            data={reports}
            onRowClicked={(row) => {
              navigate(basePath + "/view-request", {
                state: { requestID: row.id },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default ReviewCreatedRequests;
