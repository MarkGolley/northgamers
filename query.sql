\c nc_games_test

SELECT *
FROM reviews
WHERE category='children''s games'
;

INSERT INTO reviews (owner, title, review_body, designer, category)
VALUES ('bainesface', 'I loved this game', 'OMG what a game', 'Mr Game Game', 'dexterity')
RETURNING *
;
