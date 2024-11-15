const Introducer = require('../models/Introducer');

exports.createIntroducer = async (req, res) => {
    const { introducerId, firstName, lastName, email, phone } = req.body;

    try {
        const existingIntroducer = await Introducer.findOne({ introducerId });
        if (existingIntroducer) {
            return res.status(400).json({ msg: 'Introducer ID already exists' });
        }

        const introducer = new Introducer({
            introducerId,
            firstName,
            lastName,
            email,
            phone
        });

        await introducer.save();
        res.status(201).json({ msg: 'Introducer created successfully', introducer });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllIntroducers = async (req, res) => {
    try {
        const introducers = await Introducer.find();
        res.json(introducers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateIntroducer = async (req, res) => {
    const { introducerId, firstName, lastName, email, phone } = req.body;

    try {
        const introducer = await Introducer.findOneAndUpdate(
            { introducerId },
            { firstName, lastName, email, phone },
            { new: true }
        );

        if (!introducer) {
            return res.status(404).json({ msg: 'Introducer not found' });
        }

        res.json({ msg: 'Introducer updated successfully', introducer });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteIntroducer = async (req, res) => {
    const { introducerId } = req.params;

    try {
        const introducer = await Introducer.findOneAndDelete({ introducerId });

        if (!introducer) {
            return res.status(404).json({ msg: 'Introducer not found' });
        }

        res.json({ msg: 'Introducer deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
