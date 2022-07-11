/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex('comments').del();
  await knex('users_tasks').del();
  await knex('tasks').del();
  await knex('users').del();
  await knex('positions').del();
  await knex('organizations').del()
  await knex('organizations').insert([
    { name: 'Space Force', img_url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Logo_of_the_United_States_Space_Force.png', parent_id: null},
    { name: '21 CS', img_url: 'https://media.defense.gov/2019/May/13/2002131051/780/780/0/190513-F-O3755-1001.JPG', parent_id: 1},
    { name: 'SCX', img_url: 'https://media.defense.gov/2019/May/13/2002131051/780/780/0/190513-F-O3755-1001.JPG', parent_id: 2},
    { name: 'SCXZ', img_url: 'https://media.defense.gov/2019/May/13/2002131051/780/780/0/190513-F-O3755-1001.JPG', parent_id: 3},
  ]);
};
