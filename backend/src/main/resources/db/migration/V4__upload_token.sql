alter table quote_files add column upload_token varchar(36);
create unique index idx_quote_files_upload_token on quote_files(upload_token);
