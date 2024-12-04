const Project = require('../models/Project');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'mail.mastercodelab.codes',
  secure: false,
  auth: {
    user: 'masterco',
    pass: 'VwUl5-y1;5KO5v'
  }
});

// Here's how to test each endpoint with Postman:

// POST /api/projects
exports.createProduct = async (req, res) => {
    /*
    Test in Postman:
    Method: POST
    URL: http://localhost:3000/api/projects
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "title": "Project Title",
        "userId": 123,
        "introducerId": 456,
        "emailRelatedToUser": "user@example.com",
        "price": 1000,
        "settlementDate": "2023-07-20",
        "startDate": "2023-07-21",
        "deliveryDate": "2023-07-25",
        "deadlineDate": "2023-07-30",
        "ritTechnicianId": 789,
        "productType": 1,
        "campaignName": "Campaign 1",
        "paymentParts": [
            {
                "partNumber": 1,
                "amount": 500
            },
            {
                "partNumber": 2,
                "amount": 500
            }
        ],
        "stages": [
            {
                "stageId": "stage1",
                "title": "Planning",
                "defaultStatus": "Pending",
                "statusOptions": ["Pending", "In Progress", "Complete"],
                "status": "Pending"
            }
        ]
    }
    */
    const { title, userId, introducerId, emailRelatedToUser, price, settlementDate, startDate, deliveryDate,
            deadlineDate, ritTechnicianId, productType, campaignName, paymentParts, stages } = req.body;

    try {
        const project = new Project({
            title,
            userId,
            introducerId,
            emailRelatedToUser,
            price,
            settlementDate,
            startDate,
            deliveryDate,
            deadlineDate,
            ritTechnicianId,
            productType,
            campaignName,
            paymentParts,
            stages
        });

        await project.save();

        // Send email notification
        await transporter.sendMail({
            from: 'masterco@mastercodelab.codes',
            to: emailRelatedToUser,
            subject: 'New Project Created',
            text: `A new project "${title}" has been created.`
        });

        res.status(201).json({ msg: 'Project created successfully', project });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// GET /api/projects
exports.getAllProducts = async (req, res) => {
    /*
    Test in Postman:
    Method: GET
    URL: http://localhost:3000/api/projects
    */
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// PUT /api/projects/:id
exports.updateProduct = async (req, res) => {
    /*
    Test in Postman:
    Method: PUT
    URL: http://localhost:3000/api/projects/[project_id]
    Headers: Content-Type: application/json
    Body (raw JSON):
    {
        "title": "Updated Project",
        "userId": 123,
        "introducerId": 456,
        "emailRelatedToUser": "user@example.com",
        "price": 1500,
        "settlementDate": "2023-07-22",
        "startDate": "2023-07-23",
        "deliveryDate": "2023-07-26",
        "deadlineDate": "2023-07-31",
        "ritTechnicianId": 789,
        "productType": 2,
        "campaignName": "Campaign 2",
        "paymentParts": [
            {
                "partNumber": 1,
                "amount": 750
            },
            {
                "partNumber": 2,
                "amount": 750
            }
        ],
        "stages": [
            {
                "stageId": "stage1",
                "title": "Planning",
                "defaultStatus": "Complete",
                "statusOptions": ["Pending", "In Progress", "Complete"],
                "status": "Complete"
            }
        ]
    }
    */
    const { title, userId, introducerId, emailRelatedToUser, price, settlementDate, startDate, deliveryDate,
            deadlineDate, ritTechnicianId, productType, campaignName, paymentParts, stages } = req.body;

    try {
        const oldProject = await Project.findById(req.params.id);
        if (!oldProject) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                title,
                userId,
                introducerId,
                emailRelatedToUser,
                price,
                settlementDate,
                startDate,
                deliveryDate,
                deadlineDate,
                ritTechnicianId,
                productType,
                campaignName,
                paymentParts,
                stages
            },
            { new: true }
        );

        // Send email notification for status changes
        const statusChanged = stages.some((stage, index) => {
            const oldStage = oldProject.stages[index];
            return oldStage && stage.status !== oldStage.status;
        });

        if (statusChanged) {
            await transporter.sendMail({
                from: 'masterco@mastercodelab.codes',
                to: emailRelatedToUser,
                subject: 'Project Status Updated',
                text: `The status of project "${title}" has been updated.`
            });
        }

        res.json({ msg: 'Project updated successfully', project });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// DELETE /api/projects/:id
exports.deleteProduct = async (req, res) => {
    /*
    Test in Postman:
    Method: DELETE
    URL: http://localhost:3000/api/projects/[project_id]
    */
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        await Project.findByIdAndDelete(req.params.id);

        // Send email notification
        await transporter.sendMail({
            from: 'masterco@mastercodelab.codes',
            to: project.emailRelatedToUser,
            subject: 'Project Deleted',
            text: `The project "${project.title}" has been deleted.`
        });

        res.json({ msg: 'Project deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};