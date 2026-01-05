import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
     const {userId} = await req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { name, address, contact, city } = req.body;
    
    const owner = userId;

    console.log("owner id:", owner);
    //console.log("req.body:", req.body);

    // Check if hotel already registered
    const existingHotel = await Hotel.findOne({ owner });

    if (existingHotel) {
      return res.json({
        success: false,
        message: "Hotel Already Registered",
      });
    }

    await Hotel.create({
      name,
      address,
      contact,
      city,
      owner,
    });

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.json({
      success: true,
      message: "Hotel Registered Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
