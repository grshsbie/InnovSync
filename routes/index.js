const authRoutes = require('./authRoutes');
const introducerRoutes = require('./introducerRoutes');
const ritUserRoutes = require('./ritUserRoutes');
const ritTechnicianRoutes = require('./ritTechnicianRoutes');
const projectRoutes = require('./projectRoutes');
const productRoutes = require('./productRoutes');
const technicalDrawing = require('./TechnicalDrawingRoutes');
const manufacturers = require('./productionRoutes');
const competitions = require('./compotitionsRoutes');
const services = require('./servicesRoutes')
const technicalTrainingCoursesRoutes = require('./TechnicalTrainingCoursesRoutes');
const invRoutes = require('./invRouts')
const botReport = require('./botReportRouts');

module.exports = {
  invRoutes,
  authRoutes,
  introducerRoutes,
  ritUserRoutes,
  ritTechnicianRoutes,
  projectRoutes,
  productRoutes,
  technicalDrawing,
  manufacturers,
  competitions,
  services,
  technicalTrainingCoursesRoutes,
  botReport
};
