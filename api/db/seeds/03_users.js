const bcrypt = require('bcryptjs')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  let pw1 = 'mybeardisawesome';
  let hashedpw1 = await bcrypt.hash(pw1, 10);
  let pw2 = 'armyrules';
  let hashedpw2 = await bcrypt.hash(pw2, 10);
  let pw3 = 'myhairisawesome';
  let hashedpw3 = await bcrypt.hash(pw3, 10);
  let pw4 = 'password';
  let hashedpw4 = await bcrypt.hash(pw4, 10);
  let pw5 = 'password';
  let hashedpw5 = await bcrypt.hash(pw5, 10);
  let pw6 = 'password';
  let hashedpw6 = await bcrypt.hash(pw6, 10);
  let pw7 = 'password';
  let hashedpw7 = await bcrypt.hash(pw7, 10);
  await knex('users').insert([
    {
      org_id: 1,
      name: "admin",
      rank: "CIV",
      email: "admin@example.com",
      position_id: 3,
      password: hashedpw4
    },
    {
      org_id: 1,
      name: "Jeff Haddock",
      rank: "CIV",
      email: "jeff.haddock@gmail.com",
      position_id: 1,
      password: hashedpw1
    },
    {
      org_id: 2,
      name: "Dave Clay",
      rank: "CIV",
      email: "dave.clay@gmail.com",
      position_id: 3,
      password: hashedpw2
    },
    {
      org_id: 3,
      name: "James Kelley",
      rank: "CIV",
      email: "james.kelley@gmail.com",
      position_id: 2,
      password: hashedpw3
    },
    {
      org_id: 3,
      name: "Claire Badger",
      rank: "2LT",
      email: "claire@gmail.com",
      position_id: 2,
      password: hashedpw5
    },
    {
      org_id: 3,
      name: "Isaac St. Pierre",
      rank: "Spc 3",
      email: "isaac@gmail.com",
      position_id: 1,
      password: hashedpw6
    },
    {
      org_id: 3,
      name: "Nehemiah Alvin",
      rank: "Spc 3",
      email: "nehemiah@gmail.com",
      position_id: 1,
      password: hashedpw7
    },
  ]);
};
