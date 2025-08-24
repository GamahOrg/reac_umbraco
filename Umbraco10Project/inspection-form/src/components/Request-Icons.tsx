import {
  ComplaintIcon,
  FileAttachmentIcon,
  FolderDetailsIcon,
  Location04Icon,
  PermanentJobIcon,
} from "../Icons.tsx";

const RequestIcons = ({ requestLabel }: { requestLabel: string }) => {
  switch (requestLabel) {
    // تفاصيل البلاغ or تفاصيل المشاركة
    case "تفاصيل البلاغ":
    case "تفاصيل المشاركة":
      return <FolderDetailsIcon />;
    // بيانات المبلغ or المعلومات الشخصية
    case "بيانات المبلغ":
    case "المعلومات الشخصية":
      return <ComplaintIcon />;
    // بيانات المبلغ عليه
    case "بيانات المبلغ عليه":
      return <PermanentJobIcon />;
    //عنوان المبلغ عليه
    case "عنوان المبلغ عليه":
      return <Location04Icon />;
    // المرفقات
    case "المرفقات":
      return <FileAttachmentIcon />;
  }
};
export default RequestIcons;
