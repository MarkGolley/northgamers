\c nc_games_test

SELECT owner, title, review_id, category, review_img_url, created_at, votes, 
(SELECT COUNT(*) FROM comments WHERE comments.review_id=reviews.review_id) AS comment_count,
(SELECT COUNT(*) FROM reviews) -(10) AS total_count
FROM reviews
ORDER BY title ASC
LIMIT 10 OFFSET 10;