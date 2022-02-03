DROP TABLE IF EXISTS `posts`;
CREATE TABLE posts(
`id` INT NOT NULL AUTO_INCREMENT,
`subject` VARCHAR(127) NOT NULL,
`body` VARCHAR(511),
`author` VARCHAR(127) NOT NULL,
`date` DATETIME DEFAULT NOW() NOT NULL,
PRIMARY KEY (`id`));

INSERT INTO posts(subject, body, author, date)
VALUES
('Hello Paradox', "Don't be afraid to share what on your mind", 'paradox', '2016-01-01 00:00:00'),
('Hello Paradox', "We don't know if it is right", 'paradox', '2016-01-01 00:01:00'),
('Hello Paradox', "But we know it is a right", 'paradox', '2016-01-01 00:02:30'),
('Make America Great Again', "China is preparing to invade the WORLD!!!", 'Trump', '2019-03-09 14:07:43'),
('Make America Great Again', "Tramp iz rayt", 'Putin', '2019-03-11 03:32:02'),
('Hallo!!!', "Shaking My Head!", 'Merkel', '2019-03-11 03:33:00');

DROP TABLE IF EXISTS `users`;
CREATE TABLE users(
`id` INT NOT NULL AUTO_INCREMENT,
`user` VARCHAR(127) UNIQUE NOT NULL,
`password` VARCHAR(255) NOT NULL,
`date` DATETIME DEFAULT NOW() NOT NULL,
PRIMARY KEY (`id`));

INSERT INTO users(user, password, date)
VALUES
('paradox', 'paradox', '2016-01-01 00:00:00'),
('trump', 'trump', '2019-03-09 14:07:09'),
('putin', 'putin', '2019-03-11 03:30:59'),
('merkel', 'merkel', '2019-03-11 03:32:03');
