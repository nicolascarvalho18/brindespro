create table if not exists portfolio_projects(
  id bigserial primary key,
  name varchar(160) not null,
  segment varchar(60) not null,
  category varchar(80) not null,
  description varchar(1000) not null,
  quantity integer not null,
  lead_time varchar(120) not null,
  finish_type varchar(100) not null,
  image_url varchar(500) not null,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);
create index if not exists idx_portfolio_projects_segment on portfolio_projects(segment);
create table if not exists portfolio_testimonials(
  id bigserial primary key,
  project_id bigint references portfolio_projects(id) on delete set null,
  person_name varchar(120) not null,
  role varchar(120) not null,
  company varchar(120) not null,
  segment varchar(60) not null,
  message varchar(600) not null,
  active boolean not null default true
);
