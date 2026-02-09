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
    name: yup.string().required( t('validation.name.required') ),
    email: yup.string().email(t('validation.name.invalid')).required(t('validation.email.required')),
    dob: yup.date()
    .required(t('validation.dob.required'))
    .min(new Date(), t('validation.dob.min'))
    .typeError(t('validation.dob.invalid')),
    phone: yup
      .string()
      .matches(/^\d{10}$/, t('validation.phone.required'))
      .required(t('validation.phone.invalid')),
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

 const sendToWhatsApp = (values) => {
  // Format date
  const formattedDate = new Date(values.dob).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format time
  const [hours, minutes] = values.time.split(":");
  const formattedTime = `${parseInt(hours, 10) % 12 || 12}:${minutes.padStart(2, "0")} ${
    hours >= 12 ? "PM" : "AM"
  }`;

  // Build message
  const message =
    `*🎯 New Appointment Request*%0A%0A` +
    `*👤 Full Name:* ${values.name}%0A` +
    `*📱 Phone:* ${values.phone}%0A` +
    `*📧 Email:* ${values.email}%0A` +
    `*📅 Date:* ${formattedDate}%0A` +
    `*⏰ Time:* ${formattedTime}%0A%0A` +
    `_This appointment was booked via Basman Alnuaini medical center_`;

  // Clean phone number
  const phoneNumber = "971508149362".replace(/\D/g, "");

  // Create WhatsApp URL using wa.me
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  
  // Open the URL in a new tab
  window.open(whatsappUrl, '_blank');
  
  console.log("WhatsApp message prepared");

  return { formattedDate, formattedTime };

  };



  
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("Form submitted", values);

    // Set submitting to true to disable button
    setSubmitting(true);

    try {
      const { formattedDate, formattedTime } = sendToWhatsApp(values);

      notify("done");

      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      // Always set submitting to false
      setSubmitting(false);
    }
  };

  return (
    <div className=" container border-b-0 pb-8 ">
      <div className="title"> { t('form.title')} </div>
        <div className="pt-12  flex flex-col gap-y-4 mx-4 md:w-1/2 md:mx-auto   ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form className="flex flex-col gap-y-6 ">
                  <div className=" flex flex-col gap-y-1 w-full">
                    <label className=" description"> { t('form.name')} </label>
                    <div className="relative    items-center">
                      <Field
                        name="name"
                        type="text"
                        placeholder="name"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        component="div"
                        className="absolute text-xs/4 text-red-500 ps-2"
                        name="name"
                      />
                    </div>
                  </div>
                  <div className=" flex flex-col gap-y-1 w-full">
                    <label className=" description"> { t('form.phone')}</label>
                    <div className="relative col-span-4">
                      <Field
                        name="phone"
                        type="text"
                        placeholder="your phone"
                        inputMode="numeric"
                        pattern="^\d{10}$"
                        maxLength={10}
                        className="w-full p-2 border rounded"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            "",
                          );
                        }}
                      />
                      <ErrorMessage
                        component="div"
                        className="absolute text-xs/4 text-red-500 ps-2"
                        name="phone"
                      />
                    </div>
                  </div>

                  <div className=" flex flex-col gap-y-1 w-full">
                    <label className=" description">{ t('form.email')}</label>
                    <div className="relative    items-center">
                      <Field
                        name="email"
                        type="email"
                        placeholder="email"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        component="div"
                        className="absolute text-red-500 text-xs/4 ps-2"
                        name="email"
                      />
                    </div>
                  </div>

                  <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className=" flex flex-col gap-y-1 w-full">
                      <label className=" description">{ t('form.date')}</label>
                      <div className="relative    items-center">
                        <Field
                          name="dob"
                          type="date"
                          placeholder="Select a day"
                          className="w-full p-2 border rounded"
                        />
                        <ErrorMessage
                          component="div"
                          className="absolute text-xs/4 text-red-500 ps-2"
                          name="dob"
                        />
                      </div>
                    </div>
                    <div className=" flex flex-col gap-y-1 w-full">
                      <label className=" description"> {t('form.time')} </label>
                      <div className="relative    items-center">
                        <Field
                          name="time"
                          type="time"
                          placeholder="Confident Hour"
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

                  <button
                    className={` mt-4  text-white text-sm md:text-lg tracking-wider bg-cyan-700 hover:bg-cyan-900 w-full sm:w-1/2 mx-auto flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition-all duration-300 hover:opacity-90 active:scale-95 ${!formik.isValid || formik.isSubmitting ? " cursor-not-allowed" : ""}`}
                    type="submit"
                    // disabled={!formik.isValid || formik.isSubmitting}
                  >
                     { t('form.confirm')}
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
