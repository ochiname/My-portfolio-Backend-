/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('contact').del();
  await knex('images').del();
  await knex('articles').del();
  await knex('volunteer_experience').del();
  await knex('certifications').del();
  await knex('languages').del();
  await knex('projects').del();
  await knex('work_experience').del();
  await knex('skills').del();
  await knex('education').del();
  await knex('users').del();
  await knex('pic').del(); // Added for new table

  // Insert into contact
  await knex('contact').insert([
    {
      email: 'unugorstephendavid@gmail.com',
      phone: '+234-810-995-7823',
      location: 'Abuja, Nigeria'
    }
  ]);

  // Insert user
  await knex('users').insert([
    {
      first_name: 'Ochiname Stephen-Davidr',
      last_name: 'Unugor',
      role: 'Operations Manager & Software Enthusiast',
      profile_picture: 'https://example.com/profile.jpg',
      linkedin: 'https://linkedin.com/in/ochiname',
      github: 'https://github.com/ochiname',
      twitter: 'https://twitter.com/ochiname',
      bio: `Hello! My name is Unugor Ochiname Stephen-David, a passionate coder and operations manager with years of experience in the tech industry. I specialize in creating efficient systems and building engaging softwares.

With a strong background in Software Quality Assurance and Operations Management, I am committed to solving problems and delivering impactful projects.`,
      email: 'unugorstephendavid@gmail.com',
      phone: '+234-810-995-7823',
      location: 'Abuja, Nigeria',
      password: '',
      admin_role: 'admin'
    }
  ]);

  // Insert education
  await knex('education').insert([
    {
      user_id: 1,
      degree: 'BSc Industrial Technology and Education (Building Technology)',
      institution: 'Federal University Of Technology Minna, Nigeria',
      start_year: 2013,
      end_year: 2018
    }
  ]);

  // Insert skills
  await knex('skills').insert([
    { user_id: 1, skill_name: 'Data Science & Python', proficiency: 60 },
    { user_id: 1, skill_name: 'Operations Management', proficiency: 90 },
    { user_id: 1, skill_name: 'Mysql DataBase', proficiency: 80 },
    { user_id: 1, skill_name: 'JavaScript', proficiency: 75 },
  ]);

  // Insert work experience
  await knex('work_experience').insert([
    {
      user_id: 1,
      job_title: 'Operations Manager',
      company_name: 'Tech Solutions Ltd.',
      start_year: 2019,
      end_year: null,
      responsibilities: 'Overseeing operations, managing a team, optimizing processes, and ensuring efficient service delivery in the tech sector.'
    },
    {
      user_id: 1,
      job_title: 'Project Coordinator',
      company_name: 'Web Innovations Inc.',
      start_year: 2017,
      end_year: 2019,
      responsibilities: 'Coordinated web development projects, managed timelines, and collaborated with developers to meet client requirements.'
    }
  ]);

  // Insert projects
  await knex('projects').insert([
    {
      user_id: 1,
      project_name: 'Data Science Dashboard',
      description: 'A web app to visualize data insights in real-time.',
      technologies: 'Python, Flask, D3.js'
    },
    {
      user_id: 1,
      project_name: 'Smart Inventory System',
      description: 'Inventory management system with predictive analysis features.',
      technologies: 'Python, Machine Learning'
    }
  ]);

  // Insert languages
  await knex('languages').insert([
    { user_id: 1, language_name: 'English', proficiency: 'Fluent' },
    { user_id: 1, language_name: 'Hausa', proficiency: 'Intermediate' }
  ]);

  // Insert certifications
  await knex('certifications').insert([
    {
      user_id: 1,
      certification_name: 'Certified Data Scientist',
      institution_name: 'XYZ Institute',
      year: 2023
    },
    {
      user_id: 1,
      certification_name: 'Project Management Professional (PMP)',
      institution_name: 'ABC Organization',
      year: 2022
    }
  ]);

  // Insert volunteer experience
  await knex('volunteer_experience').insert([
    {
      user_id: 1,
      role: 'Community Tech Educator',
      organization: 'Local Nonprofit',
      start_year: 2020,
      end_year: 2021,
      description: 'Taught coding skills to underprivileged youth to foster interest in tech.'
    },
    {
      user_id: 1,
      role: 'Environmental Sustainability Advocate',
      organization: 'Green Earth NGO',
      start_year: 2018,
      end_year: 2020,
      description: 'Organized environmental awareness campaigns and promoted sustainability.'
    }
  ]);

  // Insert articles
  await knex('articles').insert([
    {
      user_id: 1,
      title: 'The Future of AI in Africa',
      img_url: 'https://example.com/ai-africa.jpg',
      description: 'Exploring the potential of artificial intelligence in the African continent.',
      link_to_article: 'https://example.com/articles/ai-africa'
    },
    {
      user_id: 1,
      title: 'Building Scalable Systems with Node.js',
      img_url: 'https://example.com/node-scalability.jpg',
      description: 'Tips and techniques for scaling Node.js applications.',
      link_to_article: 'https://example.com/articles/node-scalability'
    }
  ]);

  // Insert images
  await knex('images').insert([
    {
      user_id: 1,
      title: 'Tech Conference 2024',
      url_link: 'https://example.com/images/conference.jpg',
      description: 'Speaking at a major tech conference in Lagos, Nigeria.'
    },
    {
      user_id: 1,
      title: 'Hackathon Winner',
      url_link: 'https://example.com/images/hackathon.jpg',
      description: 'Awarded first place in a national hackathon competition.'
    }
  ]);

  // Insert into pic (NEW)
  await knex('pic').insert([
    {
      image_url: 'https://example.com/images/conference.jpg',
      usage_type: 'event'
    },
    {
      image_url: 'https://example.com/images/hackathon.jpg',
      usage_type: 'achievement'
    },
    {
      image_url: 'https://example.com/profile.jpg',
      usage_type: 'profile'
    },
    {
      image_url: 'https://example.com/node-scalability.jpg',
      usage_type: 'article'
    }
  ]);
}
