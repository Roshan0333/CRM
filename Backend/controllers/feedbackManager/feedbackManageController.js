import Feedback from "../../models/FeedbackManager/FeedbackSchema.js";
import nodemailer from 'nodemailer';


export const getAllFeedbacks = async(req,res) =>{
  try{
      const feedbacks = await Feedback.find().sort({createdAt : -1});
      res.status(200).json(feedbacks);
  }
  catch(error){
    console.error("BACKEND ERROR:", error);
    res.status(500).json({error : error.message})
  }
}

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
      feedback.services[serviceIndex].videoLink = message;
    } else {
      feedback.services[serviceIndex].adminMessage = message;
    }
    feedback.markModified('services');
    await feedback.save();
    res.status(200).json({ message: "Message saved successfully!", feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientFeedbackDetails = async (req, res) => {
  const { token } = req.params;

  try {
    const feedback = await Feedback.findOne({ token : token });
    
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
    const clientLink = `${process.env.FRONTEND_URL}/feedback-form/${feedback.token}`;

    // 4. Define Email Content
    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: feedback.email,
      subject: `Feedback Request for Invoice: ${feedback.invoiceNo}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2>Hello ${feedback.clientName},</h2>
          <p>Thank you for choosing <b>Graphura India Private Limited</b>. We value your partnership.</p>
          <p>Could you please take a moment to rate the services we provided for Invoice <b>#${feedback.invoiceNo}</b>?</p>
          <div style="margin: 30px 0;">
            <a href="${clientLink}" 
               style="background-color: #4972E8; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
               Submit Your Feedback
            </a>
          </div>
          <p>If the button doesn't work, copy and paste this link:</p>
          <p>${clientLink}</p>
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

export const submitClientFeedback = async (req, res) => {
  try {
    const { token } = req.params;
    const { ratings, clientComment } = req.body;

    const feedback = await Feedback.findOne({ token });
    if (!feedback) return res.status(404).json({ message: "Invalid token" });

    // Update each service rating based on the name
    feedback.services.forEach((service) => {
      if (ratings[service.name]) {
        service.rating = ratings[service.name];
      }
    });

    feedback.clientComment = clientComment;
    feedback.status = "completed"; // THIS MOVES IT TO YOUR COMPLETED TAB

    await feedback.save();
    res.status(200).json({ message: "Feedback saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Example Backend Snippet
export const uploadServiceFile = async (req, res) => {
  try {
    const { id } = req.params;
  const { serviceIndex } = req.body; // Multer puts this in req.body
  const file = req.file; // Multer puts the file here

  if (!file) return res.status(400).json({ message: "No file uploaded" });
  // 1. Find the feedback document
  const feedback = await Feedback.findOne({id});

  // Use MongoDB positional operator to update the specific service in the array
    const updateField = `services.${serviceIndex}.fileUrl`;
    
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { [updateField]: file.path }, // Save the path to the specific service
      { new: true }
    );

    res.status(200).json({ message: "File uploaded successfully", updatedFeedback });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};