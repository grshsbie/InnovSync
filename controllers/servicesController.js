const Service = require('../models/Services');


// POST /api/services
exports.createService = async (req, res) => {
    /*
    Test in Postman:
    Method: POST
    URL: http://localhost:3000/api/services
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "depositDate": "2023-07-20",
        "serviceType": "website_design",
        "competitionName": "Website Redesign Project",
        "ritShare": 500,
        "ritMembersShare": 500,
        "expenses": 200,
        "depositAmount": 1000,
        "currency": "toman"
    }
    */
    const { userId, introducerId, depositDate, serviceType, competitionName, ritShare,
            ritMembersShare, expenses, depositAmount, currency } = req.body;

    try {
        const service = new Service({
            userId,
            introducerId,
            depositDate,
            serviceType,
            competitionName,
            ritShare,
            ritMembersShare,
            expenses,
            depositAmount,
            currency
        });

        await service.save();
        res.status(201).json({ msg: 'Service created successfully', service });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// GET /api/services
exports.getAllServices = async (req, res) => {
    /*
    Test in Postman:
    Method: GET
    URL: http://localhost:3000/api/services
    */
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// GET /api/services/:id
exports.getServiceById = async (req, res) => {
    /*
    Test in Postman:
    Method: GET
    URL: http://localhost:3000/api/services/[service_id]
    */
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// PUT /api/services/:id
exports.updateService = async (req, res) => {
    /*
    Test in Postman:
    Method: PUT
    URL: http://localhost:3000/api/services/[service_id]
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "depositDate": "2023-07-22",
        "serviceType": "english_language",
        "competitionName": "Translation Project",
        "ritShare": 750,
        "ritMembersShare": 750,
        "expenses": 300,
        "depositAmount": 1500,
        "currency": "rial"
    }
    */
    const { userId, introducerId, depositDate, serviceType, competitionName, ritShare,
            ritMembersShare, expenses, depositAmount, currency } = req.body;

    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            {
                userId,
                introducerId,
                depositDate,
                serviceType,
                competitionName,
                ritShare,
                ritMembersShare,
                expenses,
                depositAmount,
                currency
            },
            { new: true }
        );

        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        res.json({ msg: 'Service updated successfully', service });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// DELETE /api/services/:id
exports.deleteService = async (req, res) => {
    /*
    Test in Postman:
    Method: DELETE
    URL: http://localhost:3000/api/services/[service_id]
    */
    try {
        const service = await Service.findByIdAndDelete(req.params.id);

        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        res.json({ msg: 'Service deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

