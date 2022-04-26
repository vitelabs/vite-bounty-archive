create table users (
    id serial primary key,
    email text unique,
    password text,
    token text unique,
    address text unique
);

create type saved_address_types as enum ('token', 'contact');

create table saved_addresses (
    id serial primary key,
    user_id int references users(id) not null,
    address text not null,
    type saved_address_types not null,
    unique (user_id, address, type)
);
