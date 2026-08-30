import React, { useState } from "react";
import { Heading, Paragraph, Text, Label } from "../components/Typography";

interface FormData {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
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
  "h-9 w-full rounded-sm border border-gray-200 bg-white px-3 font-display text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#4b9f3b] focus:ring-1 focus:ring-[#4b9f3b]";

const ContactPage: React.FC = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle API submission here
    setSubmitted(true);
  };

  const closeModal = () => {
    setSubmitted(false);
    setStep(1);
    setFormData(initialForm);
  };

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section
        className="relative flex min-h-[160px] items-center justify-center bg-cover bg-center px-4 py-10"
        style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-3xl text-center">
          <Heading
            level={1}
            className="text-xl leading-tight text-white md:text-3xl lg:text-4xl"
          >
            GasPlus is your trusted partner in
            <br />
            the ever-evolving energy landscape
          </Heading>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative overflow-hidden bg-[#16280A] px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="pointer-events-none absolute left-0 top-8 h-24 w-24 bg-[#143b0a]/70" />
        <div className="pointer-events-none absolute left-5 top-36 h-20 w-20 bg-[#143b0a]/60" />
        <div className="pointer-events-none absolute right-0 top-24 h-28 w-28 bg-[#143b0a]/50" />
        <div className="pointer-events-none absolute bottom-10 left-0 h-24 w-24 bg-[#143b0a]/50" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <Heading level={2} className="mb-2 text-2xl text-white md:text-3xl">
              Get in touch with us
            </Heading>
            <Paragraph
              size="sm"
              className="mx-auto max-w-md text-xs leading-relaxed text-white/80 md:text-sm"
            >
              Tell us what you're working on and where you need support.
              <br />
              We'll get back to you with clear next steps.
            </Paragraph>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <form
              onSubmit={handleNext}
              className="mx-auto rounded-md bg-white p-5 shadow-xl md:p-7"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName" required>
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
                    <Label htmlFor="lastName" required>
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
                  <Label htmlFor="position" required>
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
                    <Label htmlFor="email" required>
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
                    <Label htmlFor="phone" required>
                      Phone Number
                    </Label>
                    <div className="flex h-9 overflow-hidden rounded-sm border border-gray-200 focus-within:border-[#4b9f3b] focus-within:ring-1 focus-within:ring-[#4b9f3b]">
                      <select
                        className="border-r border-gray-200 bg-white px-2 font-display text-xs text-gray-700 outline-none"
                        defaultValue="+234"
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
                        className="min-w-0 flex-1 px-3 font-display text-xs outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" required>
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
                  <Label htmlFor="location" required>
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
                  <legend className="mb-3 font-display text-xs font-medium text-gray-700">
                    Service/Request/What are you interested in?{" "}
                    <span className="text-red-500">*</span>
                  </legend>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {enquiryOptions.map((option) => (
                      <label
                        key={option}
                        className="flex min-h-[30px] cursor-pointer items-center gap-2 border border-gray-100 px-2 py-1.5 transition hover:bg-gray-50"
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
                          className="text-[10px] leading-tight text-gray-600"
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
                    className="rounded-sm bg-[#65b447] px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#559b3b] focus:outline-none focus:ring-2 focus:ring-[#65b447] focus:ring-offset-2"
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form
              onSubmit={handleSubmit}
              className="mx-auto rounded-md bg-white p-5 shadow-xl md:p-7"
            >
              <div className="space-y-4">
                <fieldset>
                  <legend className="mb-3 font-display text-xs font-medium text-gray-700">
                    Estimated Power Requirement{" "}
                    <span className="text-red-500">*</span>
                  </legend>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {powerOptions.map((option) => (
                      <label
                        key={option}
                        className="flex min-h-[30px] cursor-pointer items-center gap-2 border border-gray-100 px-2 py-1.5 transition hover:bg-gray-50"
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
                          className="text-[10px] leading-tight text-gray-600"
                        >
                          {option}
                        </Text>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-3 font-display text-xs font-medium text-gray-700">
                    Preferred Contact Method (select all options that apply){" "}
                    <span className="text-red-500">*</span>
                  </legend>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {contactMethodOptions.map((method) => (
                      <label
                        key={method}
                        className="flex min-h-[30px] cursor-pointer items-center gap-2 border border-gray-100 px-2 py-1.5 transition hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.contactMethods.includes(method)}
                          onChange={() => toggleContactMethod(method)}
                          className="h-3 w-3 accent-[#4b9f3b]"
                        />
                        <Text
                          size="xs"
                          className="text-[10px] leading-tight text-gray-600"
                        >
                          {method}
                        </Text>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <Label>Upload Supporting Documents (optional)</Label>
                  <label className="flex cursor-pointer flex-col items-center gap-1 rounded-sm border border-dashed border-gray-200 px-3 py-6 text-center transition hover:bg-gray-50">
                    <Text size="xs" className="text-[11px] text-gray-600">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </Text>
                    <Text size="xs" className="text-[10px] text-gray-400">
                      PNG, JPEG, or JPG (max. 3MB)
                    </Text>
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      className="hidden"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          file: e.target.files?.[0] ?? null,
                        }))
                      }
                    />
                  </label>
                  {formData.file && (
                    <Text size="xs" className="mt-1 text-[10px] text-gray-500">
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
                  <Text size="xs" className="text-[11px] text-gray-600">
                    I agree to be contacted regarding my inquiry.
                  </Text>
                </label>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-sm bg-gray-100 px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-wide text-gray-700 transition hover:bg-gray-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="rounded-sm bg-[#65b447] px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#559b3b] focus:outline-none focus:ring-2 focus:ring-[#65b447] focus:ring-offset-2"
                  >
                    Send Inquiry
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* SUCCESS MODAL */}
      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs rounded-md bg-white p-6 text-center shadow-xl"
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#65b447] text-white">
              ✓
            </div>
            <Heading level={4} className="mb-1 text-base text-gray-900">
              Inquiry sent
            </Heading>
            <Text
              size="xs"
              className="text-[11px] leading-relaxed text-gray-500"
            >
              Thank you for sending your inquiry. Someone from our team will
              reach out to you soon.
            </Text>
          </div>
        </div>
      )}
    </main>
  );
};

export default ContactPage;
