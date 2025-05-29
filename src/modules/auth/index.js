import express from 'express';
import {  login, getProfile, 
    updateUser, get_Education, get_Contact, 
    get_Certificate, update_Education, 
    update_Contact, update_Certificate, 
    update_Skill, 
    update_Project,
    get_Profile_Pic,
    update_Profile_Pic, 
    get_Language,
    get_Article,
    update_Article,
    add_Article,
    getGitHubRepos, uploadImage,
    get_Images,
    get_skill,
    get_Project,
    update_Language,
    getImages,
    getPics,
    addPic,updatePix,
    getProfiles,
    get_Educations,
    get_Contacts,
    get_skills,
    get_exp,
    get_expS,
    update_EXP,
    get_Projects,
    get_Languages,
    get_Certificates,
    new_get_Articles,
    add_Skill} from './controller.js';
import { authenticateToken } from '../../middlewares/authenticator.js';
import { validateRequest, loginSchema, updateUserSchema, 
    educationSchema, contactSchema,
    certificateSchema, skillSchema, projectSchema, 
    profilePictureSchema, 
    languageSchema,
    articleSchema,
    updatePicSchema,
    createPicSchema,
    exprienceSchema} from './validator.js';
import upload from '../../middlewares/upload.js';

const authrouter = express.Router();

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     description: This endpoint allows a user to log in and receive a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
authrouter.post('/login', validateRequest(loginSchema), login);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Update user profile
 *     description: Update the details of an authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: Profile updated
 *       400:
 *         description: Invalid input
 */
authrouter.put("/update", authenticateToken, validateRequest(updateUserSchema), updateUser);
/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Fetch the profile details of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/profile", authenticateToken, getProfile);
/**
 * @swagger
 * /api/user/profiles:
 *   get:
 *     summary: Get user profile
 *     description: Fetch the profile details of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/profiles",  getProfiles);

/**
 * @swagger
 * /api/user/exprience:
 *   get:
 *     summary: Get user's exprience details
 *     description: Fetch the exprience information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: exprienec details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/exprience",authenticateToken, get_exp);
/**
 * @swagger
 * /api/user/expriences:
 *   get:
 *     summary: Get user's exprience details
 *     description: Fetch the exprience information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: exprienec details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/expriences", get_expS);
/**
 * @swagger
 * /api/user/exprienceUpdate:
 *   put:
 *     summary: Update user's exprience details
 *     description: Update the  exprience details of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expriencen'
 *     responses:
 *       200:
 *         description: Exprience details updated
 *       400:
 *         description: Invalid input
 */
authrouter.put("/exprienceUpdate", authenticateToken, validateRequest(exprienceSchema), update_EXP);



/**
 * @swagger
 * /api/user/education:
 *   get:
 *     summary: Get user's education details
 *     description: Fetch the education information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Education details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/education",authenticateToken, get_Education);
/**
 * @swagger
 * /api/user/educations:
 *   get:
 *     summary: Get user's education details
 *     description: Fetch the education information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Education details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/educations", get_Educations);

/**
 * @swagger
 * /api/user/educationUpdate:
 *   put:
 *     summary: Update user's education details
 *     description: Update the education details of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       200:
 *         description: Education details updated
 *       400:
 *         description: Invalid input
 */
authrouter.put("/educationUpdate", authenticateToken, validateRequest(educationSchema), update_Education);

/**
 * @swagger
 * /api/user/contact:
 *   get:
 *     summary: Get user's contact details
 *     description: Fetch the contact information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Contact details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/contact",authenticateToken,  get_Contact);
/**
 * @swagger
 * /api/user/contacts:
 *   get:
 *     summary: Get user's contact details
 *     description: Fetch the contact information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Contact details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/contacts", get_Contacts);
/**
 * @swagger
 * /api/user/contactUpdate:
 *   put:
 *     summary: Update user's contact details
 *     description: Update the contact details of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact details updated
 *       400:
 *         description: Invalid input
 */
