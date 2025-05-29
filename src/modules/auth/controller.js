import {loginUser,  getProfileService, 
        updateUserService, getEducation, 
        updateEducation, getContact, 
        updateContact, getCertiifcate, 
        getSkill, updatedskill, getProfilePic, 
        getProject, updatedProject, updatePic,
        getLanguage,
        updatedLanguage,
        updateArticle,
        getArticle,
        fetchGitHubRepos,
        uploadImageToCloud,
        fetchImg,
        updatedCertificate,
        createArticle,
        fetchAllImages,
        fetchAllPics,
        createPic,
        modifyPic,
        getProfileServices,
        getEducations,
        getContacts,
        getSkills,
        getExp,
        getExps,
        getCertiifcates,
        getLanguages,
        getProjects,
        new_getArticles,
        createSkill} from './service.js';  // Import service functions
import ErrorHandler, { errors } from '../../middlewares/error.js';  // Correct import for default export


export const login = async (req, res, next) => {
    try {
        const loggedIn = await loginUser(req.body);  // Call service to log in user
        res.status(200).json(loggedIn);  // Send the login response with the token and message
    } catch (error) {
        next(error);  // Pass error to global error handler
    }
}; 

export const updateUser = async (req, res, next) => {
    try {
        // Use authenticated user info from `req.user` (set by middleware)
        const user = {
            email: req.user.email, // Email from authenticated user
            role: req.user.role,   // Role from authenticated user
        };

        const updateData = req.body; // Get update fields from request body

        const result = await updateUserService(user, updateData);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
export const getProfile = async (req, res, next) => {
    try {
        // Ensure req.user is set by authenticateToken middleware
        const userProfile = await getProfileService(req.user.email); 
        res.status(200).json(userProfile);
    } catch (error) {
        next(error);
    }
};

export const getProfiles = async (req, res, next) => {
    try {
        // Ensure req.user is set by authenticateToken middleware
        const userProfile = await getProfileServices(); 
        res.status(200).json(userProfile);
    } catch (error) {
        next(error);
    }
};
export const get_Education = async (req, res, next) => {
    try{
        const result = await getEducation(req.user.user_id);
        res.status(200).json(result)
    }catch(error) {
        next(error);
    };
};
export const get_Educations = async (req, res, next) => {
    try{
        const result = await getEducations();
        res.status(200).json(result)
    }catch(error) {
        next(error);
    };
};
export const update_Education = async (req, res, next) => {
  try {
    const user = {
      id: req.user.user_id
    };
    const edu_id = req.body.education_id; // <-- match frontend key
    const userData = req.body;

    const result = await updateEducation(user, edu_id, userData);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


export const get_Contact = async (req, res, next) => {
    try{
        const result = await getContact(req.user.email);
        res.status(200).json(result)
    }catch(error){
        next(error);
    };
};
export const get_Contacts = async (req, res, next) => {
    try{
        const result = await getContacts();
        res.status(200).json(result)
    }catch(error){
        next(error);
    };
};
export const update_Contact = async (req, res, next) => {
    try {
        console.log("req.user:", req.user);  // Log the entire user object
        console.log("req.user.email:", req.user?.email);

        const user = {
            email: req.user?.email,
            id: req.user?.user_id
        };
        const userData = req.body;

        const result = await updateContact(user, userData);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


export const get_Certificate = async (req, res, next) => {
    try{
        const result = await getCertiifcate(req.user.user_id);
        res.status(200).json(result)
    }catch(error){
        next(error);
    }
};
export const get_Certificates = async (req, res, next) => {
    try{
        const result = await getCertiifcates();
        res.status(200).json(result)
    }catch(error){
        next(error);
    }
};
export const update_Certificate= async (req, res, next) => {
    try {
        const user = {
            id: req.user.user_id
        };
        const certification_id = req.body.certification_id; // assuming 'id' is coming in req.body
        const userData = req.body;  // userData includes the fields to update

        const result = await updatedCertificate(user, certification_id, userData);

        res.status(200).json(result);
    } catch(error){
        next(error); // forward the error to error-handling middleware
    }
};

export const get_exp = async (req, res, next) => {
    try {
        const result = await getExp(req.user.user_id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Get skill error:", error); // helpful for debugging
        next(error); // pass the real error forward
    }
}
export const get_expS = async (req, res, next) => {
    try {
        const result = await getExps();
        res.status(200).json(result);
    } catch (error) {
        console.error("Get exprience error:", error); // helpful for debugging
        next(error); // pass the real error forward
    }
}
export const update_EXP= async (req, res, next) => {
    try {
        const user = {
            id: req.user.user_id
        };
        const exprience_id = req.body.exprience_id; // assuming 'id' is coming in req.body
        const userData = req.body;  // userData includes the fields to update

        const result = await updatedskill(user, exprience_id, userData);

        res.status(200).json(result);
    } catch(error){
        next(error);// forward the error to error-handling middleware
    }
};


export const add_Skill = async (req, res, next) => {
    try {
        const user = req.user.user_id;
        const skillData = req.body;
        const result = await createSkill(user, skillData);
        res.status(200).json(result)
    }catch(error){
        next(error)
    }
};
export const get_skill = async (req, res, next) => {
    try {
        const result = await getSkill(req.user.user_id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Get skill error:", error); // helpful for debugging
        next(error); // pass the real error forward
    }
}
export const get_skills = async (req, res, next) => {
    try {
        const result = await getSkills();
        res.status(200).json(result);
    } catch (error) {
        console.error("Get skill error:", error); // helpful for debugging
        next(error); // pass the real error forward
    }
}
export const update_Skill = async (req, res, next) => {
    try {
        const user = {
            id: req.user.user_id
        };
        const skill_id = req.body.skill_id; // assuming 'id' is coming in req.body
        const userData = req.body;  // userData includes the fields to update

        const result = await updatedskill(user, skill_id, userData);

        res.status(200).json(result);
    } catch(error){
        next(error);// forward the error to error-handling middleware
    }
};


export const get_Project = async (req, res, next) => {
    try{
        const result = await getProject(req.user.user_id);
        res.status(200).json(result)
    }catch(error){
        next(error);
    };
};
export const get_Projects = async (req, res, next) => {
    try{
        const result = await getProjects();
        res.status(200).json(result)
    }catch(error){
        next(error);
    };
};
export const update_Project = async (req, res, next) => {
    try {
        const user = {
            id: req.user.user_id
        };
        const project_id = req.body.project_id; // assuming 'id' is coming in req.body
        const userData = req.body;  // userData includes the fields to update

        const result = await updatedProject(user, project_id, userData);

        res.status(200).json(result);
    } catch (error) {
        next(errors.INTERNAL_SERVER_ERROR); // forward the error to error-handling middleware
    }
};


export const get_Profile_Pic = async (req, res, next) => {
    try{
        const result = await getProfilePic(req.user.email);
        res.status(200).json(result)
    }catch(error){
        next(error);
    };
};
export const update_Profile_Pic = async (req, res, next) => {
    try {
        const user = {
            id: req.user.email
        };
        const userData = req.body;  // userData includes the fields to update

        const result = await updatePic(user, userData);

        res.status(200).json(result);
    } catch(error){
        next(error); // forward the error to error-handling middleware
    }
};


export const get_Language = async (req, res, next) => {
    try{
        const result = await getLanguage(req.user.user_id);
        res.status(200).json(result)
    }catch(error){
        next(error);
    };
};
export const get_Languages = async (req, res, next) => {
    try{
        const result = await getLanguages();
        res.status(200).json(result)
    }catch(error){
        next(error);
    };
};
export const update_Language = async (req, res, next) => {
    try {
        const user = {
            user_id: req.user.user_id
        };
        const language_id = req.body.language_id; // assuming 'id' is coming in req.body
        const userData = req.body;  // userData includes the fields to update

        const result = await updatedLanguage(user, language_id, userData);

        res.status(200).json(result);
    } catch(error){
        next(error);
    }
};


export const add_Article = async (req, res, next) => {
    try {
        const user = req.user.user_id;
        const articleData = req.body;
        const result = await createArticle(user, articleData);
        res.status(200).json(result)
    }catch(error){
        next(error)
    }
};
export const update_Article = async (req, res, next) => {
    try{
        const userid = req.user.user_id;
        const id = req.body.id;
        const articleData = req.body;
        const result = await updateArticle(userid, id, articleData);

        res.status(200).json(result);
    }catch(error){
        next(error);
    }
};
export const get_Article = async (req, res, next) => {
    console.log('Controller received req.user:', req.user);
    console.log('Controller received req.user.user_id:', req.user?.user_id);
    try{
        const result = await getArticle(req.user.user_id);
        res.status(200).json(result)
    }catch(error){
        next(error);
    };
};
export const new_get_Articles = async (req, res, next) => {
    try{
        const result = await new_getArticles();
        res.status(200).json(result)
    }catch(error){
        next(error);
    };
};


export const getGitHubRepos = async (req, res, next) => {
    try {
      const repos = await fetchGitHubRepos();
      res.status(200).json({ message: "GitHub repositories fetched", repos });
    } catch (error) {
      next(error);
    }
  };


export const uploadImage = async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const user_id = req.user.user_id;
  
      const image = await uploadImageToCloud(user_id, req.file, title, description);
      res.status(200).json({ message: 'Image uploaded', image });
    } catch (error) {
      next(error);
    }
  };
  
export const get_Images = async (req, res, next) => {
    try{
        const result = await fetchImg(req.user.user_id);
        res.status(200).json(result)

    }catch(error) {
        next(error)
    }
};


// Get all images from the image table
export const getImages = async (req, res) => {
  try {
    const images = await fetchAllImages();
    res.status(200).json(images);
  } catch (err) {
    console.error("Error fetching images:", err.message);
    res.status(500).json({ message: "Failed to retrieve images" });
  }
};

// Get all pic records
export const getPics = async (req, res) => {
  try {
    const pics = await fetchAllPics();
    // console.log("API Response:", pics);
    res.status(200).json(pics);
  } catch (err) {
    console.error("Error fetching pics:", err.message);
    res.status(500).json({ message: "Failed to retrieve pics" });
  }
};

// Add a new pic record
export const addPic = async (req, res) => {
  try {
    const newPic = await createPic(req.body);
    res.status(201).json(newPic);
  } catch (err) {
    console.error("Error adding pic:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// Update a pic record by ID
export const updatePix = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await modifyPic(parseInt(id), req.body);
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating pic:", err.message);
    res.status(400).json({ message: err.message });
  }
};