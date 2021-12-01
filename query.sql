\c nc_games


SELECT owner, title, review_id, category, review_img_url, created_at, votes, 
      (SELECT COUNT(*) FROM comments WHERE comments.review_id=reviews.review_id) AS comment_count 
      FROM reviews
    WHERE category = 'strategy'
    ORDER BY title ASC;