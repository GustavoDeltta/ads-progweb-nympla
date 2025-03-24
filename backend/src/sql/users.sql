create table users(
	id serial primary key,
	name varchar,
	email varchar unique,
	password varchar,
	dob date, 
	role varchar
)