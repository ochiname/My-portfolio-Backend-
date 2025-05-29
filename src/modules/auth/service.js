import { getUserByEmail, updateUserByEmail, profileGetUserByEmail, 
    getUserEducation, updateUserEducation, getUserContact, updateUserContact, 
    getUserCertificate, updateUseCertificate, getUserSkill, getUserProject, 
    updateUserProject, getUserProfilePic, updateUserPic, getUserLanguage, 
    updateUserLanguage, updateArticles, addArticle,
     saveImage,getAllImages,  getImage, getAllPics, insertPic,
  updatePics, updateUserSkill, get_Articles,
  getUsers,
  getUserEducations,
  getUserContacts,
  getUserSkills,
  getUserExprience,
  updateUserExprience,
  getUserExpriences,
  getUserCertificates,
  getUserProjects,
  getUserLanguages,
  new_get_Articless,
  addSkills,} from './model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errors } from "../../middlewares/error.js"; 
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cloudinary from '../../utils/cloudordinary.js';

dotenv.config();


const apiUrl = process.env.GITHUB_API_URL;
const apiKey = process.env.GITHUB_API_KEY;
// Function to hash passwords
export const hashedPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};
// Function to generate a JWT token
export const generateToken = async (user_id, admin_role, email) => {
    return jwt.sign({ user_id, admin_role, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


export const loginUser = async (userData) => {
    const { email, password } = userData;
    
    // Log the email to help with debugging
    

    // Fetch the user from the database based on the email
    const existingUser = await getUserByEmail(email);
    
    // If no user found, throw an error
    if (!existingUser) {
        console.log("User not found");
        throw errors.UNAUTHORIZED("User does not exist");  // 401: Unauthorized - User does not exist
    }

    // Compare the entered password with the stored hashed password
    const validPassword = await bcrypt.compare(password, existingUser.password);
    
    // If passwords don't match, throw an error
    if (!validPassword) {
        console.log("Invalid password");
        throw errors.INVALID_CREDENTIALS("Invalid email or password");  // 401: Unauthorized - Invalid email or password
    }

    // Generate a JWT token for the authenticated user
    const token = await generateToken(existingUser.user_id, existingUser.admin_role, existingUser.email);
    ;
    // Return success message with the token
    return { message: 'Logged in successfully', token };
};


export const updateUserService = async (user, updateData) => {
    const { email, role } = user;

    if (!email) {
        throw errors.BAD_REQUEST('email required'); // 400: "Bad Request - Email required"
    }

    // Check if the user is updating their own account or if they are an admin
    if (role !== "admin" && updateData.email && email !== updateData.email) {
        throw errors.FORBIDDEN('You do not have permission to update the email');
    }

    // Hash the password if it's being updated

    const updatedUser = await updateUserByEmail(email, updateData);
    if (!updatedUser) {
        throw errors.NOT_FOUND('user not found'); // 404: "User not found"
    }

    return { message: "User updated successfully", user: updatedUser };
};
export const getProfileService = async (email) => {

    if (!email) {
        throw errors.BAD_REQUEST("email required"); // 400: "Bad Request - Email required"
    }

    const user = await profileGetUserByEmail(email);
    if (!user) {
        throw errors.NOT_FOUND("user not found"); // 404: "User not found"
    }

    // Exclude sensitive data like password
    const { password,id, admin_role, ...userProfile } = user;

    return userProfile;
};
export const getProfileServices = async () => {

    const users = await getUsers();

  if (!users || users.length === 0) {
    throw errors.NOT_FOUND('No users found');
  }

  // Exclude sensitive data like password, id, and admin_role
  const safeUsers = users.map(({ password, id, admin_role, ...rest }) => rest);

  return safeUsers;
};


export const getEducation = async(user_id) => {
    if(!user_id){
        throw errors.BAD_REQUEST("user_id incorrect or missing");
    }

    const edu = await getUserEducation(user_id);

    if (!edu) {
        throw errors.NOT_FOUND("no educational details found related to the the user_id");
    }

    return edu;
};
export const getEducations = async(user_id) => {
    const edu = await getUserEducations();

    if (!edu) {
        throw errors.NOT_FOUND("no educational details found related to the the user_id");
    }

    return edu;
};
export const updateEducation = async (user, edu_id, userData) => {
  const { id: user_id } = user;

  if (!user_id) {
    throw errors.BAD_REQUEST("User ID is required or not found");
  }
  if (!edu_id) {
    throw errors.BAD_REQUEST("Education ID is required");
  }

  const eduUpdate = await updateUserEducation(edu_id, user_id, userData);

  if (!eduUpdate) {
    throw errors.NOT_FOUND("User education details not found or not owned by user");
  }

  return { message: "Education updated successfully", education: eduUpdate };
};

export const getContact = async(email) => {
    if(!email){
        throw errors.BAD_REQUEST("user_id incorrect or missing");
    }

    const contact = await getUserContact(email);

    if (!contact) {
        throw errors.NOT_FOUND("no educational details found related to the the user_id");
    }

    return contact;
};
export const getContacts = async() => {
    const contact = await getUserContacts();

    if (!contact) {
        throw errors.NOT_FOUND("no educational details found related to the the user_id");
    }

    return contact;
};
export const updateContact = async (user, userData) => {
    const {email} = user; // Extract 'email' from user
    if (!email) { // Now check 'user_id', not 'user'
        throw errors.BAD_REQUEST("Email is required or not found");
    }

    const contactUpdate = await updateUserContact(email, userData); // use 'userData', not 'updateData'

    if (!contactUpdate) {
        throw errors.NOT_FOUND("User contact details not found");
    }

    return { message: "Contact updated successfully", contact: contactUpdate };
};


export const getCertiifcate = async(user_id) => {
    if(!user_id){
        throw { ...errors.BAD_REQUEST, message: "user_id not found" };    }

    const certificate = await getUserCertificate(user_id);

    if (!certificate) {
        throw { ...errors.BAD_REQUEST, message: "Certificate not found" };
    }

    return certificate;
};
export const getCertiifcates = async() => {
    const certificate = await getUserCertificates();

    if (!certificate) {
        throw { ...errors.BAD_REQUEST, message: "Certificate not found" };
    }

    return certificate;
};
export const updatedCertificate = async (user, certification_id, userData) => {
    const { id: user_id } = user; // still keep user_id in case you want to validate ownership

    if (!user_id) {
        throw errors.BAD_REQUEST("User ID is required or not found");
    }

    if (!certification_id) {
        throw errors.BAD_REQUEST("cerficate ID is required");
    }
    const certificateUpdate = await updateUseCertificate(certification_id, userData); // use 'userData', not 'updateData'

    if (!certificateUpdate) {
        throw errors.NOT_FOUND("User certificate details not found");
    }

    return { message: "Certificate updated successfully", certificate: certificateUpdate };
};


export const getExp = async(user_id) => {
    if(!user_id){
        throw errors.BAD_REQUEST("user_id incorrect or missing");
    }

    const exp = await getUserExprience(user_id);

    if (!exp) {
        throw errors.NOT_FOUND("no expriemce details found related to the the user_id");
    }

    return exp;
};
export const getExps = async() => {
   const exp = await getUserExpriences();

    if (!exp) {
        throw errors.NOT_FOUND("no Exprience details found related to the the user_id");
    }

    return exp;
};
export const updatedExp = async (user, exprience_id, userData) => {
    const { id: user_id } = user; // still keep user_id in case you want to validate ownership

    if (!user_id) {
        throw errors.BAD_REQUEST("User ID is required or not found");
    }

    if (!exprience_id) {
        throw errors.BAD_REQUEST("exprience ID is required");
    }
    const expUpdate = await updateUserExprience(exprience_id, user_id, userData); // use 'userData', not 'updateData'

    if (!expUpdate) {
        throw errors.NOT_FOUND("User Exprience details not found");
    }

    return { message: "Exprience updated successfully", certificate: skillUpdate };
};

export const createSkill = async(user, skillData)  => {
    if (!user)  {
        throw errors.BAD_REQUEST("user ID is required")
    }
    const insertSkill = await addSkills(user, skillData);

    if (!insertSkill) {
        throw errors.NOT_FOUND("error in insertinfg new skill");
    }

    return { message: "New skill Created", article: insertSkill };
};
export const getSkill = async(user_id) => {
    if(!user_id){
        throw errors.BAD_REQUEST("user_id incorrect or missing");
    }

    const skill = await getUserSkill(user_id);

    if (!skill) {
        throw errors.NOT_FOUND("no skill details found related to the the user_id");
    }

    return skill;
};
export const getSkills = async() => {
    const skill = await getUserSkills();

    if (!skill) {
        throw errors.NOT_FOUND("no skill details found related to the the user_id");
    }

    return skill;
};
export const updatedskill = async (user, skill_id, userData) => {
    const { id: user_id } = user; // still keep user_id in case you want to validate ownership

    if (!user_id) {
        throw errors.BAD_REQUEST("User ID is required or not found");
    }

    if (!skill_id) {
        throw errors.BAD_REQUEST("skill ID is required");
    }
    const skillUpdate = await updateUserSkill(skill_id, userData); // use 'userData', not 'updateData'

    if (!skillUpdate) {
        throw errors.NOT_FOUND("User skill details not found");
    }

    return { message: "Skill updated successfully", certificate: skillUpdate };
};


export const getProject = async(user_id) => {
    if(!user_id){
        throw errors.BAD_REQUEST("user_id incorrect or missing");
    }

    const project= await getUserProject(user_id);

    if (!project) {
        throw errors.NOT_FOUND("no project details found related to the the user_id");
    }

    return project;
};
export const getProjects = async() => {
    const project= await getUserProjects();

    if (!project) {
        throw errors.NOT_FOUND("no project details found related to the the user_id");
    }

    return project;
};
export const updatedProject= async (user, project_id, userData) => {
    const { id: user_id } = user; // still keep user_id in case you want to validate ownership

    if (!user_id) {
        throw errors.BAD_REQUEST("User ID is required or not found");
    }

    if (!project_id) {
        throw errors.BAD_REQUEST("Project ID is required");
    }
    const projectUpdate = await updateUserProject(project_id, userData); // use 'userData', not 'updateData'

    if (!projectUpdate) {
        throw errors.NOT_FOUND("User project details not found");
    }

    return { message: "Project updated successfully", project: projectUpdate };
};


export const getProfilePic = async(email) => {
    if(!email){
        throw errors.BAD_REQUEST("email incorrect or missing");
    }

    const pic = await getUserProfilePic(email);

    if (!pic) {
        throw errors.NOT_FOUND("no pic details found related to the the user_id");
    }

    return pic;
};
export const updatePic = async (user, userData) => {
    const {email} = user; // Extract 'email' from user
    if (!email) { // Now check 'email', not 'user'
        throw errors.BAD_REQUEST("Email is required or not found");
    }

    const picUpdate = await updateUserPic(email, userData); // use 'userData', not 'updateData'

    if (!picUpdate) {
        throw errors.NOT_FOUND("User pic details not found");
    }

    return { message: "Pic updated successfully", ProfilePic: picUpdate };
};


export const getLanguage = async(user_id) => {
    if(!user_id){
        throw errors.BAD_REQUEST("user_id incorrect or missing");
    }

    const language= await getUserLanguage(user_id);

    if (!language) {
        throw errors.NOT_FOUND("no language details found related to the the user_id");
    }

    return language;
};
export const getLanguages = async() => {
    const language= await getUserLanguages();

    if (!language) {
        throw errors.NOT_FOUND("no language details found related to the the user_id");
    }

    return language;
};
export const updatedLanguage= async (user, language_id, userData) => {
    const {user_id } = user; // still keep user_id in case you want to validate ownership

    if (!user_id) {
        throw errors.BAD_REQUEST("User ID is required or not found");
    }

    if (!language_id) {
        throw errors.BAD_REQUEST("language ID is required");
    }
    const languageUpdate = await updateUserLanguage(language_id, userData); // use 'userData', not 'updateData'

    if (!languageUpdate) {
        throw errors.NOT_FOUND("User language details not found");
    }

    return { message: "Project updated successfully", language: languageUpdate };
};


export const createArticle = async(user, articleData)  => {
    if (!user)  {
        throw errors.BAD_REQUEST("user ID is required")
    }
    const insertArticle = await addArticle(user, articleData);

    if (!insertArticle) {
        throw errors.NOT_FOUND("error in insertinfg new article");
    }

    return { message: "New Article Created", article: insertArticle };
};
export const updateArticle = async(id, user_id, articleData)  => {
    if (!id)  {
        throw errors.BAD_REQUEST("article ID is required")
    }

    if (!user_id)  {
        throw errors.BAD_REQUEST("userID is required")
    }
    const newUpdatedArticle = await updateArticles(id, articleData);

    if (!newUpdatedArticle) {
        throw errors.NOT_FOUND("error updating article");
    }

    return { message: " Article have been updated", article: newUpdatedArticle };
};
export const getArticle = async(user_id) => {
    console.log('getArticle called with user_id:', user_id, 'type:', typeof user_id);

    if(!user_id){
        throw errors.BAD_REQUEST("user_id incorrect or missing");
    }

    const getArt = await get_Articles(user_id);

    if (!getArt) {
        throw errors.NOT_FOUND("no Article details found related to the the user_id");
    }

    return getArt;
};
export const new_getArticles = async() => {
    const getArt = await new_get_Articless();

    if (!getArt) {
        throw errors.NOT_FOUND("no Article details found related to the the user_id");
    }

    return getArt;
};



export const fetchGitHubRepos = async () => {
  if (!apiUrl || !apiKey) {
    throw errors.INTERNAL_SERVER_ERROR("GitHub API URL or key is missing");
  }

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${apiKey}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw errors.BAD_REQUEST(`GitHub API error: ${response.statusText}`);
  }

  const repos = await response.json();
  return repos;
};




export const uploadImageToCloud = async (user_id, file, title, description) => {
  const result = await cloudinary.uploader.upload(file.path);

  const image = await saveImage(
    user_id,
    title,
    description,
    result.secure_url
  );

  return image;
};
export const fetchImg = async (user_id) => {
    if (!user_id) {
        throw errors.BAD_REQUEST("user_id incorrect or missing");
    }

    const getImages = await getImage(user_id);

    if (!getImages) {
        throw errors.NOT_FOUND("No Images found related to the user_id");
    }

    return getImages;
};


// Fetch all available images (to use their URLs)
export const fetchAllImages = async () => {
  const images = await getAllImages();
  return images;
};

// Fetch all current pic entries
export const fetchAllPics = async () => {
  const pics = await getAllPics();
  return pics;
};

// Create a new pic entry
export const createPic = async (payload) => {
  if (!payload.image_url || !payload.usage_type) {
    throw new Error("image_url and usage_type are required");
  }

  const result = await insertPic(payload);
  return result[0]; // return newly created entry
};

// Update an existing pic entry by ID
export const modifyPic = async (id, payload) => {
  if (!id || isNaN(id)) {
    throw new Error("A valid ID is required for update");
  }

  const result = await updatePics(id, payload);
  if (result.length === 0) {
    throw new Error("Pic record not found");
  }

  return result[0]; // return updated entry
};