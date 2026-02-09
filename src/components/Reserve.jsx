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

  const openWhatsApp = (phoneNumber, message) => {
    // Clean phone number - remove all non-digits and ensure proper format
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    // For WhatsApp, ensure it has country code without + or 00
    const whatsappPhone = cleanPhone.startsWith('971') ? cleanPhone : `971${cleanPhone}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create URLs for different platforms
    const webUrl = `https://web.whatsapp.com/send?phone=${whatsappPhone}&text=${encodedMessage}`;
    const mobileUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
    const androidIntentUrl = `intent://send?phone=${whatsappPhone}&text=${encodedMessage}#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end`;
    
    // Detect platform
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    const isAndroid = /android/i.test(userAgent);
    
    let urlToOpen = mobileUrl; // Default to mobile URL
    
    if (isAndroid) {
      // Try Android Intent first for better app opening
      urlToOpen = androidIntentUrl;
    } else if (!isMobile) {
      // Desktop - use web version
      urlToOpen = webUrl;
    }
    
    // For iOS or other mobile devices, use standard wa.me URL
    if (isMobile && !isAndroid) {
      urlToOpen = mobileUrl;
    }
    
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = urlToOpen;
    
    // Set attributes for proper opening
    if (isAndroid) {
      // For Android intent, we need to handle it differently
      window.location.href = urlToOpen;
    } else {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    // Fallback mechanism - if nothing opens in 2 seconds, try standard approach
    setTimeout(() => {
      if (document.hasFocus()) {
        // If still on the page, try standard WhatsApp URL
        const fallbackWindow = window.open(mobileUrl, '_blank');
        if (!fallbackWindow || fallbackWindow.closed || typeof fallbackWindow.closed === 'undefined') {
          // If popup blocked or failed, redirect in current tab
          window.location.href = mobileUrl;
        }
      }
    }, 2000);
  };

  const sendToWhatsApp = async (values) => {
    try {
      const formattedDate = formatDate(values.dob);
      const formattedTime = formatTime(values.time);

      // Build message with proper encoding
      const message = `*🎯 New Appointment Request*\n\n` +
        `*👤 Full Name:* ${values.name}\n` +
        `*📱 Phone:* ${values.phone}\n` +
        `*📧 Email:* ${values.email}\n` +
        `*📅 Date:* ${formattedDate}\n` +
        `*⏰ Time:* ${formattedTime}\n\n` +
        `_This appointment was booked via Basman Alnuaini medical center_`;

      // Phone number for WhatsApp
      const phoneNumber = "971508149362";
      
      // Open WhatsApp with the message
      openWhatsApp(phoneNumber, message);
      
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
      
      // Show success message after a short delay
      setTimeout(() => {
        notify("done", "Appointment request sent successfully! If WhatsApp didn't open, please check your browser permissions.");
      }, 500);
      
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      notify("error", "Failed to send appointment request. Please try again or contact us directly.");
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

                {/* Instructions for Android Users */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800 mt-2">
                  <p className="font-semibold mb-1">📱 For Android Users:</p>
                  <p>If WhatsApp doesn't open automatically, please:</p>
                  <ol className="list-decimal pl-5 mt-1 space-y-1">
                    <li>Make sure WhatsApp is installed on your device</li>
                    <li>Allow pop-ups for this website in browser settings</li>
                    <li>Try clicking "Confirm" button again</li>
                  </ol>
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
