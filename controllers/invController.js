const InvVerify = require('../models/InvVerify');

// Here's how to test each endpoint with Postman:

// POST /api/invverify
exports.createInvVerify = async (req, res) => {
    /*
    Test in Postman:
    Method: POST
    URL: http://localhost:3000/api/invverify
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "persianName": "نام فارسی",
        "englishName": "English Name",
        "requestFrom": "Doctor",
        "paymentDate": "2023-07-20",
        "deliveryDateToDoctor": "2023-08-01",
        "documents": {
            "files": ["path/to/file1", "path/to/file2"],
            "isApproved": false
        },
        "namesDeliveryDate": "2023-08-15"
    }
    */
    const { userId, introducerId, persianName, englishName, requestFrom,
            paymentDate, deliveryDateToDoctor, documents, namesDeliveryDate } = req.body;

    try {
        const invVerify = new InvVerify({
            userId,
            introducerId,
            persianName,
            englishName,
            requestFrom,
            paymentDate,
            deliveryDateToDoctor,
            documents,
            namesDeliveryDate
        });

        await invVerify.save();
        res.status(201).json({ msg: 'Investment verification created successfully', invVerify });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// GET /api/invverify/:id
exports.getInvVerifyById = async (req, res) => {
    /*
    Test in Postman:
    Method: GET
    URL: http://localhost:3000/api/invverify/[invverify_id]
    */
    try {
        const invVerify = await InvVerify.findById(req.params.id);

        if (!invVerify) {
            return res.status(404).json({ msg: 'Investment verification not found' });
        }

        res.json(invVerify);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// GET /api/invverify
exports.getAllInvVerify = async (req, res) => {
    /*
    Test in Postman:
    Method: GET
    URL: http://localhost:3000/api/invverify
    */
    try {
        const invVerifies = await InvVerify.find();
        res.json(invVerifies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// PUT /api/invverify/:id
exports.updateInvVerify = async (req, res) => {
    /*
    Test in Postman:
    Method: PUT
    URL: http://localhost:3000/api/invverify/[invverify_id]
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "persianName": "نام فارسی جدید",
        "englishName": "New English Name",
        "requestFrom": "Updated Doctor",
        "paymentDate": "2023-07-25",
        "deliveryDateToDoctor": "2023-08-15",
        "documents": {
            "files": ["path/to/newfile1", "path/to/newfile2"],
            "isApproved": true
        },
        "namesDeliveryDate": "2023-09-01"
    }
    */
    const { userId, introducerId, persianName, englishName, requestFrom,
            paymentDate, deliveryDateToDoctor, documents, namesDeliveryDate } = req.body;

    try {
        const invVerify = await InvVerify.findByIdAndUpdate(
            req.params.id,
            {
                userId,
                introducerId,
                persianName,
                englishName,
                requestFrom,
                paymentDate,
                deliveryDateToDoctor,
                documents,
                namesDeliveryDate
            },
            { new: true }
        );

        if (!invVerify) {
            return res.status(404).json({ msg: 'Investment verification not found' });
        }

        res.json({ msg: 'Investment verification updated successfully', invVerify });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// DELETE /api/invverify/:id
exports.deleteInvVerify = async (req, res) => {
    /*
    Test in Postman:
    Method: DELETE
    URL: http://localhost:3000/api/invverify/[invverify_id]
    */
    try {
        const invVerify = await InvVerify.findByIdAndDelete(req.params.id);

        if (!invVerify) {
            return res.status(404).json({ msg: 'Investment verification not found' });
        }

        res.json({ msg: 'Investment verification deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};