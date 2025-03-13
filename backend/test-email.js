

import { sendEmail } from "./utils/sendEmail.js";


console.log("SMTP_MAIL:", process.env.SMTP_MAIL);
console.log("SMTP_PASSWORD:", process.env.SMTP_PASSWORD);


sendEmail({
  email: "joeltskariya2003@gmail.com",
  subject: "Test Email",
  message: "Hello, this is a test email!"
})
  .then(() => console.log("Test email sent successfully!"))
  .catch((error) => console.error("Test email failed:", error));
