const TechnicalTrainingCourses = require('../models/TechnicalTrainingCourses');

// Here's how to test each endpoint with Postman:

// POST /api/training-courses
exports.createProduct = async (req, res) => {
    /*
    Test in Postman:
    Method: POST
    URL: http://localhost:3000/api/training-courses
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "payableAmount": {
            "value": 1000,
            "currency": "USD"
        },
        "RITMembersShare": 30,
        "courseCosts": 200,
        "instructorSharePercentage": 40
    }
    */
    const { userId, introducerId, payableAmount, RITMembersShare,
            courseCosts, instructorSharePercentage } = req.body;

    try {
        const technicalCourse = new TechnicalTrainingCourses({
            userId,
            introducerId,
            payableAmount,
            RITMembersShare,
            courseCosts,
            instructorSharePercentage
        });

        await technicalCourse.save();
        res.status(201).json({ msg: 'Technical training course created successfully', technicalCourse });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// GET /api/training-courses
exports.getAllProducts = async (req, res) => {
    /*
    Test in Postman:
    Method: GET
    URL: http://localhost:3000/api/training-courses
    */
    try {
        const technicalCourses = await TechnicalTrainingCourses.find();
        res.json(technicalCourses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// PUT /api/training-courses/:id
exports.updateProduct = async (req, res) => {
    /*
    Test in Postman:
    Method: PUT
    URL: http://localhost:3000/api/training-courses/[course_id]
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "payableAmount": {
            "value": 1500,
            "currency": "USD"
        },
        "RITMembersShare": 35,
        "courseCosts": 300,
        "instructorSharePercentage": 45
    }
    */
    const { userId, introducerId, payableAmount, RITMembersShare,
            courseCosts, instructorSharePercentage } = req.body;

    try {
        const technicalCourse = await TechnicalTrainingCourses.findByIdAndUpdate(
            req.params.id,
            {
                userId,
                introducerId,
                payableAmount,
                RITMembersShare,
                courseCosts,
                instructorSharePercentage
            },
            { new: true }
        );

        if (!technicalCourse) {
            return res.status(404).json({ msg: 'Technical training course not found' });
        }

        res.json({ msg: 'Technical training course updated successfully', technicalCourse });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// DELETE /api/training-courses/:id
exports.deleteProduct = async (req, res) => {
    /*
    Test in Postman:
    Method: DELETE
    URL: http://localhost:3000/api/training-courses/[course_id]
    */
    try {
        const technicalCourse = await TechnicalTrainingCourses.findByIdAndDelete(req.params.id);

        if (!technicalCourse) {
            return res.status(404).json({ msg: 'Technical training course not found' });
        }

        res.json({ msg: 'Technical training course deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};