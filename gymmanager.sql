SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET default_tablespace = '';
SET default_table_access_method = heap;


CREATE TABLE public.instructors (
    id SERIAL PRIMARY KEY NOT NULL,
    name text,
    avatar_url text,
    gender text,
    services text,
    birth timestamp without time zone,
    created_at timestamp without time zone
);

CREATE TABLE public.members (
    id SERIAL PRIMARY KEY NOT NULL,
    name text,
    avatar_url text,
    email text,
    gender text,
    birth timestamp without time zone,
    blood text,
    weight integer,
    height integer,
    instructor_id integer
);

CREATE TABLE public.plan (
    id SERIAL PRIMARY KEY NOT NULL,
    name text,
    duration int,
    details text,
    price bigint
);

CREATE TABLE public.schedule (
    id SERIAL PRIMARY KEY NOT NULL,
    name text,
    schedulepic_url text,
    class_datetime timestamp without time zone,
    instructor_id integer
);

INSERT INTO public.instructors (id, name, avatar_url, gender, services, birth, created_at) VALUES (5, 'Julia Consectetur ', 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'F', 'jiu jitsu, judo', '1992-01-01 00:00:00', '2020-07-01 00:00:00');
INSERT INTO public.instructors (id, name, avatar_url, gender, services, birth, created_at) VALUES (7, 'Estephani Null', 'https://images.unsplash.com/photo-1471277876629-37eaac632a24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80', 'F', 'boxe, judo', '1990-01-01 00:00:00', '2020-07-08 00:00:00');
INSERT INTO public.instructors (id, name, avatar_url, gender, services, birth, created_at) VALUES (8, 'Etan Park', 'https://images.unsplash.com/photo-1520920200465-946379ad1349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=353&q=80', 'M', 'calistenia, parkour', '1988-01-01 00:00:00', '2020-07-08 00:00:00');

INSERT INTO public.members (id, name, avatar_url, email, gender, birth, blood, weight, height, instructor_id) VALUES (9, 'Anna Ane', 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'anna@email.com', 'F', '1998-02-05 00:00:00', 'O1', 50, 155, 9);
INSERT INTO public.members (id, name, avatar_url, email, gender, birth, blood, weight, height, instructor_id) VALUES (1, 'Daniel', 'https://images.unsplash.com/photo-1549361426-ee116328745c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80', 'dani@email.com', 'M', '1980-01-01 00:00:00', 'AB1', 85, 180, 5);
INSERT INTO public.members (id, name, avatar_url, email, gender, birth, blood, weight, height, instructor_id) VALUES (4, 'Leon K', 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80', 'leonk@email.com', 'M', '1988-02-05 00:00:00', 'O1', 70, 178, 1);

INSERT INTO public.schedule (name,schedulepic_url, class_datetime,instructor_id) values ('yoga morning', 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80', '2022-12-02 00:00:00', 7);
INSERT INTO public.schedule (name,schedulepic_url, class_datetime,instructor_id) values ('yoga evening', 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80', '2022-12-05 00:00:00', 7);
INSERT INTO public.schedule (name,schedulepic_url, class_datetime,instructor_id) values ('yoga night', 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80', '2022-12-15 00:00:00', 7);
INSERT INTO public.schedule (name,schedulepic_url, class_datetime,instructor_id) values ('yoga night', 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80', '2022-12-15', 7);

insert into public.plan (name, duration, details, price) values ('silver', 4, 'haha brr', 100000);
insert into public.plan (name, duration, details, price) values ('bronze', 4, 'i wanna commit', 50000);
insert into public.plan (name, duration, details, price) values ('iron', 4, 'y e s', 20000);