authrouter.put("/contactUpdate", authenticateToken, validateRequest(contactSchema), update_Contact);

/**
 * @swagger
 * /api/user/certificate:
 *   get:
 *     summary: Get user's certificate details
 *     description: Fetch the certificate information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Certificate details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/certificate", authenticateToken, get_Certificate);
/**
 * @swagger
 * /api/user/certificates:
 *   get:
 *     summary: Get user's certificate details
 *     description: Fetch the certificate information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Certificate details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/certificates", get_Certificates);



/**
 * @swagger
 * /api/user/certificateUpdate:
 *   put:
 *     summary: Update user's certificate details
 *     description: Update the certificate details of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certificate'
 *     responses:
 *       200:
 *         description: Certificate details updated
 *       400:
 *         description: Invalid input
 */
authrouter.put("/certificateUpdate", authenticateToken, validateRequest(certificateSchema), update_Certificate);

/**
 * @swagger
 * /api/user/skill:
 *   get:
 *     summary: Get user's skills
 *     description: Fetch the skill information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Skill details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/skill",  authenticateToken,  get_skill);
/**
 * @swagger
 * /api/user/skills:
 *   get:
 *     summary: Get user's skills
 *     description: Fetch the skill information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Skill details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/skills",  get_skills);
/**
 * @swagger
 * /api/user/skillUpdate:
 *   put:
 *     summary: Update user's skill details
 *     description: Update the skill details of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skill'
 *     responses:
 *       200:
 *         description: Skill details updated
 *       400:
 *         description: Invalid input
 */
authrouter.put("/skillUpdate", authenticateToken, validateRequest(skillSchema), update_Skill);
/**
 * @swagger
 * /api/user/addskill:
 *   post:
 *     summary: Add skill details
 *     description: Add new skill details for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skill'
 *     responses:
 *       200:
 *         description: Article details Added
 *       400:
 *         description: Invalid input
 */
authrouter.post("/addskill", authenticateToken, validateRequest(skillSchema), add_Skill);




/**
 * @swagger
 * /api/user/project:
 *   get:
 *     summary: Get user's project details
 *     description: Fetch the project information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Project details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/project", authenticateToken, get_Project);
/**
 * @swagger
 * /api/user/projects:
 *   get:
 *     summary: Get user's project details
 *     description: Fetch the project information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Project details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/projects", get_Projects);


/**
 * @swagger
 * /api/user/projectUpdate:
 *   put:
 *     summary: Update user's project details
 *     description: Update the project details of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project details updated
 *       400:
 *         description: Invalid input
 */
authrouter.put("/projectUpdate", authenticateToken, validateRequest(projectSchema), update_Project);

/**
 * @swagger
 * /api/user/pic:
 *   get:
 *     summary: Get user's profile picture
 *     description: Fetch the profile picture of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile picture retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/img", authenticateToken, get_Profile_Pic);
/**
 * @swagger
 * /api/user/pics:
 *   get:
 *     summary: Get user's profile picture
 *     description: Fetch the profile picture of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile picture retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/imgs",  get_Profile_Pic);


/**
 * @swagger
 * /api/user/picUpdate:
 *   put:
 *     summary: Update user's profile picture
 *     description: Update the profile picture of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfilePicture'
 *     responses:
 *       200:
 *         description: Profile picture updated
 *       400:
 *         description: Invalid input
 */
authrouter.put("/img", authenticateToken, validateRequest(profilePictureSchema), update_Profile_Pic);

/**
 * @swagger
 * /api/user/language:
 *   get:
 *     summary: Get user's language details
 *     description: Fetch the language information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: language details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/language", authenticateToken, get_Language);
/**
 * @swagger
 * /api/user/languages:
 *   get:
 *     summary: Get user's language details
 *     description: Fetch the language information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: language details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/languages", get_Languages);
/**
 * @swagger
 * /api/user/languageUpdate:
 *   put:
 *     summary: Update user's project details
 *     description: Update the language details of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *     responses:
 *       200:
 *         description: Language details updated
 *       400:
 *         description: Invalid input
 */
