INSERT INTO games (title,
                   description,
                   min_players,
                   max_players,
                   complexity,
                   min_age,
                   max_age)
VALUES ('Root',
        'A game of woodland might and right',
        2,
        4,
        'very high',
        10,
        99);

INSERT INTO games (title,
                   min_players,
                   max_players,
                   complexity,
                   min_age,
                   max_age)
VALUES ('Arcs',
        2,
        4,
        'very high',
        10,
        99);

INSERT INTO users (username, password, name, email_address, telephone_number, age, area, address)
VALUES ('ben','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Ben', 'ben@test.none', '0123456789', 34, 'Rotterdam', 'Erewhon'),
       ('ellen','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Ellen', 'ellen@test.none', '9876543210', 32, 'Flatland', 'Pineapple Street'),
       ('bob','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Bob', 'bob@test.none', '0246802468', 37, 'Den Haag', 'Grote Markt'),
       ('test_admin','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Leia', 'test.admin@test.none', '0135791357', 99, 'Alderaan', 'Aldera'),
       ('test_user','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Luke', 'test.user@test.none', '0123571113', 99, 'Tatooine', 'Mos Eisley'),
       ('test_none','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Anakin', 'test.none@test.none', '1123581321', 99, 'Tatooine', 'Mos Espa');

INSERT INTO roles (username, role)
VALUES ('ben', 'ROLE_ADMIN'),
       ('ellen', 'ROLE_USER'),
       ('ben', 'ROLE_USER'),
       ('bob', 'ROLE_USER'),
       ('test_admin', 'ROLE_ADMIN'),
       ('test_user', 'ROLE_USER');

INSERT INTO events (name,
                    description,
                    definitive_time,
                    is_full,
                    is_ready_to_start,
                    is_host_playing,
                    location,
                    game_id,
                    host_username)
VALUES ('Game night',
        'ROOT! ROOT! ROOT! ROOT!',
        TIMESTAMP '2025-10-31 23:11:11',
        FALSE,
        TRUE,
        TRUE,
        'Ben''s house',
        1,
        'ben');

INSERT INTO player_events (event_id, username)
VALUES (1, 'ben'),
       (1, 'ellen'),
       (1, 'bob');
