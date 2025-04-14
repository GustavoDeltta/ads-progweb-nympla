create extension if not exists "uuid-ossp"

create table subscriptions (
	id uuid primary key default uuid_generate_v4(),
	user_id int not null,
	event_id int not null,
	check_in varchar default 'pending',
	foreign key (user_id) references users(id) on delete cascade,
	foreign key (event_id) references events(id) on delete cascade,
	unique(user_id, event_id)
)