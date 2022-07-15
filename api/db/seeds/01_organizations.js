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
    { name: '2 SOPS', img_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/2nd_Space_Operations_Squadron_emblem.png', parent_id: 1},
    { name: '2SOPS/DOO', img_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/2nd_Space_Operations_Squadron_emblem.png', parent_id: 2},
    { name: '2SOPS/DOOA', img_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/2nd_Space_Operations_Squadron_emblem.png', parent_id: 3},
    { name: '2SOPS/DOOC', img_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/2nd_Space_Operations_Squadron_emblem.png', parent_id: 3},
  ]);
};
