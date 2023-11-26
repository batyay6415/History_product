import mongoose from "mongoose";

// 1. Interface representing our model:
export interface IHistoryModel extends mongoose.Document {
    // We do not declare the _id
    name: string;
    price: number;
    stock: number;
    categoryId: mongoose.Schema.Types.ObjectId;

}

// 2. Schema built on the interface, containing more things:
export const HistorySchema = new mongoose.Schema<IHistoryModel>({
  
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Missing name."],
        minlength: [2, "Name too short."],
        maxlength: [100, "Name too long."],
    },
    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [0, "Price can't be negative."],
        max: [1000, "Price can't exceed 1000."]
    },
    stock: {
        type: Number,
        required: [true, "Missing stock."],
        min: [0, "Stock can't be negative."],
        max: [1000, "Stock can't exceed 1000."]
    },
    categoryId: mongoose.Schema.Types.ObjectId
}, {
    versionKey: false

});

// 3. Model - The final class:
export const HistoryModel = mongoose.model<IHistoryModel>("HistoryModel", HistorySchema, "deleted-products"); // Model name, Schema, collection name
