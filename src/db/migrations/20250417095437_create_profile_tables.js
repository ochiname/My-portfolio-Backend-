/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// migrations/20250417_create_profile_tables.js

export function up(knex) {
    return knex.schema

      // Users Table
      .createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.string('role', 100);
        table.string('profile_picture', 255);
        table.string('linkedin', 255);
        table.string('github', 255);
        table.string('twitter', 255);
        table.text('bio');
        table.string('email', 255).notNullable();
        table.string('phone', 20);
        table.string('location', 255);
        table.string('password', 255).notNullable();
        table.string('admin_role', 50).defaultTo('admin');
      })

      // Education Table
      .createTable('education', (table) => {
        table.increments('education_id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
        table.string('degree', 255).notNullable();
        table.string('institution', 255).notNullable();
        table.integer('start_year');
        table.integer('end_year');
      })

      // Skills Table
      .createTable('skills', (table) => {
        table.increments('skill_id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
        table.string('skill_name', 100).notNullable();
        table.integer('proficiency');
      })

      // Work Experience Table
      .createTable('work_experience', (table) => {
        table.increments('experience_id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
        table.string('job_title', 255).notNullable();
        table.string('company_name', 255).notNullable();
        table.integer('start_year');
        table.integer('end_year').nullable();
        table.text('responsibilities');
      })

      // Projects Table
      .createTable('projects', (table) => {
        table.increments('project_id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
        table.string('project_name', 255).notNullable();
        table.text('description');
        table.text('technologies');
      })

      // Languages Table
      .createTable('languages', (table) => {
        table.increments('language_id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
        table.string('language_name', 100).notNullable();
        table.string('proficiency', 100);
      })

      // Certifications Table
      .createTable('certifications', (table) => {
        table.increments('certification_id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
        table.string('certification_name', 255).notNullable();
        table.string('institution_name', 255);
        table.integer('year');
      })

      // Volunteer Experience Table
      .createTable('volunteer_experience', (table) => {
        table.increments('volunteer_id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
        table.string('role', 255).notNullable();
        table.string('organization', 255).notNullable();
        table.integer('start_year');
        table.integer('end_year');
        table.text('description');
      })

      // Articles Table
      .createTable('articles', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
        table.string('title').notNullable();
        table.string('img_url');
        table.text('description');
        table.string('link_to_article');
      })

      // ✅ New Images Table
      .createTable('images', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE');
        table.string('title');
        table.string('url_link');
        table.text('description');
      })

      // ✅ New Pic Table
      .createTable('pic', (table) => {
        table.increments('id').primary();
        table.string('image_url', 255).notNullable();
        table.string('usage_type', 100);
      })

      // Contact Table
      .createTable('contact', (table) => {
        table.increments('contact_id').primary();
        table.string('email', 255).notNullable();
        table.string('phone1', 20);
        table.string('phone2', 20);
        table.string('location', 255);
      });
};

export function down(knex) {
  return knex.schema
    .dropTableIfExists('contact')
    .dropTableIfExists('pic')
    .dropTableIfExists('images')
    .dropTableIfExists('articles')
    .dropTableIfExists('volunteer_experience')
    .dropTableIfExists('certifications')
    .dropTableIfExists('languages')
    .dropTableIfExists('projects')
    .dropTableIfExists('work_experience')
    .dropTableIfExists('skills')
    .dropTableIfExists('education')
    .dropTableIfExists('users');
};
