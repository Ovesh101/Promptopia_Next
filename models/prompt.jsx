import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required"],
        maxlength: [500, "Prompt cannot exceed 300 characters"]
    },
    tag: {
        type: [String],
        required: [true, "At least one tag is required"]
    }
});

const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
export default Prompt;
