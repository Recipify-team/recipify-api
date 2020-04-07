create table recipe (
	id bigint auto_increment primary key,
	title varchar(300) not null,
	image varchar(300) not null,
	link varchar(300) not null,
	total_time int not null,
	instructions mediumtext not null,
	ingredients mediumtext not null,
	quantity int not null
) charset = utf8;

create fulltext index ingredients on recipe (ingredients);