const Production = require('../models/Production');

// Here's how to test each endpoint with Postman:

// POST /api/manufacturers
exports.createManufacturer = async (req, res) => {
    /*
    Test in Postman:
    Method: POST
    URL: http://localhost:3000/api/manufacturers
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "programType": "Manufacturing Program",
        "technicalTeamPrice": 1000,
        "executiveTeamPrice": 500,
        "paymentDeadline": "2023-08-01",
        "paymentDate": "2023-07-20",
        "paymentInstallments": 2,
        "queuePosition": 1,
        "ritShare": 500,
        "ritMembersShare": 500
    }
    */
    const { userId, introducerId, programType, technicalTeamPrice, executiveTeamPrice,
            paymentDeadline, paymentDate, paymentInstallments, queuePosition,
            ritShare, ritMembersShare } = req.body;

    try {
        const production = new Production({
            userId,
            introducerId,
            programType,
            technicalTeamPrice,
            executiveTeamPrice,
            paymentDeadline,
            paymentDate,
            paymentInstallments,
            queuePosition,
            ritShare,
            ritMembersShare
        });

        await production.save();
        res.status(201).json({ msg: 'Manufacturing program created successfully', production });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// GET /api/manufacturers
exports.getAllManufacturers = async (req, res) => {
    /*
    Test in Postman:
    Method: GET
    URL: http://localhost:3000/api/manufacturers
    */
    try {
        const productions = await Production.find();
        res.json(productions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// PUT /api/manufacturers/:id
exports.updateManufacturer = async (req, res) => {
    /*
    Test in Postman:
    Method: PUT
    URL: http://localhost:3000/api/manufacturers/[production_id]
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "programType": "Updated Manufacturing Program",
        "technicalTeamPrice": 1500,
        "executiveTeamPrice": 750,
        "paymentDeadline": "2023-08-15",
        "paymentDate": "2023-07-25",
        "paymentInstallments": 1,
        "queuePosition": 2,
        "ritShare": 750,
        "ritMembersShare": 750
    }
    */
    const { userId, introducerId, programType, technicalTeamPrice, executiveTeamPrice,
            paymentDeadline, paymentDate, paymentInstallments, queuePosition,
            ritShare, ritMembersShare } = req.body;

    try {
        const production = await Production.findByIdAndUpdate(
            req.params.id,
            {
                userId,
                introducerId,
                programType,
                technicalTeamPrice,
                executiveTeamPrice,
                paymentDeadline,
                paymentDate,
                paymentInstallments,
                queuePosition,
                ritShare,
                ritMembersShare
            },
            { new: true }
        );

        if (!production) {
            return res.status(404).json({ msg: 'Manufacturing program not found' });
        }

        res.json({ msg: 'Manufacturing program updated successfully', production });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// DELETE /api/manufacturers/:id
exports.deleteManufacturer = async (req, res) => {
    /*
    Test in Postman:
    Method: DELETE
    URL: http://localhost:3000/api/manufacturers/[production_id]
    */
    try {
        const production = await Production.findByIdAndDelete(req.params.id);

        if (!production) {
            return res.status(404).json({ msg: 'Manufacturing program not found' });
        }

        res.json({ msg: 'Manufacturing program deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};