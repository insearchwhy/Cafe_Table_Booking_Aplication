import mongoose from 'mongoose';

const cafeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalTables: { type: Number, required: true },
    reservedTables: { type: [Number],         default: []     // NOT [0] !!
    },
});
export default mongoose.model('cafes', cafeSchema);
