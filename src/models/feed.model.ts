import mongoose, { Schema, Document, Types } from 'mongoose';
import { IFeed } from './feed.interface';

export interface IFeedDocument extends Omit<IFeed, 'id'>, Document {
  _id: Types.ObjectId; 
}

const FeedSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    url: { type: String, required: true },
    fuente: { type: String, required: true },
    fecha: { type: Date, required: true },
    categoria: {
        type: String,
        enum: ["politica", "deportes", "tecnologia", "economia", "otros"],
        required: true
    },
    imagen: { type: String, required: false },
    destacada: { type: Boolean, required: true }
});

const FeedModel = mongoose.model<IFeedDocument>('Feed', FeedSchema);
export default FeedModel;
