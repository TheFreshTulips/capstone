/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comments').insert([
    {
      task_id: 2,
      body: "Snow on sidewalks and in parking has to be shoveled",
      user_id: 4,
    },
    {
      task_id: 4,
      body: "Updated roles for users but organization needs to be changed",
      user_id: 3,
    },
    {
      task_id: 4,
      body: "I am busy this week so can't get to this",
      user_id: 3,
    },
    {
      task_id: 5,
      body: "62 CYS needs to have users 15, 16, and 17 added as supervisors",
      user_id: 1,
    },
    {
      task_id: 5,
      body: "users 15 - 17 do not exist yet, they need to register. I have notified them",
      user_id: 3,
    },
  ]);
};
