DROP TABLE IF EXISTS books_authors;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;

CREATE TABLE authors (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	name VARCHAR,
  	dob DATE,
  	pob VARCHAR
 );
 
 CREATE TABLE books (
   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   title VARCHAR,
   released SMALLINT
 );
 
 CREATE TABLE books_authors (
   id BIGINT GENERATED ALWAYS AS IDENTITY,
   book_id BIGINT,
   author_id BIGINT,
   FOREIGN KEY (book_id) REFERENCES books(id),
   FOREIGN KEY (author_id) REFERENCES authors(id)
 );
   
 INSERT INTO authors (
   name,
   dob,
   pob
 )
 VALUES
 	('Jerry Seinfeld', '1954-04-29', 'Brooklyn, NY, USA'),
    ('Arthur C. Clarke', '1917-12-16', 'Minehead, UK'),
    ('Meriwether Lewis', '1774-08-18', 'Locust Hill Plantation, VA, USA'),
    ('William Clark', '1770-08-01', 'Ladysmith, VA, USA')
 ;

INSERT INTO books (
  title,
  released
)
VALUES
	('SeinLanguage', 1993),
    ('2001: A Space Odyssey', 1968),
    ('The Sentinel', 1951),
    ('The Journals of Lewis and Clark', 1814)
;

INSERT INTO books_authors (
  book_id,
  author_id
)
VALUES
	(1, 1),
    (2, 2),
    (3, 2),
    (4, 3),
    (4, 4)
;