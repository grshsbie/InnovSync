const Competition = require('../models/Competitions');

// Here's how to test each endpoint with Postman:

// POST /api/competitions
exports.createCompetition = async (req, res) => {
    /*
    Test in Postman:
    Method: POST
    URL: http://localhost:3000/api/competitions
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "competitionName": "Design Competition 2023",
        "websiteDesign": true,
        "englishLanguage": false,
        "boxAndFoamDesign": true,
        "productPhotography": true,
        "personalPhotography": false,
        "videoRecording": true,
        "videoEditingAndRecording": true,
        "technicalDrawingRender": false
    }
    */
    const { userId, introducerId, competitionName, websiteDesign, englishLanguage,
            boxAndFoamDesign, productPhotography, personalPhotography,
            videoRecording, videoEditingAndRecording, technicalDrawingRender } = req.body;

    try {
        const competition = new Competition({
            userId,
            introducerId,
            competitionName,
            websiteDesign,
            englishLanguage,
            boxAndFoamDesign,
            productPhotography,
            personalPhotography,
            videoRecording,
            videoEditingAndRecording,
            technicalDrawingRender
        });

        await competition.save();
        res.status(201).json({ msg: 'Competition created successfully', competition });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// GET /api/competitions
exports.getAllCompetitions = async (req, res) => {
    /*
    Test in Postman:
    Method: GET
    URL: http://localhost:3000/api/competitions
    */
    try {
        const competitions = await Competition.find();
        res.json(competitions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// GET /api/competitions/:id
exports.getCompetitionById = async (req, res) => {
    /*
    Test in Postman:
    Method: GET
    URL: http://localhost:5000/api/competitions/competitions/67594bf462d702c6d706e406
    */
    try {
        const competition = await Competition.findById(req.params.id);

        if (!competition) {
            return res.status(404).json({ msg: 'Competition not found' });
        }

        res.json(competition);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Competition not found' });
        }
        res.status(500).send('Server error');
    }
};

// PUT /api/competitions/:id
exports.updateCompetition = async (req, res) => {
    /*
    Test in Postman:
    Method: PUT
    URL: http://localhost:3000/api/competitions/[competition_id]
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "userId": 123,
        "introducerId": 456,
        "competitionName": "Updated Design Competition 2023",
        "websiteDesign": true,
        "englishLanguage": true,
        "boxAndFoamDesign": true,
        "productPhotography": false,
        "personalPhotography": true,
        "videoRecording": true,
        "videoEditingAndRecording": false,
        "technicalDrawingRender": true
    }
    */
    const { userId, introducerId, competitionName, websiteDesign, englishLanguage,
            boxAndFoamDesign, productPhotography, personalPhotography,
            videoRecording, videoEditingAndRecording, technicalDrawingRender } = req.body;

    try {
        const competition = await Competition.findByIdAndUpdate(
            req.params.id,
            {
                userId,
                introducerId,
                competitionName,
                websiteDesign,
                englishLanguage,
                boxAndFoamDesign,
                productPhotography,
                personalPhotography,
                videoRecording,
                videoEditingAndRecording,
                technicalDrawingRender
            },
            { new: true }
        );

        if (!competition) {
            return res.status(404).json({ msg: 'Competition not found' });
        }

        res.json({ msg: 'Competition updated successfully', competition });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// DELETE /api/competitions/:id
exports.deleteCompetition = async (req, res) => {
    /*
    Test in Postman:
    Method: DELETE
    URL: http://localhost:3000/api/competitions/[competition_id]
    */
    try {
        const competition = await Competition.findByIdAndDelete(req.params.id);

        if (!competition) {
            return res.status(404).json({ msg: 'Competition not found' });
        }

        res.json({ msg: 'Competition deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};