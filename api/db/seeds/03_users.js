const bcrypt = require('bcryptjs')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  let pw1 = 'password';
  let hashedpw1 = await bcrypt.hash(pw1, 10);

  await knex('users').insert([
    // 1
    {
      org_id: 1,
      name: "admin",
      rank: "CIV",
      email: "admin@taskify.com",
      position_id: 3,
      password: hashedpw1
    },
    //2
    {
      org_id: 5,
      name: "Snuffy",
      rank: "Spc 4",
      email: "snuffy@taskify.com",
      position_id: 1,
      password: hashedpw1
    },
    //3
    {
      org_id: 2,
      name: "Dave Clay",
      rank: "CIV",
      email: "dave.clay@taskify.com",
      position_id: 3,
      password: hashedpw1
    },
    //4
    {
      org_id: 4,
      name: "Jones",
      rank: "Spc 3",
      email: "jones@taskify.com",
      position_id: 1,
      password: hashedpw1
    },
    //5
    {
      org_id: 3,
      name: "Ruth Carver",
      rank: "1st Lt",
      email: "carver@taskify.com",
      position_id: 2,
      password: hashedpw1
    },
    //6
    {
      org_id: 3,
      name: "Dimitri Riddle",
      rank: "Spc 3",
      email: "riddle@taskify.com",
      position_id: 1,
      password: hashedpw1
    },
    //7
    {
      org_id: 3,
      name: "Nehemiah Alvin",
      rank: "Spc 3",
      email: "nehemiah@taskify.com",
      position_id: 1,
      password: hashedpw1
    },
    //8
    {
      org_id: 3,
      name: "Dan",
      rank: "2d Lt",
      email: "dan@taskify.com",
      position_id: 2,
      password: hashedpw1
    },
    //9
    {
      org_id: 3,
      name: "John Smith",
      rank: "CIV",
      email: "jsmith@taskify.com",
      position_id: 3,
      password: hashedpw1
    },
    //10
    {
      org_id: 4,
      name: "John Doe",
      rank: "Spc 2",
      email: "jdoe@taskify.com",
      position_id: 1,
      password: hashedpw1
    },
    //11
    {
      org_id: 4,
      name: "Timmy",
      rank: "Spc 3",
      email: "timmy@taskify.com",
      position_id: 1,
      password: hashedpw1
    },
    //12
    {
      org_id: 4,
      name: "Janice Miller",
      rank: "CIV",
      email: "janice@taskify.com",
      position_id: 2,
      password: hashedpw1
    },
  ]);
};
