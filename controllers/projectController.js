const Project = require('../models/Project');
const RitUser = require('../models/RitUser');
const RitTechnician = require('../models/RitTechnician');
const Product = require('../models/Product');

exports.createProject = async (req, res) => {
    const {
        title,
        ritUserId,
        introducerId,
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
    } = req.body;

    try {
        // Validate if ritUserId, ritTechnicianId, and productType exist
        const ritUser = await RitUser.findOne({ userId: ritUserId });
        const ritTechnician = await RitTechnician.findOne({ technicianId: ritTechnicianId });
        const product = await Product.findOne({ productId: productType });

        if (!ritUser || !ritTechnician || !product) {
            return res.status(400).json({ msg: 'Invalid ritUserId, ritTechnicianId, or productType' });
        }

        const project = new Project({
            title,
            ritUserId,
            introducerId,
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
        res.status(201).json({ msg: 'Project created successfully', project });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



exports.getProjectWithDetails = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        const ritUser = await RitUser.findOne({ userId: project.ritUserId });
        const ritTechnician = await RitTechnician.findOne({ technicianId: project.ritTechnicianId });
        const product = await Product.findOne({ productId: project.productType });

        res.json({
            project,
            ritUser,
            ritTechnician,
            product
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.updateProject = async (req, res) => {
    const {
        title,
        ritUserId,
        introducerId,
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
    } = req.body;

    try {
        // Validate if ritUserId, ritTechnicianId, and productType exist
        const ritUser = await RitUser.findOne({ userId: ritUserId });
        const ritTechnician = await RitTechnician.findOne({ technicianId: ritTechnicianId });
        const product = await Product.findOne({ productId: productType });

        if (!ritUser || !ritTechnician || !product) {
            return res.status(400).json({ msg: 'Invalid ritUserId, ritTechnicianId, or productType' });
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                title,
                ritUserId,
                introducerId,
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

        if (!project) return res.status(404).json({ msg: 'Project not found' });

        res.json({ msg: 'Project updated successfully', project });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        res.json({ msg: 'Project deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

