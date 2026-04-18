import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
			required: [true, "Chat is required"],
			index: true,
		},
		content: {
			type: String,
			required: [true, "Message content is required"],
			trim: true,
		},
		role: {
			type: String,
			enum: ["ai", "user"],
			required: [true, "Role is required"],
		},
	},
	{
		timestamps: true,
	}
);


const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
