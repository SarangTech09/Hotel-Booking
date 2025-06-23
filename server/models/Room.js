import mongoose from "mongoose";

const roomScema = mongoose.Schema({
    hotel: {type: String, ref: "Hotel", required: true},
    roomType: {type: String, required: true},
    pricePerNight: {type: Number, required: true},
    amenities: {type: Array, required: true},
    images: [{ type: String}],
    isAvailable: {type: Boolean, default: true},

},{timestamps: true})


const Room = mongoose.model("Room", roomScema);

export default Room;