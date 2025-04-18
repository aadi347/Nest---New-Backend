import ContactUs from '../models/Contact.js';

export const contactAdmin = async (req, res) => {
  try {
    const { email, name, phone, message } = req.body;

    const contact = new ContactUs({
      email,
      name,
      phone,
      message,
    });

    await contact.save();
    res.status(201).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}