// bookshelf-app/server/db.js

// Import path module
const path = require("path");

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, "db/database.sqlite");
console.log(dbPath);
// Create connection to SQLite database
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

// Create a table in the database called "Users"
knex.schema
  // Make sure no "Users" table exists
  // before trying to create new
  .hasTable("Users")
  .then((exists) => {
    if (!exists) {
      // If no "Users" table exists
      // create new, with "uid", "username", "password", "role"
      // and use "uid" as a primary identification
      // and increment "uid" with every new record (user)
      return knex.schema
        .createTable("Users", (table) => {
          table.increments("uid").primary();
          table.string("username").unique();
          table.string("password");
          table.string("role");
          table.integer("polytechnicCourse");
          table
            .foreign("polytechnicCourse")
            .references("cid")
            .inTable("PolytechnicCourses")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
          table.integer("universityCourse");
          table
            .foreign("universityCourse")
            .references("cid")
            .inTable("UniversityCourses")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        })
        .then(() => {
          // Log success message
          console.log("Table 'Users' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("Skills")
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable("Skills", (table) => {
        table.increments("sid").primary();
        table.string("skill");
      });
    }
  })
  .then(() => {
    console.log("Table 'Skills' created");
  })
  .catch((error) => {
    console.error(`There was an error creating table: ${error}`);
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("UserSkillMap")
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable("UserSkillMap", (table) => {
        table.integer("userID")
        table
          .foreign("userID")
          .references("uid")
          .inTable("Users")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table.integer("skillID")
        table
          .foreign("skillID")
          .references("sid")
          .inTable("Skills")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table.primary(["userID", "skillID"]);
      });
    }
  })
  .then(() => {
    console.log("Table 'UserSkillMap' created");
  })
  .catch((error) => {
    console.error(`There was an error creating table: ${error}`);
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("SkillPolytechnicModuleMap")
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable("SkillPolytechnicModuleMap", (table) => {
        table.integer("skillID");
        table
          .foreign("skillID")
          .references("sid")
          .inTable("Skills")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table.integer("moduleID");
        table
          .foreign("moduleID")
          .references("mid")
          .inTable("PolytechnicModules")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table.primary(["skillID", "moduleID"]);
      });
    }
  })
  .then(() => {
    console.log("Table 'SkillModuleMap' created");
  })
  .catch((error) => {
    console.error(`There was an error creating table: ${error}`);
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("SkillUniversityModuleMap")
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable("SkillUniversityModuleMap", (table) => {
        table.integer("skillID");
        table

          .foreign("skillID")
          .references("sid")
          .inTable("Skills")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table.integer("moduleID");
        table
          .foreign("moduleID")
          .references("mid")
          .inTable("UniversityModules")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table.primary(["skillID", "moduleID"]);
      });
    }
  })
  .then(() => {
    console.log("Table 'SkillModuleMap' created");
  })
  .catch((error) => {
    console.error(`There was an error creating table: ${error}`);
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });
  

knex.schema
  .hasTable("Polytechnics")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("Polytechnics", (table) => {
          table.increments("pid").primary();
          table.string("polytechnic name");
        })
        .then(() => {
          console.log("Table 'Polytechnics' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("PolytechnicCourses")
  .then((exists) => {
    if (!exists) {
      // If no Course table exists
      // create new, with "cid","course code", "course name"
      // and use "cid" as a primary identification
      // and increment "cid" with every new record (course)
      return knex.schema
        .createTable("PolytechnicCourses", (table) => {
          table.increments("cid").primary();
          table.string("course code");
          table.string("course name");
          table.integer("polytechnic");
          table
            .foreign("polytechnic")
            .references("pid")
            .inTable("Polytechnics")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        })
        .then(() => {
          console.log("Table 'PolytechnicCourses' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("PolytechnicModules")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("PolytechnicModules", (table) => {
          table.increments("mid").primary();
          table.string("module code");
          table.string("module name");
        })
        .then(() => {
          console.log("Table 'PolytechnicModules' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("Universities")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("Universities", (table) => {
          table.increments("uid").primary();
          table.string("university name");
        })
        .then(() => {
          console.log("Table 'Universities' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("UniversityCourses")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("UniversityCourses", (table) => {
          table.increments("cid").primary();
          table.string("course code");
          table.string("course name");
          table.integer("university");
          table
            .foreign("university")
            .references("uid")
            .inTable("Universities")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        })
        .then(() => {
          console.log("Table 'UniversityCourses' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("UniversityModules")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("UniversityModules", (table) => {
          table.increments("mid").primary();
          table.string("module code");
          table.string("module name");
        })
        .then(() => {
          console.log("Table 'UniversityModules' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

knex.schema
  .hasTable("PolytechnicModuleCourseMap")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("PolytechnicModuleCourseMap", (table) => {
          table.integer("polytechnicModule");
          table
            .foreign("polytechnicModule")
            .references("mid")
            .inTable("PolytechnicModules")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
          table.integer("polytechnicCourse");
          table
            .foreign("polytechnicCourse")
            .references("cid")
            .inTable("PolytechnicCourses")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
          table.primary(["polytechnicModule", "polytechnicCourse"]);
        })
        .then(() => {
          console.log("Table 'PolytechnicModuleCourseMap' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });


knex.schema
  .hasTable("UniversityModuleCourseMap")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("UniversityModuleCourseMap", (table) => {
          table.integer("universityModule");
          table

            .foreign("universityModule")
            .references("mid")
            .inTable("UniversityModules")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
          table.integer("universityCourse");
          table

            .foreign("universityCourse")
            .references("cid")
            .inTable("UniversityCourses")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
          table.primary(["universityModule", "universityCourse"]);
        })
        .then(() => {
          console.log("Table 'UniversityModuleCourseMap' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });
  
// Just for debugging purposes:
// Log all data in "books" table
knex
  .select("*")
  .from("Users")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

knex
  .select("*")
  .from("Skills")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

knex
  .select("*")
  .from("SkillModuleMap")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

knex
  .select("*")
  .from("Polytechnics")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

knex
  .select("*")
  .from("PolytechnicCourses")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

knex
  .select("*")
  .from("PolytechnicModules")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

knex
  .select("*")
  .from("Universities")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

knex
  .select("*")
  .from("UniversityCourses")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

knex
  .select("*")
  .from("UniversityModules")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

// Export the database
module.exports = knex;
