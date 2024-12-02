const technicalTrainingCoursesController = require('../controllers/technicalTrainingCoursesController');
const ritTechnicalDrawController = require('../controllers/ritTechnicalDrawController');
const servicesController = require('../controllers/servicesController');
const ritUserController = require('../controllers/ritUserController');
const ritTechnicianController = require('../controllers/ritTechnicianController');
const authMiddleware = require('../middlewares/authMiddleware');

const routes = [
    // Training Courses Routes
    {
        method: 'post',
        path: '/training-courses',
        middlewares: [authMiddleware],
        handler: technicalTrainingCoursesController.createProduct,
    },
    {
        method: 'get',
        path: '/training-courses',
        middlewares: [authMiddleware],
        handler: technicalTrainingCoursesController.getAllProducts,
    },
    {
        method: 'put',
        path: '/training-courses/:id',
        middlewares: [authMiddleware],
        handler: technicalTrainingCoursesController.updateProduct,
    },
    {
        method: 'delete',
        path: '/training-courses/:id',
        middlewares: [authMiddleware],
        handler: technicalTrainingCoursesController.deleteProduct,
    },

    // Technical Draw Routes
    {
        method: 'post',
        path: '/technical-draw',
        middlewares: [authMiddleware],
        handler: ritTechnicalDrawController.createProduct,
    },
    {
        method: 'get',
        path: '/technical-draw',
        middlewares: [authMiddleware],
        handler: ritTechnicalDrawController.getAllProducts,
    },
    {
        method: 'put',
        path: '/technical-draw/:id',
        middlewares: [authMiddleware],
        handler: ritTechnicalDrawController.updateProduct,
    },
    {
        method: 'delete',
        path: '/technical-draw/:id',
        middlewares: [authMiddleware],
        handler: ritTechnicalDrawController.deleteProduct,
    },

    // Services Routes
    {
        method: 'post',
        path: '/services',
        middlewares: [authMiddleware],
        handler: servicesController.createService,
    },
    {
        method: 'get',
        path: '/services',
        middlewares: [authMiddleware],
        handler: servicesController.getAllServices,
    },
    {
        method: 'put',
        path: '/services/:id',
        middlewares: [authMiddleware],
        handler: servicesController.updateService,
    },
    {
        method: 'delete',
        path: '/services/:id',
        middlewares: [authMiddleware],
        handler: servicesController.deleteService,
    },

    // Rit Users Routes
    {
        method: 'post',
        path: '/rit-users',
        middlewares: [authMiddleware],
        handler: ritUserController.createRitUser,
    },
    {
        method: 'get',
        path: '/rit-users',
        middlewares: [authMiddleware],
        handler: ritUserController.getAllRitUsers,
    },
    {
        method: 'put',
        path: '/rit-users/:id',
        middlewares: [authMiddleware],
        handler: ritUserController.updateRitUser,
    },
    {
        method: 'delete',
        path: '/rit-users/:id',
        middlewares: [authMiddleware],
        handler: ritUserController.deleteRitUser,
    },

    // Rit Technicians Routes
    {
        method: 'post',
        path: '/rit-technicians',
        middlewares: [authMiddleware],
        handler: ritTechnicianController.createRitTechnician,
    },
    {
        method: 'get',
        path: '/rit-technicians',
        middlewares: [authMiddleware],
        handler: ritTechnicianController.getAllRitTechnicians,
    },
    {
        method: 'put',
        path: '/rit-technicians/:id',
        middlewares: [authMiddleware],
        handler: ritTechnicianController.updateRitTechnician,
    },
    {
        method: 'delete',
        path: '/rit-technicians/:id',
        middlewares: [authMiddleware],
        handler: ritTechnicianController.deleteRitTechnician,
    },
];

module.exports = routes;
