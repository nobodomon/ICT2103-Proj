
CREATE TABLE "PolytechnicCourses" (
	"cid"	integer NOT NULL,
	"course code"	varchar(255),
	"course name"	varchar(255),
	PRIMARY KEY("cid" AUTOINCREMENT)
);
CREATE TABLE "Users" (
	"uid"	integer,
	"username"	text UNIQUE,
	"password"	text,
	"role"	text,
	"polytechnicCourse"	integer,
	PRIMARY KEY("uid" AUTOINCREMENT),
	FOREIGN KEY("polytechnicCourse") REFERENCES "PolytechnicCourses"("cid")
);