import nodeMailer from "nodemailer";
export const sendEmail = async ({ email, subject, message }) => {
  try {
    console.log(`Attempting to send email to: ${email}`);

    const transporter = nodeMailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    console.log("Transporter created successfully.");

    const options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      text: message,
    };

    console.log("Sending email with options:", options);

    const info = await transporter.sendMail(options);
    console.log(`Email sent successfully! Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Email sending error:", error);
  }
};
