import axios from "axios";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: process.env.FROM_EMAIL },  // your verified Brevo email
        to: [{ email }],
        subject,
        htmlContent: message,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,     // Brevo Transactional Email API key
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error.response?.data || error.message);
    throw error;
  }
};
