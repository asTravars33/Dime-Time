DROP PROCEDURE IF EXISTS updateUserEarn;

DELIMITER $$

CREATE PROCEDURE updateUserEarn (IN user_email VARCHAR(100), IN cur_balance INT, IN new_earnings TEXT)
BEGIN

DECLARE prev_earnings TEXT;
SELECT earnings INTO prev_earnings FROM users WHERE email = user_email;

INSERT INTO debug (msg) VALUE ("Hi I got ehre");
INSERT INTO debug (msg) VALUE (new_earnings);
INSERT INTO debug (msg) VALUE (CONCAT(new_earnings, prev_earnings));
INSERT INTO debug (msg) VALUE (user_email);

UPDATE users SET earnings = CONCAT(new_earnings, prev_earnings) WHERE email = user_email;
UPDATE users SET dollars = cur_balance WHERE email = user_email;

END $$

DELIMITER ;

DROP PROCEDURE IF EXISTS updateUserSpend;

DELIMITER $$

CREATE PROCEDURE updateUserSpend (IN user_email VARCHAR(100), IN cur_balance INT, IN new_spendings TEXT)
BEGIN

DECLARE prev_spendings TEXT;
SELECT spendings INTO prev_spendings FROM users WHERE email = user_email;

UPDATE users SET spendings = CONCAT(new_spendings, prev_spendings) WHERE email = user_email;
UPDATE users SET dollars = cur_balance WHERE email = user_email;

END $$

DELIMITER ;