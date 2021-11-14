DROP TABLE IF EXISTS duties;

CREATE TABLE duties (name TEXT, description TEXT, gain INT);

INSERT INTO duties (name, description, gain) VALUE ("Chores", "Complete a chore in your house to earn $5", 5);
INSERT INTO duties (name, description, gain) VALUE ("Education", "Watch a video in the learning section to earn $1", 1);
