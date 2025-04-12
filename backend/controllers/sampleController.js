import Sample from '../models/Sample.js';

export const getSamples = async (req, res) => {
    const data = await Sample.find();
    res.json(data);
};

export const createSample = async (req, res) => {
    const { name } = req.body;
    const newSample = new Sample({ name });
    await newSample.save();
    res.status(201).json(newSample);
};
