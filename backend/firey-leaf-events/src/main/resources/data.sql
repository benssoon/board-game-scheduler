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

INSERT INTO users (username, password, name, email_address, telephone_number, age, area, address)
VALUES ('ben','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Ben', 'ben.z@test.none', '0123456789', 34, 'Rotterdam', 'Wijmerts'),
       ('ellen','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Ellen', 'ellen.z@test.none', '0123456789', 32, 'Takoma Park', 'Willow'),
       ('bob','$2a$12$5CZNfchW.KoDGIf0/8SMpeHfRU.Qlki28RUCYddJhWqzBJ7mLCcIe', 'Bob', 'bob@test.none', '0123456789', 37, 'Den Haag', 'Grote Markt');

INSERT INTO roles (username, role)
VALUES ('ben', 'ROLE_ADMIN'),
       ('ellen', 'ROLE_USER'),
       ('ben', 'ROLE_USER'),
       ('bob', 'ROLE_USER');

INSERT INTO events (name,
                    definitive_time,
                    is_full,
                    is_host_playing,
                    location,
                    game_id,
                    host_username)
VALUES ('Game night',
        TIMESTAMP '2025-10-31 23:11:11',
        FALSE,
        TRUE,
        'Ben''s house',
        1,
        'ben');

INSERT INTO player_events (event_id, username)
VALUES (1, 'ben'),
       (1, 'ellen'),
       (1, 'bob')