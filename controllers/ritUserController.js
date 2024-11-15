const RitUser = require('../models/RitUser');

exports.createRitUser = async (req, res) => {
    const { userId, firstName, lastName, email, phone } = req.body;

    try {
        const existingUser = await RitUser.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({ msg: 'User ID already exists' });
        }

        const ritUser = new RitUser({
            userId,
            firstName,
            lastName,
            email,
            phone
        });

        await ritUser.save();
        res.status(201).json({ msg: 'User created successfully', ritUser });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllRitUsers = async (req, res) => {
    try {
        const ritUsers = await RitUser.find();
        res.json(ritUsers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateRitUser = async (req, res) => {
    const { userId, firstName, lastName, email, phone } = req.body;

    try {
        const ritUser = await RitUser.findOneAndUpdate(
            { userId },
            { firstName, lastName, email, phone },
            { new: true }
        );

        if (!ritUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ msg: 'User updated successfully', ritUser });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteRitUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const ritUser = await RitUser.findOneAndDelete({ userId });

        if (!ritUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
