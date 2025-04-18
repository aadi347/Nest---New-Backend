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

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactUs.find();
        res.status(200).json({ success: true, contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

 export const deleteContactById = async (req, res) => {
    try {
      const deletedBlog = await ContactUs.findByIdAndDelete(req.params.id);
      if (!deletedBlog) return res.status(404).json({ message: "Contact not found" });
  
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };