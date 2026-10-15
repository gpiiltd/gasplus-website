import React, { useState } from "react";
import { Heading, Paragraph, Text, Label } from "../components/Typography";
import { FadeIn } from "../components/animations/Animations";
import { LoaderCircle, UploadCloud } from "lucide-react";
import { containerClass } from "../utils/constants";
import gridPattern from "../assets/images/Grid layers - v1.png";
import successIcon from "../assets/images/Vector.png";
import successBackground from "../assets/images/group.png";

interface FormData {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  location: string;
  enquiry: string;
  powerRequirement: string;
  contactMethods: string[];
  file: File | null;
  agreed: boolean;
}

const enquiryOptions = [
  "EPC (Engineering Procurement Construction)",
  "LNG Supply & Distribution",
  "Gas Compression Solutions",
  "Industrial Gas Generator Maintenance",
  "Pressure Monitoring",
  "Energy Solutions & Equipment",
  "Technical Consultation",
  "Other",
];

const powerOptions = ["Below 1MW", "1MW – 5MW", "5MW – 10MW", "Above 10MW"];
const contactMethodOptions = [
  "Phone Call",
  "Email",
  "WhatsApp",
  "Virtual Meeting",
];

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  position: "",
  email: "",
  countryCode: "+234",
  phone: "",
  company: "",
  location: "",
  enquiry: "",
  powerRequirement: "",
  contactMethods: [],
  file: null,
  agreed: false,
};

const inputClass =
  "h-9 w-full rounded-sm border border-gray-200 bg-white px-3 font-display text-base font-normal text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#4b9f3b] focus:ring-1 focus:ring-[#4b9f3b]";

