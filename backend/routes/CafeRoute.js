import express from 'express';
import Cafe from '../models/Cafe.js';

const router = express.Router();

// Add a new cafe
router.post('/', async (req, res) => {
    const { name, totalTables } = req.body;
    if (!name || !totalTables) {
        return res.status(400).json({ error: 'Name and total tables are required' });
    }

    try {
        const cafe = new Cafe({ name, totalTables, reservedTables: 0 });

        await cafe.save();
        res.status(201).json(cafe);
    } catch (err) {
        res.status(500).json({ error: 'Error saving café' });
    }
});

// Get all cafes
// Get all cafes
router.get('/', async (req, res) => {
    try {
        const cafes = await Cafe.find();

        const formattedCafes = cafes.map(cafe => ({
            _id: cafe._id,
            name: cafe.name,
            totalTables: cafe.totalTables,
            reservedTables: cafe.reservedTables, // actual array
            reservedCount: cafe.reservedTables.filter(t => t !== 0).length

        }));

        res.json(formattedCafes);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching cafés' });
    }
});


// Get a specific cafe
router.get('/:id', async (req, res) => {
    try {
        const cafe = await Cafe.findById(req.params.id);
        if (!cafe) return res.status(404).json({ error: 'Cafe not found' });
        res.json(cafe);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching cafe' });
    }
});


// Get a specific cafe
router.put('/:id', async (req, res) => {
    const { name, totalTables } = req.body;

    try {
        const updatedCafe = await Cafe.findByIdAndUpdate(
            req.params.id,
            { name, totalTables },
            { new: true }
        );
        if (!updatedCafe) return res.status(404).json({ error: 'Cafe not found' });

        res.json(updatedCafe);
    } catch (err) {
        res.status(500).json({ error: 'Error updating café' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCafe = await Cafe.findByIdAndDelete(req.params.id);
        if (!deletedCafe) return res.status(404).json({ error: 'Cafe not found' });

        res.json({ message: 'Cafe deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting café' });
    }
});
// Book a single table
router.post('/book', async (req, res) => {
    const { cafeId, tableNumber } = req.body;

    if (!cafeId || !tableNumber) {
        return res.status(400).json({ error: 'cafeId and tableNumber are required' });
    }

    try {
        const cafe = await Cafe.findById(cafeId);
        if (!cafe) {
            return res.status(404).json({ error: 'Café not found' });
        }


        if (cafe.reservedTables.includes(tableNumber)) {
            return res.status(400).json({ error: `Table ${tableNumber} is already booked` });
        }

        cafe.reservedTables.push(tableNumber);
        await cafe.save();

        res.json({ message: `Table ${tableNumber} successfully booked at ${cafe.name}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during booking' });
    }
});



export default router;
