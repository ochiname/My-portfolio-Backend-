import Joi from "joi";


export const validateRequest = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false }); // abortEarly=false to show all validation errors
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details.map((err) => err.message), // Return all error messages as an array
        });
      }
      next();
    };
  };
export const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  first_name: Joi.string().min(2).max(50),
  last_name: Joi.string().min(2).max(50),
  role: Joi.string().min(2).max(50),
  location: Joi.string().min(2).max(100),
  bio: Joi.string().max(500),
  phone: Joi.string().pattern(/^[\d\s\-+()]{10,20}$/),
  linkedin: Joi.string().uri(),
  github: Joi.string().uri(),
  twitter: Joi.string().uri()
}).min(1).unknown(true); // Ensures at least one field is updated
export const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});
export const idSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
export const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("admin", "user").default("user"),
});
export const educationSchema = Joi.object({
  degree: Joi.string().min(2).max(100).required(),
  institution: Joi.string().min(2).max(100).required(),
  start_year: Joi.number().integer().positive().min(1900).max(new Date().getFullYear()).required(),
  end_year: Joi.number().integer().positive().min(1900).max(new Date().getFullYear()).required()
}).unknown(true);
export const exprienceSchema = Joi.object({
  job_title: Joi.string().min(2).max(100).required(),
  company_name: Joi.string().min(2).max(100).required(),
  start_year: Joi.number().integer().positive().min(1900).max(new Date().getFullYear()).required(),
  end_year: Joi.number().integer().positive().min(1900).max(new Date().getFullYear()).required(),
  responsibilities: Joi.string().min(2).max(300).required(),
}).unknown(true);
export const contactSchema = Joi.object({
  location: Joi.string().min(2).max(100).required(),
  phone1: Joi.string().required(),
  phone2: Joi.string().optional()
}).unknown(true);
export const certificateSchema = Joi.object({
  certification_name: Joi.string().min(2).max(100).required(),
  institution_name: Joi.string().min(2).max(100).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required()
}).unknown(true);
export const skillSchema = Joi.object({
  skill_name: Joi.string().min(2).max(100).required(),
  proficiency: Joi.number().integer().min(10).max(100).required()  // Assuming proficiency is a rating from 1 to 10
}).unknown(true);
export const projectSchema = Joi.object({
  project_name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(500).required(),  // Assuming a description length between 10 to 500 characters
  technologies: Joi.string().min(10).max(500).required(), // Assuming technologies are an array of strings
}).unknown(true);
export const profilePictureSchema = Joi.object({
  profile_picture: Joi.string().uri().optional()  // Validates that it's a valid URL (optional field)
}).unknown(true);
export const languageSchema = Joi.object({
  language_id: Joi.number().integer().required(),
  language_name: Joi.string().min(2).max(50).required(),
  proficiency: Joi.string()
    .valid("Beginner", "Intermediate", "Fluent", "Native")
    .required()
}).unknown(true);

export const articleSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  img_url: Joi.string().uri().optional().allow(""),
  description: Joi.string().min(5).optional().allow(""),
  link_to_article: Joi.string().uri().optional().allow("")
}).unknown(true);

// Schema for creating a new pic
export const createPicSchema = Joi.object({
  image_url : Joi.string().uri().required(),
  usage_type: Joi.string().min(2).max(100).required()
});

// Schema for updating a pic
export const updatePicSchema = Joi.object({
  image_url : Joi.string().uri().optional(),
  usage_type: Joi.string().min(2).max(100).optional()
}).or("image_url", "usage_type");