const ContactPage: React.FC = () => {
  const FORMSPREE_URL = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`;
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleContactMethod = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      contactMethods: prev.contactMethods.includes(method)
        ? prev.contactMethods.filter((m) => m !== method)
        : [...prev.contactMethods, method],
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  async function uploadToCloudinary(file: File): Promise<string> {
    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body },
    );
    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    return data.secure_url as string;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    // Honeypot: real users never fill this hidden field
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get(
      "_gotcha",
    );
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (formData.contactMethods.length === 0) {
      setSubmitError("Please select at least one preferred contact method.");
      return;
    }

    setSending(true);
    setSubmitError("");

    try {
      // 1. Upload the image first, if there is one
      let documentUrl = "None";
      if (formData.file) {
        try {
          documentUrl = await uploadToCloudinary(formData.file);
        } catch {
          setSubmitError(
            "We couldn't upload your file. Please try again or remove the file.",
          );
          setSending(false);
          return;
        }
      }

      // 2. Send everything to Formspree
      const localNumber = formData.phone.replace(/\D/g, "").replace(/^0+/, "");
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New inquiry from ${formData.firstName} ${formData.lastName}`,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: `${formData.countryCode}${localNumber}`,
          company: formData.company,
          position: formData.position,
          location: formData.location,
          enquiry: formData.enquiry,
          powerRequirement: formData.powerRequirement,
          contactMethods: formData.contactMethods.join(", "),
          supportingDocument: documentUrl,
          consent: "Agreed to be contacted",
        }),
      });

      if (!res.ok) throw new Error("Formspree error");
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't send your inquiry. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const closeModal = () => {
    setSubmitted(false);
    setStep(1);
    setFormData(initialForm);
  };

  return (
    <main className="min-h-screen pt-[60px]">
      {/* CONTACT SECTION */}
      <section className="relative flex min-h-[calc(100svh-60px)] items-center overflow-hidden bg-[#16280A] py-12 md:py-16">
        <img
          src={gridPattern}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        <div
          className={`${containerClass} relative z-10 grid items-start gap-8 lg:justify-center lg:grid-cols-[330px_minmax(0,760px)] lg:gap-8`}
        >
          <FadeIn
            duration={500}
            distance={16}
            className="max-w-[330px] text-left motion-reduce:!opacity-100 motion-reduce:!transform-none motion-reduce:!transition-none"
          >
            <Heading
              level={1}
              className="mb-4 !text-3xl !leading-[1.15] !text-white md:!text-[40px]"
            >
              Start your journey with us
            </Heading>
            <Paragraph
              size="sm"
              className="!text-base !leading-6 !text-white/90"
            >
              Tell us what you’re working on and where you need support. We’ll
              get back to you with clear next steps.
            </Paragraph>
          </FadeIn>

          <div className="w-full min-w-0 lg:max-w-[760px]">
            {/* STEP 1 */}
            <div hidden={step !== 1}>
              <FadeIn
                key="contact-step-1"
                duration={450}
                distance={20}
                threshold={0.05}
                className="motion-reduce:!opacity-100 motion-reduce:!transform-none motion-reduce:!transition-none"
              >
                <form
                  onSubmit={handleNext}
                  className="min-h-[644px] rounded-[10px] border border-gray-200 bg-white p-6 sm:p-8"
                >
                  <div className="space-y-7">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label
                          className="!text-sm !text-[#374151]"
                          htmlFor="firstName"
                          required
                        >
                          First Name
                        </Label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="e.g. John"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <Label
                          className="!text-sm !text-[#374151]"
                          htmlFor="lastName"
                          required
                        >
                          Last Name
                        </Label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="e.g. Doe"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        className="!text-sm !text-[#374151]"
                        htmlFor="position"
                        required
                      >
                        Position / Title
                      </Label>
                      <input
                        id="position"
                        name="position"
                        type="text"
                        placeholder="e.g. Procurement Manager"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label
                          className="!text-sm !text-[#374151]"
                          htmlFor="email"
                          required
                        >
                          Work Email Address
                        </Label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="e.g. john@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <Label
                          className="!text-sm !text-[#374151]"
                          htmlFor="phone"
                          required
                        >
                          Phone Number
                        </Label>
                        <div className="flex h-9 overflow-hidden rounded-sm border border-gray-200 focus-within:border-[#4b9f3b] focus-within:ring-1 focus-within:ring-[#4b9f3b]">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="border-r border-gray-200 bg-white px-2 font-display text-base font-normal text-gray-700 outline-none"
                          >
                            <option value="+234">🇳🇬 +234</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                          </select>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="000 000 0000"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="min-w-0 flex-1 px-3 font-display text-base font-normal text-gray-800 outline-none placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label
                        className="!text-sm !text-[#374151]"
                        htmlFor="company"
                        required
                      >
                        Company / Name
                      </Label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="e.g. Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <Label
                        className="!text-sm !text-[#374151]"
                        htmlFor="location"
                        required
                      >
                        Location
                      </Label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="e.g. Lagos, Nigeria"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>

                    <fieldset className="pt-1">
                      <legend className="mb-3 font-display text-base font-medium text-[#374151]">
                        Service/Request/What are you interested in?{" "}
                        <span className="text-red-500">*</span>
                      </legend>
                      <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                        {enquiryOptions.map((option) => (
                          <label
                            key={option}
                            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-sm border border-gray-100 px-2 py-2 transition hover:bg-gray-50"
                          >
                            <input
                              type="radio"
                              name="enquiry"
                              value={option}
                              checked={formData.enquiry === option}
                              onChange={handleChange}
                              required
                              className="h-3 w-3 accent-[#4b9f3b]"
                            />
                            <Text
                              size="xs"
                              className="!text-sm leading-tight !text-[#374151]"
                            >
                              {option}
                            </Text>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="rounded-sm bg-[#7BC24F] px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#559b3b] focus:outline-none focus:ring-2 focus:ring-[#65b447] focus:ring-offset-2"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </form>
              </FadeIn>
            </div>

            {/* STEP 2 */}
            <div hidden={step !== 2}>
              <FadeIn
                key="contact-step-2"
                duration={450}
                distance={20}
                threshold={0.05}
                className="motion-reduce:!opacity-100 motion-reduce:!transform-none motion-reduce:!transition-none"
              >
                <form
                  onSubmit={handleSubmit}
                  className="min-h-[644px] rounded-[10px] border border-gray-200 bg-white p-6 sm:p-8"
                >
                  <div className="space-y-7">
                    <fieldset>
                      <legend className="mb-3 font-display text-base font-medium text-[#374151]">
                        Estimated Power Requirement{" "}
                        <span className="text-red-500">*</span>
                      </legend>
                      <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                        {powerOptions.map((option) => (
                          <label
                            key={option}
                            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-sm border border-gray-100 px-2 py-2 transition hover:bg-gray-50"
                          >
                            <input
                              type="radio"
                              name="powerRequirement"
                              value={option}
                              checked={formData.powerRequirement === option}
                              onChange={handleChange}
                              required
                              className="h-3 w-3 accent-[#4b9f3b]"
                            />
                            <Text
                              size="xs"
                              className="!text-sm leading-tight !text-[#374151]"
                            >
                              {option}
                            </Text>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="mb-3 font-display text-base font-medium text-[#374151]">
                        Preferred Contact Method (select all options that apply){" "}
                        <span className="text-red-500">*</span>
                      </legend>
                      <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                        {contactMethodOptions.map((method) => (
                          <label
                            key={method}
                            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-sm border border-gray-100 px-2 py-2 transition hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              checked={formData.contactMethods.includes(method)}
                              onChange={() => toggleContactMethod(method)}
                              className="h-3 w-3 accent-[#4b9f3b]"
                            />
                            <Text
                              size="xs"
                              className="!text-sm leading-tight !text-[#374151]"
                            >
                              {method}
                            </Text>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div>
                      <Label className="!text-base !text-[#374151]">
                        Upload Supporting Documents (optional)
                      </Label>
                      <label className="flex min-h-[106px] w-full cursor-pointer flex-col items-center gap-1 rounded-md border border-gray-100 px-3 py-3 text-center transition hover:bg-gray-50 sm:w-[calc(50%-1rem)]">
                        <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                          <UploadCloud size={18} aria-hidden="true" />
                        </span>
                        <Text size="xs" className="!text-sm !text-[#374151]">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </Text>
                        <Text size="xs" className="text-[10px] text-gray-400">
                          PNG, JPEG, or JPG (max. 3MB)
                        </Text>
                        <input
                          type="file"
                          accept="image/png,image/jpeg"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            if (file && file.size > 3 * 1024 * 1024) {
                              setSubmitError(
                                "File is too large. Maximum size is 3MB.",
                              );
                              e.target.value = "";
                              return;
                            }
                            setSubmitError("");
                            setFormData((prev) => ({ ...prev, file }));
                          }}
                        />
                      </label>
                      {formData.file && (
                        <Text
                          size="xs"
                          className="mt-1 text-[10px] text-gray-500"
                        >
                          {formData.file.name}
                        </Text>
                      )}
                    </div>

                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.agreed}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            agreed: e.target.checked,
                          }))
                        }
                        required
                        className="h-3 w-3 accent-[#4b9f3b]"
                      />
                      <Text size="xs" className="!text-sm !text-[#374151]">
                        I agree to be contacted regarding my inquiry.
                      </Text>
                    </label>
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />
                    {/* Error message */}
                    {submitError && (
                      <p role="alert" className="text-sm text-red-600">
                        {submitError}
                      </p>
                    )}
                    <div className="flex gap-3 pt-8">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        disabled={sending}
                        className="rounded-sm bg-gray-100 px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={sending}
                        aria-busy={sending}
                        className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#7BC24F] px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#559b3b] focus:outline-none focus:ring-2 focus:ring-[#65b447] focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
                      >
                        {sending && <LoaderCircle size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}
                        <span role="status">{sending ? "Sending…" : "Send Inquiry"}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative isolate my-auto w-full max-w-[400px] shrink-0 overflow-hidden rounded-md bg-white px-5 pb-8 pt-14 text-center shadow-xl sm:px-6 sm:pb-12 sm:pt-16"
          >
            <img
              src={successBackground}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close success message"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <img
              src={successIcon}
              alt="Success"
              className="mx-auto mb-3 h-10 w-10 object-contain sm:h-12 sm:w-12"
            />
            <Heading level={4} className="mb-1 text-base text-gray-900">
              Inquiry sent
            </Heading>
            <Paragraph
              size="sm"
              className="!text-base !text-gray-500 sm:!text-[20px]"
            >
              Thank you for sending your inquiry. Someone from our team will
              reach out to you soon.
            </Paragraph>
          </div>
        </div>
      )}
    </main>
  );
};

export default ContactPage;
