import mongoose, { Schema, Document, Types } from 'mongoose';
import { IFeed } from './feed.interface';

export interface IFeedDocument extends Omit<IFeed, 'id'>, Document {
  _id: Types.ObjectId; 
}

const FeedSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    source: { type: String, required: true },
    date: { type: Date, required: true },
    category: {
        type: String,
        enum: ["politica", "deportes", "tecnologia", "economia", "otros"],
        required: true
    },
    picture: { type: String, required: false },
    featured: { type: Boolean, required: true }
});

const FeedModel = mongoose.model<IFeedDocument>('Feed', FeedSchema);
export default FeedModel;
