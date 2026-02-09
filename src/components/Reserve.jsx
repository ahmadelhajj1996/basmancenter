import { useTranslation } from "react-i18next";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import notify from "../config/toastr";

function Register() {
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    dob: "",
    time: "",
  };

  const { t } = useTranslation();

  const validationSchema = yup.object({
    name: yup.string().required(t('validation.name.required')),
    email: yup.string().email(t('validation.email.invalid')).required(t('validation.email.required')),
    dob: yup.date()
      .required(t('validation.dob.required'))
      .min(new Date(), t('validation.dob.min'))
      .typeError(t('validation.dob.invalid')),
    phone: yup
      .string()
      .matches(/^\d{10}$/, t('validation.phone.format'))
      .required(t('validation.phone.required')),
    time: yup
      .string()
      .required(t('validation.time.required'))
      .matches(
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        t('validation.time.format'),
      )
      .test(
        "time-range",
        t('validation.time.range'),
        function (value) {
          if (!value) return false;
          const [hours, minutes] = value.split(":").map(Number);
          const timeInMinutes = hours * 60 + minutes;
          return timeInMinutes >= 600 && timeInMinutes <= 1320;
        },
      ),
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes.padStart(2, "0")} ${period}`;
  };

  const sendToWhatsApp = async (values) => {
  try {
    const formattedDate = formatDate(values.dob);
    const formattedTime = formatTime(values.time);

    // Build message
    const message =
      `*🎯 New Appointment Request*%0A%0A` +
      `*👤 Full Name:* ${encodeURIComponent(values.name)}%0A` +
      `*📱 Phone:* ${encodeURIComponent(values.phone)}%0A` +
      `*📧 Email:* ${encodeURIComponent(values.email)}%0A` +
      `*📅 Date:* ${encodeURIComponent(formattedDate)}%0A` +
      `*⏰ Time:* ${encodeURIComponent(formattedTime)}%0A%0A` +
      `_This appointment was booked via Basman Alnuaini medical center_`;

    // Clean phone number - remove all non-digits
    const rawPhone = "971508149362".replace(/\D/g, "");
    
    // Ensure it has country code and proper formatting
    let phoneNumber;
    if (rawPhone.startsWith('00')) {
      phoneNumber = rawPhone.substring(2); // Remove leading 00
    } else if (rawPhone.startsWith('0')) {
      phoneNumber = rawPhone.substring(1); // Remove leading 0
    } else {
      phoneNumber = rawPhone; // Use as is
    }
    
    // For WhatsApp, we need the number in international format without + or 00
    // WhatsApp format: country code + number (without leading zeros or plus sign)
    // Example: 971508149362 (UAE number)
    
    // Detect if user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile devices, use WhatsApp app directly
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      // For desktop, use WhatsApp Web
      const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
    
    return { formattedDate, formattedTime };
  } catch (error) {
    console.error("Error sending to WhatsApp:", error);
    throw error;
  }
};



  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log("Form submitted", values);

    try {
      setSubmitting(true);
      
      await sendToWhatsApp(values);
      
      notify("done", "Appointment request sent successfully!");
      
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      notify("error", "Failed to send appointment request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container border-b-0 pb-8">
      <div className="title">{t('form.title')}</div>
      <div className="pt-12 flex flex-col gap-y-4 mx-4 md:w-1/2 md:mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount
        >
          {(formik) => {
            return (
              <Form className="flex flex-col gap-y-6">
                {/* Name Field */}
                <div className="flex flex-col gap-y-1 w-full">
                  <label className="description">{t('form.name')}</label>
                  <div className="relative">
                    <Field
                      name="name"
                      type="text"
                      placeholder={t('form.namePlaceholder')}
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage
                      component="div"
                      className="absolute text-xs/4 text-red-500 ps-2"
                      name="name"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="flex flex-col gap-y-1 w-full">
                  <label className="description">{t('form.phone')}</label>
                  <div className="relative">
                    <Field
                      name="phone"
                      type="tel"
                      placeholder={t('form.phonePlaceholder')}
                      inputMode="numeric"
                      pattern="^\d{10}$"
                      maxLength={10}
                      className="w-full p-2 border rounded"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      className="absolute text-xs/4 text-red-500 ps-2"
                      name="phone"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-y-1 w-full">
                  <label className="description">{t('form.email')}</label>
                  <div className="relative">
                    <Field
                      name="email"
                      type="email"
                      placeholder={t('form.emailPlaceholder')}
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage
                      component="div"
                      className="absolute text-red-500 text-xs/4 ps-2"
                      name="email"
                    />
                  </div>
                </div>

                {/* Date and Time Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-y-1 w-full">
                    <label className="description">{t('form.date')}</label>
                    <div className="relative">
                      <Field
                        name="dob"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        component="div"
                        className="absolute text-xs/4 text-red-500 ps-2"
                        name="dob"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-1 w-full">
                    <label className="description">{t('form.time')}</label>
                    <div className="relative">
                      <Field
                        name="time"
                        type="time"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        component="div"
                        className="absolute text-red-500 text-xs/4 ps-2"
                        name="time"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  className={`mt-4 text-white text-sm md:text-lg tracking-wider bg-cyan-700 hover:bg-cyan-900 w-full sm:w-1/2 mx-auto flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition-all duration-300 hover:opacity-90 active:scale-95 ${
                    !formik.isValid || formik.isSubmitting 
                      ? "opacity-50 cursor-not-allowed" 
                      : ""
                  }`}
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {formik.isSubmitting ? t('form.sending') : t('form.confirm')}
                  {formik.isSubmitting && (
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
