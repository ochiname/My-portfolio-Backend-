import {knex} from "../../config/dbconnect.js";



export const getUserByEmail = async (email) => {
    const user = await knex('users')
        .where({ email })
        .first();  

    if (!user) {
        throw new Error('User not found');
    }

    return user;  
};
export const getUsers = async () => {
    const user = await knex('users')
        .select('*'); 
    return user;  
};

export const updateUserByEmail = async (email, userData) => {
    const { password, id, admin_role, ...safeData } = userData; // remove password if present

    const updatedUser = await knex("users")
        .where({ email })
        .update(safeData)
        .returning("*");

    return updatedUser.length ? updatedUser[0] : null;
};
export const profileGetUserByEmail = async (email) => {
    const user = await knex("users")
        .where({ email })
        .select("email",
              "first_name",
              "last_name", 
              "role", 
              "location", 
              "bio", 
              "phone",
              "linkedin",
              "github",
              "twitter") // Exclude sensitive data
        .first();

    return user || null;
};


export const getUserExprience = async (user_id) => {
    const exp = await knex("work_experience")
        .where({ user_id })
        .select(
            "experience_id",
            "job_title",
            "start_year",
            "end_year",
            "responsibilities"
        );

    return exp;  // returns an array of records (could be empty)
};
export const getUserExpriences = async () => {
    const exp = await knex("work_experience")
        .select("*");

    return exp;  // returns an array of records (could be empty)
};
export const updateUserExprience= async (experience_id, user_id, userData) => {
  // Remove id and user_id from userData if present for safety
  const {  user_id: userId, experience_id: eduId, ...safeData } = userData;

  const updatedExp = await knex("work_experience")
    .where({ experience_id, user_id })
    .update(safeData)
    .returning("*");

  return updatedExp.length ? updatedEdu[0] : null;
};

export const getUserEducation = async (user_id) => {
    const edu = await knex("education")
        .where({ user_id })
        .select(
            "education_id",
            "degree",
            "institution",
            "start_year",
            "end_year"
        );

    return edu;  // returns an array of records (could be empty)
};
export const getUserEducations = async () => {
    const edu = await knex("education")
        .select(
            "education_id",
            "degree",
            "institution",
            "start_year",
            "end_year"
        );

    return edu;  // returns an array of records (could be empty)
};
// export const getUserEducation = async (user_id) => {
//     const edu = await knex("education")
//         .where({ user_id })   // <-- add dot here
//         .select(
//             "degree",
//             "institution",
//             "start_year",
//             "end_year"
//         )
//         .first();

//     return edu || null;
// };
export const updateUserEducation = async (education_id, user_id, userData) => {
  // Remove id and user_id from userData if present for safety
  const { id, user_id: userId, education_id: eduId, ...safeData } = userData;

  const updatedEdu = await knex("education")
    .where({ education_id, user_id })
    .update(safeData)
    .returning("*");

  return updatedEdu.length ? updatedEdu[0] : null;
};
// export const updateUserEducation = async (user_id, userData) => {
//     const { id, user_id: userId, ...safeData } = userData;

//     const updatedEdu = await knex("education")
//         .where({ user_id })
//         .update(safeData)
//         .returning("*");

//     return updatedEdu.length ? updatedEdu[0] : null;
// };


export const getUserContact = async (email) => {
    const contact = await knex("contact")
        .where({ email }) // ✅ Correct syntax
        .select(
            "email",
            "location",
            "phone1",
            "phone2"
        )
        .first();

    return contact || null;
};
export const getUserContacts = async () => {
    const contact = await knex("contact")
        .select(
            "email",
            "location",
            "phone1",
            "phone2"
        )
        .first();

    return contact || null;
};
export const updateUserContact = async (email, userData) => {
    const { id, email: userEmail, ...safeData } = userData; // remove password if present

    const updatedConatact = await knex("contact")
        .where({ email })
        .update(safeData)
        .returning("*");

    return updatedConatact.length ? updatedConatact[0] : null;
};



export const getUserCertificate= async (user_id) =>{
    const certificates = await knex("certifications")
        .where({ user_id })
        .select(
            "certification_id",
            "certification_name",
            "institution_name",
            "year"
        )
        .returning("*");

    return certificates || null;
};
export const getUserCertificates= async () =>{
    const certificates = await knex("certifications")
        .select(
            "certification_id",
            "certification_name",
            "institution_name",
            "year"
        )
        .returning("*");

    return certificates || null;
};
export const updateUseCertificate = async (certification_id, userData) => {
    const { id, user_id: userId, ...safeData } = userData; // remove password if present

    const updatedCertificate = await knex("certifications")
        .where({ certification_id })
        .update(safeData)
        .returning("*");

    return updatedCertificate.length ? updatedCertificate[0] : null;
};


