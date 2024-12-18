const cors = require('cors');
const express = require('express');
const multer = require('multer');
const connectDB = require('./config/db');
const routes = require('./routes/index.js');
require('dotenv').config();
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
connectDB();

app.use(express.json());

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, Date.now() + '-' + sanitizedFilename)
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});

app.get('/uploads', (req, res) => {
  const fs = require('fs');
  fs.readdir('./uploads', (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve files' });
    }
    const fileUrls = files.map(filename => {
      return {
        name: filename,
        url: `http://localhost:5000/uploads/${filename}`
      };
    });
    res.json({ files: fileUrls });
  });
});


app.use('/uploads', express.static('uploads'));
app.use('/reports-bot', routes.botReport)

app.use('/api/invverify', routes.invRoutes);
app.use('/api/competitions', routes.competitions);
app.use('/api/manufacturers', routes.manufacturers);
app.use('/api/training-courses', routes.technicalTrainingCoursesRoutes);
app.use('/api/technical-draw', routes.technicalDrawing);
app.use('/api/auth', routes.authRoutes);
app.use('/api/introducers', routes.introducerRoutes);
app.use('/api/rit-users', routes.ritUserRoutes);
app.use('/api/rit-technicians', routes.ritTechnicianRoutes);
app.use('/api/projects', routes.projectRoutes);
app.use('/api/products', routes.productRoutes);
app.use('/api/services', routes.services);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));