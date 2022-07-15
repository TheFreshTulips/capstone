/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').insert([

    //1
    {
      title: "submission for Quartly Awards",
      description: "1206 due to flt/cc for all Quarterly Awards. 1206 should have 4 job bullets and 2 whole airman concept bullets",
      priority: 3,
      assigned_date: new Date("2022-07-05"),
      suspense_date:new Date("2022-07-25"),
      status: "to do",
      org_id: 1,
      author_id: 3,
    },

    //2
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

    //3
    {
      title: "Snow Duty",
      description: "Complete by EOD",
      priority: 3,
      assigned_date: new Date('2022-01-08',),
      suspense_date: new Date('2022-01-09'),
      status: "finished",
      org_id: 3,
      author_id: 3,
    },

    //4
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

    //5
    {
      title: "Add organization",
      description: "61 CYS has requested taskify accounts, image provided: https://upload.wikimedia.org/wikipedia/commons/3/3c/61st_Cyber_Squadron_emblem.png",
      priority: 2,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-07-20'),
      status: "to do",
      org_id: 1,
      author_id: 1,
    },

    //6
    {
      title: "Assist In-Bounds",
      description: "Assist in-bounds with in-Processing",
      priority: 2,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-07-20'),
      status: "to do",
      org_id: 4,
      author_id: 1,
    },

    //7
    {
      title: "In-process",
      description: "Follow in processing sheet, notify supervisor with any issues",
      priority: 1,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-07-20'),
      status: "to do",
      org_id: 4,
      author_id: 12,
    },

    //8
    {
      title: "set up org for DOOA",
      description: "org is child of 2SOPS",
      priority: 2,
      assigned_date: new Date('2022-07-01',),
      suspense_date: new Date('2022-07-16'),
      completed_date: new Date('2022-07-02'),
      status: "finished",
      org_id: 3,
      author_id: 8,
    },

    //9
    {
      title: "set up user roles for DOOA",
      description: "",
      priority: 2,
      assigned_date: new Date('2022-07-10',),
      suspense_date: new Date('2022-07-16'),
      completed_date: new Date('2022-07-11'),
      status: "finished",
      org_id: 3,
      author_id: 8,
    },

    //10
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

    //11
    {
      title: "Prepare Presentation",
      description: "Give presentation for the upcoming commander meeting",
      priority: 3,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-07-20'),
      status: "finished",
      org_id: 1,
      author_id: 2,
    },

    //12
    {
      title: "Give Newcomers Brief",
      description: "Give an overview of your shop for the newcomers in the squadron",
      priority: 5,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-07-20'),
      status: "to do",
      org_id: 2,
      author_id: 2,
    },

    //13
    {
      title: "A Personal Task for me",
      description: "A reminder for myself for clearing the org box",
      priority: 4,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-07-20'),
      status: "to do",
      org_id: 2,
      author_id: 2,
    },

    //14
    {
      title: "Attend commander's meeting",
      description: "Discuss the office changes with leadership, ensure to discuss progress with shop chemistry",
      priority: 3,
      assigned_date: new Date('2021-07-11',),
      suspense_date: new Date('2021-07-20'),
      completed_date: new Date('2021-07-20'),
      status: "finished",
      org_id: 5,
      author_id: 2,
    },

    //15
    {
      title: "OMB sponsor",
      description: "Assign someone in the office to be the OMB sponsor",
      priority: 4,
      assigned_date: new Date('2021-08-11',),
      suspense_date: new Date('2021-08-20'),
      completed_date: new Date('2021-07-20'),
      status: "finished",
      org_id: 5,
      author_id: 2,
    },

    //16
    {
      title: "Post office",
      description: "Receive mail from post office for the incoming personnel",
      priority: 4,
      assigned_date: new Date('2022-03-11',),
      suspense_date: new Date('2022-03-20'),
      completed_date: new Date('2021-07-20'),
      status: "finished",
      org_id: 5,
      author_id: 2,
    },

    //17
    {
      title: "Change Spc4 Snuffy's Taskify permissions",
      description: "Spc4 Snuffy promotes to Sgt and will be moving to 2SOPS/DOO to be a supervisor",
      priority: 4,
      assigned_date: new Date('2022-07-15',),
      suspense_date: new Date('2022-07-29'),
      status: "to do",
      org_id: 3,
      author_id: 8,
    },
    //18
    {
      title: "Trash Day",
      description: "DOOA must take out trash from the north side of the building",
      priority: 4,
      assigned_date: new Date('2022-07-15',),
      suspense_date: new Date('2022-07-20'),
      status: "to do",
      org_id: 3,
      author_id: 8,
    },
    //19
    {
      title: "Restock snack bar ",
      description: "Snack bar in Rm 101 needs to be restocked, it's been empty for a week now",
      priority: 5,
      assigned_date: new Date('2022-07-13',),
      suspense_date: new Date('2022-08-01'),
      status: "in progress",
      org_id: 3,
      author_id: 6,
    },
    //20
    {
      title: "Update Master Slide Log",
      description: "Ensure shift checklist is completed and update MSL to reflect crew's actions for the day",
      priority: 4,
      assigned_date: new Date('2022-07-15',),
      suspense_date: new Date('2022-07-29'),
      status: "to do",
      org_id: 3,
      author_id: 8,
    },
    //21
    {
      title: "Setup meeting with CIDX",
      description: "We need to setup a meeting next week with leadership from CIDX, reach out to Sherri with questions.",
      priority: 2,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-07-18'),
      status: "in progress",
      org_id: 5,
      author_id: 12,
    },
    //22
    {
      title: "Fundraiser",
      description: "Set up fundraiser for the Boys n Girls club",
      priority: 3,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-08-01'),
      status: "in progress",
      org_id: 4,
      author_id: 8,
    },
    //23
    {
      title: "Change of Command",
      description: "Get personnel from the unit to partake in the change of command ceremony",
      priority: 3,
      assigned_date: new Date('2022-07-11',),
      suspense_date: new Date('2022-08-05'),
      status: "in progress",
      org_id: 3,
      author_id: 8,
    },
    //24
    {
      title: "Set up new organization",
      description: "Set up new organization for 2SOPS/MA. See Lt Dan for details",
      priority: 3,
      assigned_date: new Date('2022-07-14',),
      suspense_date: new Date('2022-07-20'),
      status: "in progress",
      org_id: 3,
      author_id: 8,
    },
    //25
    {
      title: "Assign roles for new organization",
      description: "Set up roles for 2SOPS/MA. See Lt Dan for details",
      priority: 3,
      assigned_date: new Date('2022-07-14',),
      suspense_date: new Date('2022-07-25'),
      status: "to do",
      org_id: 3,
      author_id: 8,
    },
    //26
    {
      title: "Sports Day POC",
      description: "Need volunteer to lead Sports Day, would be good for a CGO",
      priority: 4,
      assigned_date: new Date('2022-07-12',),
      suspense_date: new Date('2022-08-05'),
      status: "to do",
      org_id: 5,
      author_id: 12,
    },
    //27
    {
      title: "Perform an audit of roles and organizations",
      description: "Perform semi-annual audit at your discretion",
      priority: 3,
      assigned_date: new Date('2022-07-10',),
      suspense_date: new Date('2022-08-10'),
      status: "in progress",
      org_id: 3,
      author_id: 9,
    },
    //28
    {
      title: "Reminder for myself",
      description: "Be sure to ask Lt about volunteer oportunities",
      priority: 3,
      assigned_date: new Date('2022-07-10',),
      suspense_date: new Date('2022-08-10'),
      status: "to do",
      org_id: 4,
      author_id: 4,
    },
    //29
    {
      title: "Gather bullets for supervisor",
      description: "Need to submit bullets to supervisor for upcoming quarterly award",
      priority: 3,
      assigned_date: new Date('2022-07-12',),
      suspense_date: new Date('2022-08-10'),
      status: "in progress",
      org_id: 4,
      author_id: 4,
    },
    //30
    {
      title: "Complete PreMonitoring Report",
      description: "Reference PreMonitor guide for further details and complete",
      priority: 2,
      assigned_date: new Date('2022-07-09',),
      suspense_date: new Date('2022-07-10'),
      status: "finished",
      org_id: 5,
      author_id: 5,
    },
    //31
    {
      title: "Fill out fitness tracker",
      description: "Add recent fitness test scores to tracker ASAP",
      priority: 2,
      assigned_date: new Date('2022-07-12',),
      suspense_date: new Date('2022-08-01'),
      status: "finished",
      org_id: 4,
      author_id: 12,
    },
    //32
    {
      title: "Cyber Awareness training",
      description: "Complete annual cyber awareness training before submitting package for promotion",
      priority: 2,
      assigned_date: new Date('2022-07-26',),
      suspense_date: new Date('2022-08-05'),
      completed_date: new Date('2021-08-05'),
      status: "finished",
      org_id: 5,
      author_id: 8,
    },
    //33
    {
      title: "Compile WAR for unit",
      description: "Now that you're a supervisor, please compile the unit's weekly activity report",
      priority: 4,
      assigned_date: new Date('2022-07-26',),
      suspense_date: new Date('2022-08-05'),
      status: "to do",
      org_id: 5,
      author_id: 8,
    },
    //34
    {
      title: "Check on all current unit tasks",
      description: "Now that you're a supervisor, please check on the active tasks for our unit",
      priority: 4,
      assigned_date: new Date('2022-07-26',),
      suspense_date: new Date('2022-08-03'),
      status: "to do",
      org_id: 5,
      author_id: 8,
    },

  ]);
};