import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
			index: true,
		},
		title: {
			type: String,
			required: [true, "Chat title is required"],
			trim: true,
			maxlength: [120, "Chat title cannot exceed 120 characters"],
			default: "New Chat",
		},
	},
	{
		timestamps: true,
	}
);

const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;
