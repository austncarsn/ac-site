/**
 * Data Module - Public API
 * 
 * Central export point for all data-related functionality.
 * Import from here to access project data and utilities.
 */

export {
  // Types
  type Project,
  type ProjectCategory,
  type ProjectStatus,
  
  // Enums
  ProjectCategory,
  ProjectStatus,
  
  // Data
  PROJECTS,
  
  // Helper Functions
  getFeaturedProjects,
  getProjectsByCategory,
  getProjectBySlug,
  getProjectById,
  getAllCategories,
  getProjectsByStatus,
  getLiveProjects,
} from './projects';