authrouter.put("/languageUpdate", authenticateToken, validateRequest(languageSchema), update_Language);


/**
 * @swagger
 * /api/user/articleUpdate:
 *   put:
 *     summary: Update article details
 *     description: Update the article details of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article details updated
 *       400:
 *         description: Invalid input
 */
authrouter.put("/articleUpdate", authenticateToken, validateRequest(articleSchema), update_Article);
/**
 * @swagger
 * /api/user/article:
 *   get:
 *     summary: Get user's article details
 *     description: Fetch the article information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: article details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/article",authenticateToken, get_Article);
/**
 * @swagger
 * /api/user/newarticles:
 *   get:
 *     summary: Get user's article details
 *     description: Fetch the article information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: article details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get("/newarticles", new_get_Articles);
/**
 * @swagger
 * /api/user/addarticle:
 *   post:
 *     summary: Add article details
 *     description: Add new article details for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article details Added
 *       400:
 *         description: Invalid input
 */
authrouter.post("/addarticle", authenticateToken, validateRequest(articleSchema), add_Article);


/**
 * @swagger
 * /api/user/repos:
 *   get:
 *     summary: Fetch GitHub repositories
 *     description: Retrieve GitHub repositories for the authenticated user using the GitHub API.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: GitHub repositories fetched successfully
 *       401:
 *         description: Unauthorized or missing token
 *       500:
 *         description: Failed to fetch GitHub repositories
 */
authrouter.get('/repos', getGitHubRepos);

/**
 * @swagger
 * /api/user/uploadimage:
 *   post:
 *     summary: Upload image
 *     description: Upload an image with title and description
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
authrouter.post('/uploadimage', authenticateToken, upload.single('file'), uploadImage);
/**
 * @swagger
 * /api/user/images:
 *   get:
 *     summary: Get user's images.
 *     description: Fetch the image information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Images details retrieved
 *       403:
 *         description: Forbidden
 */
authrouter.get('/images', authenticateToken, get_Images);

/**
 * @swagger
 * /api/user/images:
 *   get:
 *     summary: Get all uploaded images
 *     description: Retrieve all images stored in the image table (from cloud storage).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of images
 *       500:
 *         description: Server error
 */
authrouter.get("/imagess", authenticateToken, getImages);

/**
 * @swagger
 * /api/user/pics:
 *   get:
 *     summary: Get all pic records
 *     description: Retrieve all records from the pic table (e.g., for profile or background usage).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of pic entries
 *       500:
 *         description: Server error
 */
authrouter.get("/pic", authenticateToken,  getPics);
/**
 * @swagger
 * /api/user/pic:
 *   get:
 *     summary: Get all pic records
 *     description: Retrieve all records from the pic table (e.g., for profile or background usage).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of pic entries
 *       500:
 *         description: Server error
 */
authrouter.get("/pics",  getPics);
/**
 * @swagger
 * /api/user/pic:
 *   post:
 *     summary: Add a new pic
 *     description: Create a new pic record by selecting from existing images.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PicCreate'
 *     responses:
 *       201:
 *         description: Pic created successfully
 *       400:
 *         description: Invalid input
 */
authrouter.post("/pic", authenticateToken, validateRequest(createPicSchema), addPic);

/**
 * @swagger
 * /api/user/pic/{id}:
 *   put:
 *     summary: Update an existing pic
 *     description: Update image_url or usage_type of an existing pic record.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Pic ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PicUpdate'
 *     responses:
 *       200:
 *         description: Pic updated successfully
 *       400:
 *         description: Invalid input or bad request
 */
authrouter.put("/pic/:id", authenticateToken, validateRequest(updatePicSchema), updatePix);

export default authrouter;