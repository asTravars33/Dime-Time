DROP TABLE IF EXISTS users;

CREATE TABLE users (email VARCHAR(100), password VARCHAR(100), first_name VARCHAR(100), last_name VARCHAR(100), spendings TEXT, earnings TEXT, dollars INT, PRIMARY KEY(email));

DROP PROCEDURE IF EXISTS addUser;

DELIMITER $$

CREATE PROCEDURE addUser(IN c_email VARCHAR(100), IN c_password VARCHAR(100), IN c_fname VARCHAR(100), IN c_lname VARCHAR(100))
BEGIN

DECLARE cnt INT;
DECLARE targetpass VARCHAR(100);

INSERT INTO debug(msg) VALUE ("Beginning process.");

SELECT COUNT(1) INTO cnt FROM users WHERE email = c_email;

IF cnt = 1 THEN
	INSERT INTO debug(msg) VALUE ("The user is registered.");
	SELECT password INTO targetpass FROM users WHERE email = c_email;
	IF c_password = targetpass THEN
		SELECT * FROM users WHERE email = c_email;
	END IF;
ELSE
	INSERT INTO debug(msg) VALUE ("The user is being registered.");
	INSERT INTO users(email, password, first_name, last_name, spendings, earnings, dollars) VALUE (c_email, c_password, c_fname, c_lname, " "," ", 0);
	SELECT * FROM users WHERE email = c_email;
END IF;

END $$

DELIMITER ;