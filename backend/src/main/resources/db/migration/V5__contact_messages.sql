create table contact_messages(
  id uuid primary key,
  name varchar(200) not null,
  email varchar(254) not null,
  phone varchar(20) not null,
  company varchar(200),
  subject varchar(100) not null,
  message varchar(2000) not null,
  status varchar(30) not null,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);
create index contact_messages_status_created_idx on contact_messages(status, created_at desc);
