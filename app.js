const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const introducerRoutes = require('./routes/introducerRoutes');
const ritUserRoutes = require('./routes/ritUserRoutes');
const ritTechnicianRoutes = require('./routes/ritTechnicianRoutes');
const projectRoutes = require('./routes/projectRoutes');
const productRoutes = require('./routes/productRoutes');
const technicalDrawing = require('./routes/TechnicalDrawingRoutes');
const manufacturers = require('./routes/productionRoutes')
const TechnicalTrainingCoursesRoutes = require('./routes/TechnicalTrainingCoursesRoutes')


require('dotenv').config();

const app = express();


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};


app.use(cors(corsOptions));


connectDB();

app.use(express.json());


///api/manufacturers



app.use('/api/manufacturers' , manufacturers)
app.use('/api/training-courses',TechnicalTrainingCoursesRoutes)
app.use('/api/technical-draw',technicalDrawing)
app.use('/api/auth', authRoutes);
app.use('/api/introducers', introducerRoutes);
app.use('/api/rit-users', ritUserRoutes);
app.use('/api/rit-technicians', ritTechnicianRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));