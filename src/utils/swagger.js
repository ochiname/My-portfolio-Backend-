import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API for my backend portfolio app',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: "Local Server",
      },
      {
        url: "https://my-portfolio-backend-node-js.onrender.com",
        description: "Production Server",
      },
    ],
    components: {
      schemas: {
        // User Login schema
        UserLogin: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
          },
          required: ['email', 'password'],
        },

        // Update User schema
        UpdateUser: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            first_name: { type: 'string', minLength: 2, maxLength: 50 },
            last_name: { type: 'string', minLength: 2, maxLength: 50 },
            role: { type: 'string', minLength: 2, maxLength: 50 },
            location: { type: 'string', minLength: 2, maxLength: 100 },
            bio: { type: 'string', maxLength: 500 },
            phone: { type: 'string', pattern: '^[0-9]{10,15}$' },
            linkedin: { type: 'string', format: 'uri' },
            github: { type: 'string', format: 'uri' },
            twitter: { type: 'string', format: 'uri' },
          },
        },

        // Education schema
        Education: {
          type: 'object',
          properties: {
            degree: { type: 'string', minLength: 2, maxLength: 100 },
            institution: { type: 'string', minLength: 2, maxLength: 100 },
            start_year: { type: 'integer', minimum: 1900, maximum: new Date().getFullYear() },
            end_year: { type: 'integer', minimum: 1900, maximum: new Date().getFullYear() },
          },
          required: ['degree', 'institution', 'start_year', 'end_year'],
        },

        // Contact schema
        Contact: {
          type: "object",
          properties: {
            location: { type: "string", minLength: 2, maxLength: 100 },
            phone1: { type: "string" },
            phone2: { 
              type: "string",
              nullable: true  // optional
            }
          },
          required: ["location", "phone1"],
          additionalProperties: false
        },
        // Certificate schema
        Certificate: {
          type: 'object',
          properties: {
            certificate_name: { type: 'string', minLength: 2, maxLength: 100 },
            institution_name: { type: 'string', minLength: 2, maxLength: 100 },
            year: { type: 'integer', minimum: 1900, maximum: new Date().getFullYear() },
          },
          required: ['certificate_name', 'institution_name', 'year'],
        },

        // Skill schema
        Skill: {
          type: 'object',
          properties: {
            skill_name: { type: 'string', minLength: 2, maxLength: 100 },
            proficiency: { type: 'integer', minimum: 1, maximum: 10 },
          },
          required: ['skill_name', 'proficiency'],
        },

        // Project schema
        Project: {
          type: 'object',
          properties: {
            project_name: { type: 'string', minLength: 2, maxLength: 100 },
            description: { type: 'string', minLength: 10, maxLength: 500 },
            technologies: { 
              type: 'array', 
              items: { 
                type: 'string', 
                minLength: 2, 
                maxLength: 50 
              },
            },
          },
          required: ['project_name', 'description', 'technologies'],
        },

        // Profile Picture schema
        ProfilePicture: {
          type: 'object',
          properties: {
            profile_picture: { type: 'string', format: 'uri' },
          },
        },

        // Email schema
        Email: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
          },
          required: ['email'],
        },

        // Language schema
        Language: {
          type: 'object',
          properties: {
            language_name: { type: 'string', minLength: 2, maxLength: 100 },
            proficiency: { type: 'string', minLength: 2, maxLength: 50 },
          },
          required: ['language_name', 'proficiency'],
        },
        PicCreate: {
        type: "object",
        required: ["image_url", "usage_type"],
        properties: {
            image_url: {
              type: "string",
              format: "uri",
              example: "https://cloud.example.com/image123.jpg"
            },
        usage_type: {
          type: "string",
          example: "profile_pic"
        }
        }},

        PicUpdate: {
          type: "object",
          properties: {
            image_url: {
              type: "string",
              format: "uri",
              example: "https://cloud.example.com/updated_image.jpg"
            },
          usage_type: {
          type: "string",
          example: "background"
            }
          }
        },
        // ID schema
        ID: {
          type: 'object',
          properties: {
            id: { type: 'integer', minimum: 1 },
          },
          required: ['id'],
        },

        //Article schema
        Article: {
          type: 'object',
          properties: {
            title: { type: 'string', minLength: 2, maxLength: 255 },
            img_url: { type: 'string', format: 'uri' },
            description: { type: 'string', minLength: 5 },
            link_to_article: { type: 'string', format: 'uri' },
          },
          required: ['title', 'img_url', 'description', 'link_to_article'],
        },
      },

      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },

  apis: [
    './src/routers/mother_router.js',
    './src/modules/auth/index.js',   
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
