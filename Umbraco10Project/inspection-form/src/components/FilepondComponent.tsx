import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { FilePond } from "react-filepond";
import { useEffect, useState } from "react";
import { Field2 } from "../pages/create-request/InspectionModel.tsx";
import { Field2 as SIField2 } from "../pages/suggestions-inquiries/DataModel.tsx";

import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { registerPlugin } from "filepond";
import { useTranslation } from "react-i18next";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
);

export interface formFieldType {
  id: string;
  disabled: boolean;
  required: boolean;
  multiple: boolean;
  arLabel: string;
  enLabel: string;
}

export const FilePondField = ({
  formField,
  control,
  api,
}: {
  formField: Field2 | SIField2 | formFieldType;
  control: Control;
  api: string;
}) => {
  const renderFilePond = ({
    field,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
  }) => {
    const [noteIds, setNoteIds] = useState<string[]>([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const input = document.querySelector(
        `input[name='${field.name}']`,
      ) as HTMLInputElement;
      if (!input) return;

      field.ref(input);
      input.onblur = () => field.onBlur();
    }, [field]);

    let serverResponse = "";
    // Error message handling callback
    const handleFileProcessingError = () => {
      return (
        t(`upload_file.errors.${serverResponse}`) ??
        t("upload_file.errors.upload_error")
      );
    };

    return (
      <FilePond
        id={formField.id}
        // you can use this if you want to set the initial value of the file or in case of editing the form and you want to show the file
        // but in this case, we don't need it
        // files={field.value}
        onprocessfile={(error, file) => {
          if (!error) {
            if (api.includes("SuggestionsInquiries")) {
              // add the new note id
              setNoteIds((prevNoteIds) => [...prevNoteIds, file.serverId]);
              field.onChange([...noteIds, file.serverId]);
            } else {
              field.onChange(file.serverId);
            }
          } else {
          }
        }}
        name={formField.id}
        disabled={formField.disabled ?? false}
        required={formField.required ?? false}
        onremovefile={(error) => {
          if (!error) {
            field.onChange(null);
          } else {
          }
        }}
        server={{
          process: {
            url: api,
            onerror: (response) => {
              serverResponse = JSON.parse(response)["attachments"];
            },
          },
          revert: null, // Disable automatic revert/delete behavior
        }}
        labelFileProcessingError={handleFileProcessingError}
        allowMultiple={formField.multiple}
        allowImagePreview={true}
        imagePreviewMaxFileSize={"10MB"}
        checkValidity={true}
        instantUpload={true}
        acceptedFileTypes={["image/*", "application/pdf"]}
        allowFileTypeValidation={true}
        maxFiles={"max" in formField ? formField.max : null}
        labelFileTypeNotAllowed={"الملف غير مسموح به"}
        labelMaxFileSize={"الحد الأقصى لحجم الملف {filesize}"}
        labelMaxFileSizeExceeded={"تم تجاوز الحد الأقصى لحجم الملف"}
        labelMaxTotalFileSize={"الحد الأقصى لحجم الملفات"}
        maxFileSize={"10MB"}
        fileValidateTypeLabelExpectedTypes={"{allTypes} الملفات المسموح بها "}
        labelIdle={t(
          'Drag and drop a file or <span class="filepond--label-action">Browse</span>',
        )}
        labelButtonAbortItemLoad={""}
        labelButtonAbortItemProcessing={""}
        labelButtonProcessItem={""}
        labelButtonRemoveItem={"تراجع"}
        labelButtonRetryItemLoad={"إعادة المحاولة"}
        labelButtonRetryItemProcessing={"إعادة المحاولة"}
        labelButtonUndoItemProcessing={"تراجع"}
        labelFileAdded={"تمت إضافة الملف"}
        labelFileCountPlural={"ملفات"}
        labelFileCountSingular={"ملف"}
        labelFileLoadError={"خطأ في تحميل الملف"}
        labelFileLoading={"جاري تحميل"}
        labelFileProcessing={"جاري التحميل"}
        labelFileProcessingAborted={"تم إلغاء تحميل الملف"}
        labelFileProcessingComplete={"تم تحميل الملف"}
        // labelFileProcessingError={"خطأ في تحميل الملف"}
        labelFileRemoved={"تمت إزالة الملف"}
        labelFileRemoveError={"خطأ في إزالة الملف"}
        labelFileSizeNotAvailable={"غير متوفر"}
        labelFileWaitingForSize={"جاري التحميل"}
        labelFileProcessingRevertError={"خطأ في التراجع عن الملف"}
        labelTapToCancel={"انقر للإلغاء"}
        labelTapToRetry={"انقر لإعادة المحاولة"}
        labelTapToUndo={"انقر للتراجع"}
        labelInvalidField={"الحقل غير صالح"}
        labelDecimalSeparator={"."}
        labelThousandsSeparator={","}
      />
    );
  };

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <Controller
      name={formField.id}
      control={control}
      rules={{
        required: {
          value: formField.required ?? false,
          message:
            (currentLanguage == "ar" ? formField.arLabel : formField.enLabel) +
            " " +
            t("required_field"),
        },
        shouldUnregister: true,
      }}
      render={renderFilePond}
    />
  );
};
