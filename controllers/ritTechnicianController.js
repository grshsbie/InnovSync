const RitTechnician = require('../models/RitTechnician');

exports.createRitTechnician = async (req, res) => {
    const { technicianId, firstName, lastName, email, phone } = req.body;

    try {
        const existingTechnician = await RitTechnician.findOne({ technicianId });
        if (existingTechnician) {
            return res.status(400).json({ msg: 'Technician ID already exists' });
        }

        const ritTechnician = new RitTechnician({
            technicianId,
            firstName,
            lastName,
            email,
            phone
        });

        await ritTechnician.save();
        res.status(201).json({ msg: 'Technician created successfully', ritTechnician });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllRitTechnicians = async (req, res) => {
    try {
        const technicians = await RitTechnician.find();
        res.json(technicians);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateRitTechnician = async (req, res) => {
    const { technicianId, firstName, lastName, email, phone } = req.body;

    try {
        const ritTechnician = await RitTechnician.findOneAndUpdate(
            { technicianId },
            { firstName, lastName, email, phone },
            { new: true }
        );

        if (!ritTechnician) {
            return res.status(404).json({ msg: 'Technician not found' });
        }

        res.json({ msg: 'Technician updated successfully', ritTechnician });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteRitTechnician = async (req, res) => {
    const { technicianId } = req.params;

    try {
        const ritTechnician = await RitTechnician.findOneAndDelete({ technicianId });

        if (!ritTechnician) {
            return res.status(404).json({ msg: 'Technician not found' });
        }

        res.json({ msg: 'Technician deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
