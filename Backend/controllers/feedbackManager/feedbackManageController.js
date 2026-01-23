import Feedback from "../../models/FeedbackManager/FeedbackSchema.js";
import nodemailer from 'nodemailer';

export const updateAdminMessage = async (req, res) => {
  const { id } = req.params; 
  const { serviceIndex, message , type} = req.body;

  try {
    const feedback = await Feedback.findById(id);
    
    if (!feedback) return res.status(404).json({ message: "Feedback record not found" });

    if (!feedback.services || !feedback.services[serviceIndex]) {
      return res.status(400).json({ 
        message: `Service at index ${serviceIndex} not found in this feedback document.` 
      });
    }

    if (type === "video") {
      feedback.services[serviceIndex].videoLink = value;
    } else {
      feedback.services[serviceIndex].adminMessage = value;
    }
    await feedback.save();
    res.status(200).json({ message: "Message saved successfully!", feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientFeedbackDetails = async (req, res) => {
  const { token } = req.params;

  try {
    const feedback = await Feedback.findOne({ token, status: "pending" });
    
    if (!feedback) {
      return res.status(404).json({ message: "Invalid link or feedback already submitted." });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendFeedbackMail = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Fetch the feedback details
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback record not found" });
    }

    // 2. Create Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Generate the Feedback Link
    // This uses the 'token' field defined in your Mongoose schema
    const feedbackUrl = `${process.env.FRONTEND_URL}/feedback-form/${feedback.token}`;

    // 4. Define Email Content
    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: feedback.email,
      subject: `Feedback Request for Invoice: ${feedback.invoiceNo}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2>Hello ${feedback.clientName},</h2>
          <p>Thank you for choosing <b>${feedback.companyName}</b>. We value your partnership.</p>
          <p>Could you please take a moment to rate the services we provided for Invoice <b>#${feedback.invoiceNo}</b>?</p>
          <div style="margin: 30px 0;">
            <a href="${feedbackUrl}" 
               style="background-color: #4972E8; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
               Submit Your Feedback
            </a>
          </div>
          <p>If the button doesn't work, copy and paste this link:</p>
          <p>${feedbackUrl}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `,
    };

    // 5. Send the Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Feedback email sent successfully!" });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ message: "Failed to send email. Check server logs." });
  }
};