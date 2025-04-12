import mongoose from 'mongoose';

const sampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Sample = mongoose.model('Sample', sampleSchema);

export default Sample;
