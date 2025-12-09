import React from 'react';
import '../styles/ProjectSection.css';

const ProjectSection = ({ projects }) => {
  const API_BASE = process.env.REACT_APP_API_URL. replace('/api', '');

  return (
    <section id="projects" className="project-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Projects</h2>
          <p className="section-subtitle">
            Explore our portfolio of successful projects delivered with excellence
          </p>
        </div>

        <div className="projects-grid">
          {projects.length === 0 ? (
            <p className="no-data">No projects available</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="project-card">
                <div className="project-image">
                  <img 
                    src={`${API_BASE}${project.image}`} 
                    alt={project.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/450x350? text=Project+Image';
                    }}
                  />
                </div>
                <div className="project-content">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <button className="project-button">Read More</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;