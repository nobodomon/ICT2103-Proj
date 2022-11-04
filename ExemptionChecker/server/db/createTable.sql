BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Users" (
	"uid"	integer,
	"username"	text UNIQUE,
	"password"	text,
	"role"	text,
	"polytechnicCourse"	integer,
	FOREIGN KEY("polytechnicCourse") REFERENCES "PolytechnicCourses"("cid"),
	PRIMARY KEY("uid" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Polytechnics" (
	"pid"	integer NOT NULL,
	"polytechnicName"	varchar(255),
	PRIMARY KEY("pid" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "PolytechnicCourses" (
	"cid"	integer NOT NULL,
	"courseCode"	varchar(255),
	"courseName"	varchar(255),
	"polytechnic"	integer,
	FOREIGN KEY("polytechnic") REFERENCES "Polytechnics"("pid"),
	PRIMARY KEY("cid" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "PolytechnicModules" (
	"mid"	integer NOT NULL,
	"moduleCode"	varchar(255),
	"moduleName"	varchar(255),
	"polytechnicCourse"	integer,
	FOREIGN KEY("polytechnicCourse") REFERENCES "PolytechnicCourses"("cid"),
	PRIMARY KEY("mid" AUTOINCREMENT)
);
COMMIT;
