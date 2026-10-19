alter table quotes add column if not exists expected_delivery_date date;
alter table quotes add column if not exists tracking_code varchar(180);
alter table quotes add column if not exists order_status varchar(40) not null default 'RECEBIDO';
update quotes set order_status = case status
  when 'Aprovado' then 'APROVADO'
  when 'Cancelado' then 'CANCELADO'
  when 'Em análise' then 'EM_ANALISE'
  else 'RECEBIDO'
end where order_status = 'RECEBIDO';
create index if not exists idx_quotes_order_status_created on quotes(order_status, created_at);
create table if not exists order_status_history(
  id bigserial primary key,
  quote_id bigint not null references quotes(id) on delete cascade,
  status varchar(40) not null,
  note varchar(1000),
  visible_to_customer boolean not null default true,
  changed_by varchar(250),
  created_at timestamp with time zone not null default now()
);
create index if not exists idx_order_history_quote_created on order_status_history(quote_id, created_at);
