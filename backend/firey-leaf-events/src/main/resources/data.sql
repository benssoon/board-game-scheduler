INSERT INTO events (title,
                    is_full,
                    definitive_time,
                    location)
VALUES ('Game night',
        TRUE,
        TIMESTAMP '2025-10-31 23:11:11',
        'Ben''s house');

INSERT INTO users (username,
                   name,
                   email_address,
                   telephone_number,
                   user_type)
VALUES ('ben',
        'Ben',
        'ben.z@test.none',
        '0123456789',
        'User'); /*This can't be Participant yet because the Participant entity isn't fully set up yet.*/

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