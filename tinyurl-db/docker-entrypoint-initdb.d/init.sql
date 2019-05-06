CREATE SCHEMA url_system;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE url_system.url_hash (
  id uuid DEFAULT uuid_generate_v4 (),
  long_url VARCHAR NOT NULL,
  hashkey VARCHAR NOT NULL,
  short_url VARCHAR NOT NULL,
  PRIMARY KEY (id)
);