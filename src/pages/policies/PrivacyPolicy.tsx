import { Heading, Paragraph } from "../../components/Typography";

const privacyParagraphs = [
  "Global Performance Index, a company registered in Nigeria, is committed to protecting your personal data. This notice explains how we collect, use, and protect your data.",
  "We collect personal data such as name, email, phone number, and address when you register on our mobile application.",
  "We collect your precise or approximate location data when you use our app. Location data is used to enable core features such as booking rides, assigning drivers, tracking trip progress, and estimating pickup and drop-off points. You may disable location access at any time through your device settings, though this may limit app functionality.",
  "Your data may be used for providing and improving our services, processing transactions, sending service-related communications, and with your consent, sending promotional emails.",
  "We implement industry-standard security measures to protect your data. Your data is stored securely and is not shared with third parties without your consent, except as required by law or to deliver our core services.",
  "You have the right to access your data, request correction or deletion of your data, withdraw consent at any time, and opt-out of marketing emails by contacting us at support@gpi.ng.",
  "If you have questions about this privacy policy or how your data is handled, please contact us at support@gpi.ng.",
];

const PrivacyPolicyContent = () => {
  return (
    <section id="data-privacy-notice" className="mb-16">
      <Heading level={3} className="mb-6 text-text-primary">
        Data Privacy Notice
      </Heading>
      {privacyParagraphs.map((text, index) => (
        <Paragraph key={index} className="mb-4">
          {text}
        </Paragraph>
      ))}
    </section>
  );
};

export default PrivacyPolicyContent;
