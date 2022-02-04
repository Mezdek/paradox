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
('paradox', '$argon2id$v=19$m=65536,t=5,p=1$GKv0Vf25XsM7O6oE/SAjNw$HBP0LdDKi7xqN+b2I7iX2l0pYszwRBEQAe04873gqxg', '2016-01-01 00:00:00'),
('trump', '$argon2id$v=19$m=65536,t=5,p=1$zcCUjeRv9qxTPZEWBLj2Tw$i51UYqO4fZehme+qKwK8ABxYeJwrlmyoVtJSIdF8990', '2019-03-09 14:07:09'),
('putin', '$argon2id$v=19$m=65536,t=5,p=1$R8CHKUywGyQp5UGUKuMq9Q$prFMFWwrATldY1smadN3sxzDfy0rU+ocZ2Sr4ijhYsE', '2019-03-11 03:30:59'),
('merkel', '$argon2id$v=19$m=65536,t=5,p=1$ilFVFwMRWhtY1CUK1omzUA$6MaSABElDAkQE6FsThKFrp/fTs+6qD4IfDNQoWkDKxg', '2019-03-11 03:32:03');
