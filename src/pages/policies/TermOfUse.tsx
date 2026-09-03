import { Heading, Paragraph } from "../../components/Typography";

const privacyParagraphs = [
  {
    title: "Acceptable Use",
    content:
      "You agree to use this Site only for lawful purposes. You shall not:",
    items: [
      "Post or transmit any content that is defamatory, obscene, or illegal under the Cybercrimes Act 2015.",
      "Attempt to gain unauthorized access to our servers or the account of any third party users",
      "Use the Site to impersonate any person or entity.",
    ],
  },
  {
    title: "Intellectual Property Rights",
    content:
      "Unless otherwise stated, GPI owns the intellectual property rights for all material on this Site. You may view or print pages for your personal, non-commercial use, provided you do not republish, sell, rent, or sub-license material from the Site.",
  },
  {
    title: "User Accounts",
    content:
      "If you create an account, you are responsible for maintaining the confidentiality of your password and account details. We reserve the right to terminate accounts that violate these Terms or provide false information.",
  },
  {
    title: "Limitation of Liability",
    content:
      'To the maximum extent permitted by Nigerian law (including the FCCPA 2018), we are not liable for any direct or indirect loss or damage arising from your use of the Site. The Site is provided on an "as is" and "as available" basis.',
  },
  {
    title: "Privacy & Data Protection",
    content:
      "Your use of the Site is also governed by our Data Privacy Notice. We process your personal data in accordance with the Nigeria Data Protection Act (NDPA) 2023.",
  },
  {
    title: "Governing Law & Dispute Resolution",
    content:
      "These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms shall first be attempted to be resolved through good-faith negotiation, failing which the dispute shall be referred to mediation.",
  },
  {
    title: "Changes to These Terms",
    content:
      "We may revise these Terms at any time. Your continued use of the Site after changes are posted constitutes your acceptance of the new Terms.",
  },
];

const TermsOfServiceContent = () => {
  return (
    <section id="terms-of-use" className="mb-16">
      <Heading level={3} className="mb-6 text-text-primary">
        Terms of Use
      </Heading>
      <Paragraph className="mb-4">
       These Terms of Use ("Terms") govern your access to and use of our website, located at www.Weni.com (the “Site”). By accessing or using the Site, you agree to be bound by these Terms.
      </Paragraph>
      {privacyParagraphs.map((text, index) => (
        <div key={index} className="mb-6">
          <Heading level={4} className="mb-4 text-text-primary">
            {text.title}
          </Heading>
          <Paragraph className="mb-2">{text.content}</Paragraph>
          {text.items && (
            <div className="flex flex-col gap-1 mt-2">
              {text.items.map((item, i) => (
                <Paragraph key={i}>
                  {String.fromCharCode(97 + i)}. {item}
                </Paragraph>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default TermsOfServiceContent;
