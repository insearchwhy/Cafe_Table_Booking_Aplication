import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;
const JWT_SECRET = 'yourSecretKey';
import dotenv from 'dotenv';
dotenv.config();
app.use(cors());
app.use(express.json());
import cafeRoutes from './routes/CafeRoute.js';

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

const User = mongoose.model('User', userSchema);

// Register route
app.post('/api/auth/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role: 'user', // default role
        });
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;



        const existingAdmin = await User.findOne({ email: 'admin@cafe.com' });
        if (existingAdmin) {

        } else {
            const hashedPassword = await bcrypt.hash('admin123', 10);

            const adminUser = new User({
                name: 'Admin',
                email: 'admin@cafe.com',
                password: hashedPassword,
                role: 'admin'
            });

            await adminUser.save();

        }



    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
        token,
        role: user.role,
        name: user.name,
    });
});
app.use('/api/cafes', cafeRoutes)
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
