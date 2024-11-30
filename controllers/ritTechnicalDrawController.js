const TechnicalMap = require('../models/TechnicalDrawing');

// Here's how to test each endpoint with Postman:

// POST /api/technical-maps
exports.createProduct = async (req, res) => {
    /*
    Test in Postman:
    Method: POST
    URL: http://localhost:3000/api/technical-draw/technical-draw
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "paymentAmount": 1000,
        "paymentDate": "2023-07-20",
        "sentToTechTeamDate": "2023-07-21",
        "ritShare": 500,
        "ritMembersShare": 500,
        "technicianId": 789,
        "drawingAmount": 200,
        "mapType": "Drafting for Declaration",
        "deliveryDate": "2023-07-25"
    }
    */
    const { userId, introducerId, paymentAmount, paymentDate, sentToTechTeamDate, ritShare,
            ritMembersShare, technicianId, drawingAmount, mapType, deliveryDate } = req.body;

    try {
        const technicalMap = new TechnicalMap({
            userId,
            introducerId,
            paymentAmount,
            paymentDate,
            sentToTechTeamDate,
            ritShare,
            ritMembersShare,
            technicianId,
            drawingAmount,
            mapType,
            deliveryDate
        });

        await technicalMap.save();
        res.status(201).json({ msg: 'Technical map created successfully', technicalMap });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// GET /api/technical-maps
exports.getAllProducts = async (req, res) => {
    /*
    Test in Postman:
    Method: GET
    URL: http://localhost:3000/api/technical-maps
    */
    try {
        const technicalMaps = await TechnicalMap.find();
        res.json(technicalMaps);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// PUT /api/technical-maps/:id
exports.updateProduct = async (req, res) => {
    /*
    Test in Postman:
    Method: PUT
    URL: http://localhost:3000/api/technical-maps/[technical_map_id]
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "paymentAmount": 1500,
        "paymentDate": "2023-07-22",
        "sentToTechTeamDate": "2023-07-23",
        "ritShare": 750,
        "ritMembersShare": 750,
        "technicianId": 789,
        "drawingAmount": 300,
        "mapType": "Feasibility Study with Manufacturing Capability",
        "deliveryDate": "2023-07-26"
    }
    */
    const { userId, introducerId, paymentAmount, paymentDate, sentToTechTeamDate, ritShare,
            ritMembersShare, technicianId, drawingAmount, mapType, deliveryDate } = req.body;

    try {
        const technicalMap = await TechnicalMap.findByIdAndUpdate(
            req.params.id,
            {
                userId,
                introducerId,
                paymentAmount,
                paymentDate,
                sentToTechTeamDate,
                ritShare,
                ritMembersShare,
                technicianId,
                drawingAmount,
                mapType,
                deliveryDate
            },
            { new: true }
        );

        if (!technicalMap) {
            return res.status(404).json({ msg: 'Technical map not found' });
        }

        res.json({ msg: 'Technical map updated successfully', technicalMap });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// DELETE /api/technical-maps/:id
exports.deleteProduct = async (req, res) => {
    /*
    Test in Postman:
    Method: DELETE
    URL: http://localhost:3000/api/technical-maps/[technical_map_id]
    */
    try {
        const technicalMap = await TechnicalMap.findByIdAndDelete(req.params.id);

        if (!technicalMap) {
            return res.status(404).json({ msg: 'Technical map not found' });
        }

        res.json({ msg: 'Technical map deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};