export const getUserLanguage = async (user_id) => {
    const languages = await knex("languages")
        .where({ user_id })   // ✅ filter by user_id
        .select(
            "language_id",
            "language_name",
            "proficiency"
        );

    return languages.length ? languages : null;  // ✅ return array or null
};
export const getUserLanguages = async () => {
    const languages = await knex("languages")
        .select(
            "language_id",
            "language_name",
            "proficiency"
        );

    return languages.length ? languages : null;  // ✅ return array or null
};
export const updateUserLanguage = async (language_id, userData) => {
    const { user_id,  ...safeData } = userData; // remove password if present

    const updatedLanguage = await knex("languages")
        .where({ language_id })
        .update(safeData)
        .returning("*");

    return  updatedLanguage.length ?  updatedLanguage[0] : null;
};



export const getUserSkill= async (user_id) => {
    const skill = await knex("skills")
        .where({ user_id })   // ✅ filter by user_id
        .select(
            "skill_id",
            "skill_name",
            "proficiency"
        );

    return skill.length ? skill : null;  // ✅ return array or null
};
export const getUserSkills= async () => {
    const skill = await knex("skills")
        .select(
            "skill_id",
            "skill_name",
            "proficiency"
        );

    return skill.length ? skill : null;  // ✅ return array or null
};
export const updateUserSkill = async (skill_id, userData) => {
    const { id, user_id: userId, ...safeData } = userData; // remove password if present

    const updatedSkill = await knex("skills")
        .where({ skill_id })
        .update(safeData)
        .returning("*");

    return  updatedSkill.length ?  updatedSkill[0] : null;
};
export const addSkills = async (user_id, skillData) => {
    const [newArticle] = await knex("skills")
      .insert({ ...skillData, user_id })
      .returning("*"); // returns the inserted row(s)
    
    return newArticle;
  };


export const getUserProject = async (user_id) => {
    const project = await knex("projects")
        .where({ user_id })   // ✅ filter by user_id
        .select(
            "project_id",
            "project_name",
            "description",
            "technologies"
        );

    return project.length ? project : null;  // ✅ return array or null
};
export const getUserProjects = async () => {
    const project = await knex("projects")
        .select(
            "project_id",
            "project_name",
            "description",
            "technologies"
        );

    return project.length ? project : null;  // ✅ return array or null
};
export const updateUserProject = async (project_id, userData) => {
    const { user_id: userId, ...safeData } = userData; // remove password if present

    const updatedProject = await knex("projects")
        .where({ project_id })
        .update(safeData)
        .returning("*");

    return  updatedProject.length ?  updatedProject[0] : null;
};


export const getUserProfilePic = async (email) => {
    const pic = await knex("users")
        .where({ email })   
        .select(
            "profile_picture"
        );

    return pic;  
};
export const updateUserPic = async (email, userData) => {
    const { id, email: userEmail, ...safeData } = userData; // remove password if present

    const updatedPic = await knex("education")
        .where({ email })
        .update(safeData)
        .returning("*");

    return  updatedPic.length ?  updatedPic[0] : null;
};


export const addArticle = async (user_id, articleData) => {
    const [newArticle] = await knex("articles")
      .insert({ ...articleData, user_id })
      .returning("*"); // returns the inserted row(s)
    
    return newArticle;
  };
export const updateArticles = async (id, articleData) => {
    const { user_id: _omitId, ...safeData } = articleData; // omit id from articleData if it exists
    const [updatedArticle] = await knex("articles")
        .where({ id })
        .update(safeData)
        .returning("*");

    return updatedArticle || null;
};
export const get_Articles = async (user_id) => {
    const articles = await knex("articles")
        .where({ user_id })   // ✅ filter by user_id
        .select("*");

    return articles.length ? articles : null;  // ✅ return array or null
};
export const new_get_Articless = async () => {
    const articles = await knex("articles")
        .select("*");

    return articles.length ? articles : null;  // ✅ return array or null
};

export const saveImage = async (user_id, title, description, url_link) => {
    const [image] = await knex('images')
      .insert({ user_id, title, description, url_link })
      .returning('*');
    return image;
  };
export const getImage = async (user_id) => {
    const img = await knex("images")
        .where ({ user_id })
        .select("*");
    return img.length ? img : null;    
};

export const getAllImages = async () => {
    const img = await knex("images")
        .select("*");
    return img.length ? img : null;    
};

// Get all pics from the `pic` table
export const getAllPics = async () => {
    const pictures = await knex("pic")
       .select("id", "image_url", "usage_type");
    return pictures.length ? pictures : null;    
};

// Add a new pic entry to the `pic` table
export const insertPic = async (data) => {
    const insert =  await knex("pic")
         .insert(data)
         .returning("*");
    return insert.length ? insert : null;
};

// Update an existing pic entry
export const updatePics = async (id, data) => {
  const picupdate =  await knex("pic")
     .where({ id })
     .update(data)
     .returning("*");
   return picupdate.length ? picupdate : null;
};
