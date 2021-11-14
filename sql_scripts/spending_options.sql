DROP TABLE IF EXISTS spending_options;

CREATE TABLE spending_options (name TEXT, description TEXT, cost INT);

INSERT INTO spending_options(name, description, cost) VALUE ("Groceries", "Buy grociers for $20.", 20);
INSERT INTO spending_options(name, description, cost) VALUE ("Movies", "Go to the moves for $10.", 10);
INSERT INTO spending_options(name, description, cost) VALUE ("Utilities", "Pay for utilties for $40.", 40);
