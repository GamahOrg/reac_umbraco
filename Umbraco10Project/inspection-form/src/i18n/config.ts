import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Define a custom language detector
const customLanguageDetector = {
  name: "pathDetector",
  lookup() {
    const path = window.location.pathname;
    const segments = path.split("/");
    if (segments[1] === "en") {
      return "en";
    } else {
      return "ar";
    }
  },
  cacheUserLanguage() {},
};

// Add the custom detector to i18next
const languageDetector = new LanguageDetector();
languageDetector.addDetector(customLanguageDetector);

i18n
  // Add React bindings as a plugin.
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: [
        "pathDetector",
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
      ],
      caches: [], // Don't cache since detection is from the URL path
    },
    fallbackLng: "ar", // Fallback to Arabic
    supportedLngs: ["ar", "en"],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          complaints_service_title: "Welcome to the complaints service",
          complaints_service_desc:
            "Through this service, you can create a new report and track the status of previous reports",
          complaints_new_ticket: "Create a New Ticket",
          complaints_new_ticket_desc:
            "If you want to create a new ticket, you can click the button below",
          complaints_previous_tickets: "Track Previous Reports",
          complaints_previous_tickets_desc:
            "You can track the status of previous tickets by clicking the button below",
          new_ticket: "Create new ticket",
          previous_tickets: "Previous tickets",
          start: "Start",
          full_name: "Full Name",
          id_number: "ID Number",
          create_ticket: "Create ticket",
          ticket_number: "Ticket Number",
          ticket_number_general: "Ticket Number",
          created_at: "Created at",
          last_update: "Last update",
          status: "Status",
          successfully_submitted: "Successfully submitted",
          successfully_submitted_desc:
            "The ticket has been successfully submitted. You can track the status of the ticket using the ticket number",
          back_to_homepage: "Back to homepage",
          ticket_details: "Ticket Details",
          activity_log: "Activity Log",
          required_field: "Required field",
          input_incorrect: "Please enter a valid input.",
          mobile_less_than_ten:
            "Enter a valid phone number; it's less than 10 digits.",
          mobile_greater_than_ten:
            "Enter a valid phone number; it's more than 10 digits.",
          mobile_should_start_with_zero:
            "Enter a valid phone number; it must start with 05.",
          numbers_only: "Please enter numbers only.",
          required_attachments: "Required Attachments",
          upload_required_files: "Upload the Required Files",
          send: "Send",
          name: "Name",
          thank_you: "Thank you",
          request_received: "Your request has been successfully received",
          'Drag and drop a file or <span class="filepond--label-action">Browse</span>':
            'Drag and drop a file or <span class="filepond--label-action">Browse</span>',
          suggestions_and_inquiries: {
            title: "Suggestions and inquiries",
            description:
              "Fill in the data below to submit your suggestion or inquiry",
            submission_error:
              "An error occurred while submitting the request. Please try again.",
          },
          validation: {
            email: "Invalid email format",
            minMaxLength: "Input must be between {{min}} and {{max}}. ",
            phoneNumber: "Enter a valid phone number; it must start with 05.",
            numbers_only: "Please enter numbers only.",
            rerRequestNumber:
              "The request number must start with one of the following prefixes: FR, SR, MJ, RJ, CR, DT, MR, EX.",
          },
          extra_details_section: {
            suggestion_info: {
              ejar: `<p><strong><strong>Dear Partner,</strong></strong><br>We are pleased to receive your suggestions through the unified number 199011 or by visiting the following link for the Ejar program:<br><a href="https://www.ejar.sa/ar/node/add/support">https://www.ejar.sa/ar/node/add/support</a></p>`,
              fal: `<p><strong>Dear Partner,</strong><br>We are pleased to receive your suggestions through the unified number 199011 or by visiting the following link for the Fal program:<br><a href="https://eservicesredp.rega.gov.sa/auth/contactUs/form">https://eservicesredp.rega.gov.sa/auth/contactUs/form</a></p>`,
              srei: `<p><strong>Dear Partner,</strong><br>We are pleased to receive your suggestions through the unified number 199011 or by visiting the following link for the Saudi Real Estate Institute program:<br><a href="https://srei.sa/contact">https://srei.sa/contact</a></p>`,
              mullak: `<p><strong>Dear Partner,</strong><br>We are pleased to receive your suggestions through the unified number 199011 or by visiting the following link for the Mullak Associations program:<br><a href="https://mullak.rega.gov.sa/contact">https://mullak.rega.gov.sa/contact</a></p>`,
              subdivision: `<p><strong>Dear Partner,</strong><br>We are pleased to receive your suggestions through the unified number 199011 or by visiting the following link for the Real Estate Unit Subdivision program:<br><a href="https://subdivision.rega.gov.sa/ar/support/29">https://subdivision.rega.gov.sa/ar/support/29</a></p>`,
              rer: `<p><strong>Dear Partner,</strong><br>We are pleased to receive your suggestions through the unified number 199002 or by visiting the following link for the Real Estate Registry program:<br><a href="https://helpdesk.rer-sa.com/ar/helpdesk/rer/contactus/create">https://helpdesk.rer-sa.com/ar/helpdesk/rer/contactus/create</a></p>`,
              reac: `<p>Dear Partner،<br>We are pleased to receive your suggestions through Reac email: :<br><a href="mailto:info@reac.sa">info@reac.sa</a></p>`,
            },
            enquiry_info: {
              ejar: `<p><strong>Dear Partner,</strong><br>We are pleased to receive your inquiries through the unified number 199011 or by visiting the following link for the Ejar program:<br><a href="https://www.ejar.sa/ar/node/add/support">https://www.ejar.sa/ar/node/add/support</a></p>`,
              fal: `<p><strong>Dear Partner,</strong><br>We are pleased to receive your inquiries through the unified number 199011 or by visiting the following link for the Fal program:<br><a href="https://eservicesredp.rega.gov.sa/auth/contactUs/form">https://eservicesredp.rega.gov.sa/auth/contactUs/form</a></p>`,
              srei: `<p><strong>Dear Partner,</strong><br>We are pleased to receive your inquiries through the unified number 199011 or by visiting the following link for the Saudi Real Estate Institute program:<br><a href="https://srei.sa/contact">https://srei.sa/contact</a></p>`,
              mullak: `<p><strong>Dear Partner,</strong><br>We are pleased to receive your inquiries through the unified number 199011 or by visiting the following link for the Mullak Associations program:<br><a href="https://mullak.rega.gov.sa/contact">https://mullak.rega.gov.sa/contact</a></p>`,
              subdivision: `<p><strong>Dear Partner,</strong><br>We are pleased to receive your inquiries through the unified number 199011 or by visiting the following link for the Real Estate Unit Subdivision program:<br><a href="https://subdivision.rega.gov.sa/ar/support/29">https://subdivision.rega.gov.sa/ar/support/29</a></p>`,
              rer: `<p><strong>Dear Partner,</strong><br>We are pleased to receive your inquiries through the unified number 199002 or by visiting the following link for the Real Estate Registry program:<br><a href="https://helpdesk.rer-sa.com/ar/helpdesk/rer/contactus/create">https://helpdesk.rer-sa.com/ar/helpdesk/rer/contactus/create</a></p>`,
              reac: `<p>Dear Partner،<br>We are pleased to receive your inquiries through Reac email: :<br><a href="mailto:info@reac.sa">info@reac.sa</a></p>`,
            },
            complaint_number: {
              ejar: `<p><strong>Dear Partner,</strong><br>Please enter the complaint number from the program. If there is no complaint number, you can file a complaint through the unified contact number 199011 or via the official channels of the Real Estate Authority.</p>`,
              fal: `<p><strong>Dear Partner,</strong><br>Please enter the complaint number from the program. If there is no complaint number, you can file a complaint through the unified contact number 199011 or via the official channels of the Real Estate Authority.</p>`,
              srei: `<p><strong>Dear Partner,</strong><br>Please enter the complaint number from the program. If there is no complaint number, you can file a complaint through the unified contact number 199011 or via the official channels of the Real Estate Authority.</p>`,
              mullak: `<p><strong>Dear Partner,</strong><br>Please enter the complaint number from the program. If there is no complaint number, you can file a complaint through the unified contact number 199011 or via the official channels of the Real Estate Authority.</p>`,
              subdivision: `<p><strong>Dear Partner,</strong><br>Please enter the complaint number from the program. If there is no complaint number, you can file a complaint through the unified contact number 199011 or via the official channels of the Real Estate Authority.</p>`,
              rer: `<p><strong>Dear Partner,</strong><br>Please enter the complaint number from the program. If there is no complaint number, you can file a complaint through the unified contact number 199002 or via the official channels of the Real Estate Authority.</p>`,
              mulkia: `<p><strong>Dear Partner,</strong><br>Please enter the objection number from the committee. If there is no objection number, you can submit an objection by visiting the following link:<br><a href="https://mulkia.gov.sa">https://mulkia.gov.sa</a></p>`,
              wafi: `<p><strong>Dear Partner,</strong><br>Please enter the complaint number from the program. If there is no complaint number, you can submit a complaint by visiting the following link:<br><a href="https://wafiservices.rega.gov.sa">https://wafiservices.rega.gov.sa</a></p>`,
              realEstateContributions: `<p><strong>Dear Partner,</strong><br>Please enter the complaint number from the program. If there is no complaint number, you can submit a complaint by visiting the following link:<br><a href="https://wafiservices.rega.gov.sa/real-estate-contributions-auth/login">https://wafiservices.rega.gov.sa/real-estate-contributions-auth/login</a></p>`,
            },
          },
          extra_details_request_number_section: {
            request_number: {
              rer: "Dear Partner, please enter the request number that starts with one of the following prefixes: FR, SR, MJ, RJ, CR, DT, MR, EX",
            },
          },
          upload_file: {
            errors: {
              "File content does not match the expected type.":
                "File content does not match the expected type.",
              "The file size should not exceed 10 MB.":
                "The file size should not exceed 10 MB.",
              "Only .jpg, .png, .jpeg, and .pdf files are allowed.":
                "Only .jpg, .png, .jpeg, and .pdf files are allowed.",
              upload_error: "Something went wrong while uploading file",
            },
          },
        },
      },
      ar: {
        translation: {
          complaints_service_title: "مرحبًا بك في نظام البلاغات الإلكتروني",
          complaints_service_desc:
            "يمكنك من خلال هذا النظام إنشاء بلاغ جديد، ومتابعة حالة البلاغات السابقة",
          complaints_new_ticket: "إنشاء بلاغ جديد",
          complaints_new_ticket_desc:
            "في حال رغبتك بإنشاء بلاغ جديد، يمكنك الضغط على الزر أدناه",
          complaints_previous_tickets: "متابعة البلاغات السابقة",
          complaints_previous_tickets_desc:
            "يمكنك متابعة حالة البلاغات السابقة من خلال الضغط على الزر أدناه",
          start: "بدء الخدمة",
          previous_tickets: "البلاغات السابقة",
          new_ticket: "إنشاء بلاغ جديد",
          full_name: "اسم المبلغ",
          id_number: "رقم الهوية",
          create_ticket: "إنشاء البلاغ",
          ticket_number: "رقم البلاغ",
          ticket_number_general: "رقم التذكرة",
          created_at: "تاريخ إنشاء البلاغ",
          last_update: "تاريخ آخر تحديث",
          status: "حالة البلاغ",
          successfully_submitted: "تم إرسال البلاغ بنجاح",
          successfully_submitted_desc:
            "تم إرسال البلاغ بنجاح، يمكنك متابعة حالة البلاغ من خلال رقم البلاغ",
          back_to_homepage: "العودة إلى الصفحة الرئيسية",
          ticket_details: "تفاصيل البلاغ",
          activity_log: "سجل التحركات على البلاغ",
          required_field: "خانة مطلوبة",
          input_incorrect: "الرجاء ادخال قيمة صحيحة.",
          mobile_less_than_ten:
            "الرجاء إدخال رقم هاتف صحيح المدخل اقصر من 10 ارقام.",
          mobile_greater_than_ten:
            "الرجاء إدخال رقم هاتف صحيح المدخل اطول من 10 ارقام.",
          mobile_should_start_with_zero:
            "الرجاء إدخال رقم هاتف صحيح، يجب أن يبدأ بـ 05.",
          numbers_only: "الرجاء إدخال أرقام فقط.",
          required_attachments: "المرفقات المطلوبة",
          upload_required_files: "رفع الملفات المطلوبة",
          send: "ارسال",
          name: "الاسم",
          thank_you: "شكرًا لك",
          request_received: "لقد تم إستلام طلبكم بنجاح",
          'Drag and drop a file or <span class="filepond--label-action">Browse</span>':
            'اسحب وأسقط الملف أو <span class="filepond--label-action">تصفح</span>',
          suggestions_and_inquiries: {
            title: "الشكاوى والمقترحات",
            description: "قم بملىء البيانات ادناه لتقديم اقتراحك او استفسارك",
            submission_error:
              ". حدث خطأ أثناء ارسال الطلب ، يرجى المحاولة مرة أخرى",
          },
          validation: {
            email: "صيغة البريد الإلكتروني غير صحيحة",
            minMaxLength: "يجب أن يكون الإدخال بين {{min}} و {{max}}.",
            phoneNumber: "الرجاء إدخال رقم هاتف صحيح، يجب أن يبدأ بـ 05.",
            numbers_only: "الرجاء إدخال أرقام فقط.",
            rerRequestNumber:
              "يجب أن يبدأ رقم الطلب بأحد الرموز التالية: FR,SR,MJ,RJ,CR,DT,MR,EX .",
          },
          extra_details_section: {
            enquiry_info: {
              ejar: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال استفساراتكم من خلال رقم الموحد 199011 او من خلال زيارة الرابط التالي لبرنامج إيجار:<br><a href="https://www.ejar.sa/ar/node/add/support">https://www.ejar.sa/ar/node/add/support</a></p>`,
              fal: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال استفساراتكم من خلال الرقم الموحد 199011 أو من خلال زيارة الرابط التالي لبرنامج فال:<br><a href="https://eservicesredp.rega.gov.sa/auth/contactUs/form">https://eservicesredp.rega.gov.sa/auth/contactUs/form</a></p>`,
              srei: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال استفساراتكم من خلال الرقم الموحد 199011 او من خلال زيارة الرابط التالي لبرنامج المعهد العقاري السعودي:<br><a href="https://srei.sa/contact">https://srei.sa/contact</a></p>`,
              mullak: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال استفساراتكم من خلال الرقم الموحد 199011 او من خلال زيارة الرابط التالي لبرنامج جمعيات الملاك:<br><a href="https://mullak.rega.gov.sa/contact">https://mullak.rega.gov.sa/contact</a></p>`,
              subdivision: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال استفساراتكم من خلال الرقم الموحد 199011 او من خلال زيارة الرابط التالي لبرنامج فرز الوحدات العقارية:<br><a href="https://subdivision.rega.gov.sa/ar/support/29">https://subdivision.rega.gov.sa/ar/support/29</a></p>`,
              rer: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال استفساراتكم من خلال الرقم الموحد 199002 او من خلال زيارة الرابط التالي لبرنامج السجل العقاري:<br><a href="https://helpdesk.rer-sa.com/ar/helpdesk/rer/contactus/create">https://helpdesk.rer-sa.com/ar/helpdesk/rer/contactus/create</a></p>`,
              reac: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال استفساراتكم لدى المركز السعودي للتحكيم العقاري من خلال البريد الالكتروني:<br><a href="mailto:info@reac.sa">info@reac.sa</a></p>`,
            },
            suggestion_info: {
              ejar: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال اقتراحاتكم من خلال رقم الموحد 199011 او من خلال زيارة الرابط التالي لبرنامج إيجار:<br><a href="https://www.ejar.sa/ar/node/add/support">https://www.ejar.sa/ar/node/add/support</a></p>`,
              fal: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال اقتراحاتكم من خلال الرقم الموحد 199011 أو من خلال زيارة الرابط التالي لبرنامج فال:<br><a href="https://eservicesredp.rega.gov.sa/auth/contactUs/form">https://eservicesredp.rega.gov.sa/auth/contactUs/form</a></p>`,
              srei: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال اقتراحاتكم من خلال الرقم الموحد 199011 او من خلال زيارة الرابط التالي لبرنامج المعهد العقاري السعودي:<br><a href="https://srei.sa/contact">https://srei.sa/contact</a></p>`,
              mullak: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال اقتراحاتكم من خلال الرقم الموحد 199011 او من خلال زيارة الرابط التالي لبرنامج جمعيات الملاك:<br><a href="https://mullak.rega.gov.sa/contact">https://mullak.rega.gov.sa/contact</a></p>`,
              subdivision: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال اقتراحاتكم من خلال الرقم الموحد 199011 او من خلال زيارة الرابط التالي لبرنامج فرز الوحدات العقارية:<br><a href="https://subdivision.rega.gov.sa/ar/support/29">https://subdivision.rega.gov.sa/ar/support/29</a></p>`,
              rer: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال اقتراحاتكم من خلال الرقم الموحد 199002 او من خلال زيارة الرابط التالي لبرنامج السجل العقاري:<br><a href="https://helpdesk.rer-sa.com/ar/helpdesk/rer/contactus/create">https://helpdesk.rer-sa.com/ar/helpdesk/rer/contactus/create</a></p>`,
              reac: `<p><strong>شريكنا العزيز،</strong><br>نسعد باستقبال اقتراحاتكم لدى المركز السعودي للتحكيم العقاري من خلال البريد الالكتروني:<br><a href="mailto:info@reac.sa">info@reac.sa</a></p>`,
            },
            complaint_number: {
              ejar: `<p>يرجى ادخال رقم الشكوى من البرنامج، في حال عدم وجود رقم شكوى يمكنك رفع شكوى عن طريق مركز الاتصال 199011 أو القنوات الرسمية للهيئة العامة للعقار.</p>`,
              fal: `<p>يرجى ادخال رقم الشكوى من البرنامج، في حال عدم وجود رقم شكوى يمكنك رفع شكوى عن طريق مركز الاتصال 199011 أو القنوات الرسمية للهيئة العامة للعقار.</p>`,
              srei: `<p>يرجى ادخال رقم الشكوى من البرنامج، في حال عدم وجود رقم شكوى يمكنك رفع شكوى عن طريق مركز الاتصال 199011 أو القنوات الرسمية للهيئة العامة للعقار.</p>`,
              mullak: `<p>يرجى ادخال رقم الشكوى من البرنامج، في حال عدم وجود رقم شكوى يمكنك رفع شكوى عن طريق مركز الاتصال 199011 أو القنوات الرسمية للهيئة العامة للعقار.</p>`,
              subdivision: `<p>يرجى ادخال رقم الشكوى من البرنامج، في حال عدم وجود رقم شكوى يمكنك رفع شكوى عن طريق مركز الاتصال 199011 أو القنوات الرسمية للهيئة العامة للعقار.</p>`,
              rer: `<p>يرجى ادخال رقم الشكوى من البرنامج، في حال عدم وجود رقم شكوى يمكنك رفع شكوى عن طريق مركز الاتصال 199002 أو القنوات الرسمية للهيئة العامة للعقار.</p>`,
              mulkia: `<p>يرجى ادخال رقم الاعتراض من اللجنة، في حال عدم وجود رقم الاعتراض يمكنك رفع الاعتراض من خلال زيارة الرابط التالي:<br><a href="https://mulkia.gov.sa">https://mulkia.gov.sa</a></p>`,
              wafi: `<p>يرجى ادخال رقم الشكوى من البرنامج، في حال عدم وجود رقم شكوى يمكنك رفع الشكوى من خلال زيارة الرابط التالي:<br><a href="https://wafiservices.rega.gov.sa">https://wafiservices.rega.gov.sa</a></p>`,
              realEstateContributions: `<p>يرجى ادخال رقم الشكوى من البرنامج، في حال عدم وجود رقم شكوى يمكنك رفع الشكوى من خلال زيارة الرابط التالي:<br><a href="https://wafiservices.rega.gov.sa/real-estate-contributions-auth/login">https://wafiservices.rega.gov.sa/real-estate-contributions-auth/login</a></p>`,
            },
          },
          extra_details_request_number_section: {
            request_number: {
              rer: "شريكنا العزيز، يرجى ادخال رقم الطلب الذي يبدأ بأحد الرموز التالية: FR,SR,MJ,RJ,CR,DT,MR,EX",
            },
          },
          upload_file: {
            errors: {
              "File content does not match the expected type.":
                "محتوى الملف لا يتطابق مع النوع المتوقع.",
              "The file size should not exceed 10 MB.":
                "يجب ألا يتجاوز حجم الملف 10 ميغابايت.",
              "Only .jpg, .png, .jpeg, and .pdf files are allowed.":
                "الملفات المسموح بها فقط هي .jpg و .png و .jpeg و .pdf.",
              upload_error: "حدث خطأ أثناء رفع الملف",
            },
          },
        },
      },
    },
  });

export default i18n;
