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
VALUES ('ben','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Ben', 'ben.z@test.none', '0123456789', 34, 'Rotterdam', 'Erewhon'),
       ('ellen','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Ellen', 'ellen@test.none', '0123456789', 32, 'Flatland', 'Pineapple Street'),
       ('bob','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Bob', 'bob@test.none', '0123456789', 37, 'Den Haag', 'Grote Markt'),
       ('test_admin','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Test', 'test.admin@test.none', '0123456789', 99, 'Rotterdam', 'Erewhon'),
       ('test_user','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Test', 'test.user@test.none', '0123456789', 99, 'Rotterdam', 'Erewhon'),
       ('test_none','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Test', 'test.none@test.none', '0123456789', 99, 'Rotterdam', 'Erewhon');

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