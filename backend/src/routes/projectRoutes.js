const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const upload = require('../middleware/upload');
const processImage = require('../middleware/imageProcessor');
const { auth, isAdmin } = require('../middleware/auth');
const { getUploadUrl } = require('../utils/urlHelper');

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    
    // Convert image paths to absolute URLs
    const projectsWithAbsoluteUrls = projects.map(project => ({
      ...project,
      image: getUploadUrl(project.image)
    }));
    
    res.json(projectsWithAbsoluteUrls);
  } catch (error) {
    res.status(500).json({ message: error. message });
  }
});

// Get single project (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req. params.id).lean();
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Convert image path to absolute URL
    project.image = getUploadUrl(project.image);
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create project (admin only)
router.post('/', auth, isAdmin, upload. single('image'), processImage, async (req, res) => {
  try {
    const { name, description, location } = req. body;

    if (!req. file) {
      return res. status(400).json({ message: 'Image is required' });
    }

    const project = new Project({
      name,
      description,
      location,
      image: `/uploads/${req.file.filename}`
    });

    const newProject = await project.save();
    
    // Return with absolute URL
    const responseProject = newProject.toObject();
    responseProject.image = getUploadUrl(responseProject.image);
    
    res.status(201).json(responseProject);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update project (admin only)
router.put('/:id', auth, isAdmin, upload.single('image'), processImage, async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const updateData = { name, description, location };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).lean();

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Return with absolute URL
    project.image = getUploadUrl(project.image);
    
    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(400).json({ message: error. message });
  }
});

// Delete project (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const project = await Project. findByIdAndDelete(req. params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;