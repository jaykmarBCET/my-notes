import mongoose from "mongoose";

const PageSchema = new mongoose.Schema(
    {
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
            index: true
        },
        title: {
            type: String,
            required: true, 
            trim: true, 
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Page = mongoose.models.Page || mongoose.model("Page", PageSchema);

export { Page};
