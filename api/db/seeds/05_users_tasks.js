/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users_tasks').insert([
    {user_id: 2, task_id: 1},
    {user_id: 3, task_id: 1},
    {user_id: 4, task_id: 2},
    {user_id: 2, task_id: 3},
    {user_id: 4, task_id: 3},
    {user_id: 1, task_id: 4},
    {user_id: 1, task_id: 5},
    {user_id: 5, task_id: 6},
    {user_id: 10, task_id: 7},
    {user_id: 6, task_id: 7},
    {user_id: 7, task_id: 7},
    {user_id: 9, task_id: 8},
    {user_id: 9, task_id: 9},
    {user_id: 5, task_id: 10},
    {user_id: 2, task_id: 11},
    {user_id: 3, task_id: 12},
    {user_id: 2, task_id: 13},
    {user_id: 2, task_id: 14},
    {user_id: 2, task_id: 15},
    {user_id: 2, task_id: 16},
    {user_id: 9, task_id: 17},
    {user_id: 11, task_id: 18},
    {user_id: 10, task_id: 18},
    {user_id: 8, task_id: 20},
    {user_id: 8, task_id: 23},
    {user_id: 9, task_id: 24},
    {user_id: 8, task_id: 25},
    {user_id: 9, task_id: 27},
    {user_id: 2, task_id: 30},
    {user_id: 2, task_id: 31},
    {user_id: 8, task_id: 32},
    {user_id: 2, task_id: 33},
    {user_id: 2, task_id: 34},
  ]);
};
