/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').insert([
    {
      title: "submission for NCO of the Quarter",
      description: "1206 due to flt/cc for NCO of the Quarter award. 1206 should have 4 job bullets and 2 whole airman concept bullets",
      priority: 3,
      assigned_date: new Date("2022-07-05"),
      suspense_date:new Date("2022-07-25"),
      status: "to do",
      org_id: 1,
      author_id: 3,
    },
    {
      title: "Base Cleanup",
      description: "Clean ENT street",
      priority: 2,
      assigned_date: new Date("2022-07-06"),
      suspense_date:new Date("2022-07-14"),
      status: "in progress",
      org_id: 1,
      author_id: 3,
    },
    {
      title: "Snow Duty",
      description: "Complete by EOD",
      priority: 3,
      assigned_date: new Date('2022-01-08',),
      suspense_date: new Date('2022-01-09'),
      status: "in progress",
      org_id: 3,
      author_id: 3,
    },
    {
      title: "Re-assign roles for users",
      description: "users 10, 12, 15 should all be supervisors in org 5",
      priority: 2,
      assigned_date: new Date('2022-01-08',),
      suspense_date: new Date('2022-07-16'),
      status: "to do",
      org_id: 1,
      author_id: 1,
    },
    {
      title: "Add organization",
      description: "61 CYS has requested taskify accounts",
      priority: 2,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-07-20'),
      status: "to do",
      org_id: 1,
      author_id: 1,
    },
    {
      title: "Assist In-Bounds",
      description: "Help the In-bounds with In-Processing",
      priority: 2,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-07-20'),
      status: "to do",
      org_id: 4,
      author_id: 1,
    },

    {
      title: "In-process",
      description: "Follow in processing sheet, notify supervisor with any issues",
      priority: 1,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-07-20'),
      status: "to do",
      org_id: 4,
      author_id: 5,
    },
    {
      title: "set up org for SCXZ",
      description: "org is child of scx",
      priority: 2,
      assigned_date: new Date('2022-07-01',),
      suspense_date: new Date('2022-07-16'),
      completed_date: new Date('2022-07-02'),
      status: "finished",
      org_id: 1,
      author_id: 1,
    },
    {
      title: "set up user roles for SCXZ",
      description: "see Claire Badger for list of roles",
      priority: 2,
      assigned_date: new Date('2022-07-10',),
      suspense_date: new Date('2022-07-16'),
      completed_date: new Date('2022-07-11'),
      status: "finished",
      org_id: 1,
      author_id: 1,
    },
    {
      title: "Assist In-Bounds",
      description: "Help the In-bounds with In-Processing",
      priority: 2,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-07-20'),
      status: "to do",
      org_id: 5,
      author_id: 1,
    },
  ]);
};

/*
  possible status:
  [
    "to do",
    "in progress",
    "finished"
  ]
*/
