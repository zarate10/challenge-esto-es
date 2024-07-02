CREATE DATABASE IF NOT EXISTS backestoes;  

USE backestoes; 

CREATE TABLE IF NOT EXISTS user (
    firstname VARCHAR(32) NOT NULL, 
    lastname VARCHAR(32) NOT NULL, 
    email VARCHAR(120) NOT NULL UNIQUE, 
    CONSTRAINT pk_user PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS project (
    name VARCHAR(32) NOT NULL UNIQUE, 
    description VARCHAR(256) NOT NULL, 
    manager VARCHAR(120) NOT NULL, 
    status VARCHAR(20) NOT NULL,
    created_by VARCHAR(120) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_project PRIMARY KEY (name),
    CONSTRAINT chk_status CHECK (status IN ('Enabled', 'Work in Progress', 'Finished')),
    CONSTRAINT fk_project FOREIGN KEY (created_by) REFERENCES user(email) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_project (
    user VARCHAR(120) NOT NULL, 
    project VARCHAR(32) NOT NULL, 
    CONSTRAINT pk_user_project PRIMARY KEY (user, project), 
    CONSTRAINT fk_user FOREIGN KEY (user) REFERENCES user(email) ON DELETE CASCADE ON UPDATE CASCADE, 
    CONSTRAINT fk_userxproject_project FOREIGN KEY (project) REFERENCES project(name) ON DELETE CASCADE ON UPDATE CASCADE
); 

INSERT INTO user VALUES
('Sophia', 'Smith', 'sophiasmith261@gmail.com'),
('Alexander', 'Johnson', 'alexanderjohnson812@hotmail.com'),
('Olivia', 'Williams', 'oliviawilliams863@gmail.com'),
('William', 'Brown', 'williambrown876@example.com'),
('James', 'Jones', 'jamesjones574@yahoo.com'),
('Emily', 'Garcia', 'emilygarcia324@hotmail.com'),
('Emma', 'Miller', 'emmamiller755@gmail.com'),
('Lautaro', 'Davis', 'lautarodavis33@hotmail.com'),
('William', 'Smith', 'williamsmith922@example.com'),
('Sophia', 'Johnson', 'sophiajohnson501@hotmail.com'),
('Alexander', 'Williams', 'alexanderwilliams888@gmail.com'),
('Olivia', 'Brown', 'oliviabrown682@example.com'),
('William', 'Jones', 'williamjones133@yahoo.com'),
('James', 'Garcia', 'jamesgarcia777@gmail.com'),
('Emily', 'Miller', 'emilymiller19@yahoo.com'),
('Emma', 'Davis', 'emmadavis419@example.com'),
('Lautaro', 'Smith', 'lautarosmith629@gmail.com'),
('William', 'Johnson', 'williamjohnson973@hotmail.com'),
('Sophia', 'Williams', 'sophiawilliams460@gmail.com'),
('Alexander', 'Brown', 'alexanderbrown200@example.com'),
('Olivia', 'Jones', 'oliviajones155@yahoo.com'),
('William', 'Garcia', 'williamgarcia854@gmail.com'),
('James', 'Miller', 'jamesmiller839@hotmail.com'),
('Emily', 'Davis', 'emilydavis528@example.com'),
('Emma', 'Smith', 'emmasmith694@gmail.com'),
('Lautaro', 'Johnson', 'lautarojohnson775@hotmail.com'),
('William', 'Williams', 'williamwilliams222@gmail.com'),
('Sophia', 'Brown', 'sophiabrown743@example.com'),
('Alexander', 'Jones', 'alexanderjones381@yahoo.com'),
('Olivia', 'Garcia', 'oliviagarcia968@gmail.com'),
('William', 'Miller', 'williammiller636@hotmail.com'),
('James', 'Davis', 'jamesdavis213@example.com'),
('Emily', 'Smith', 'emilysmith897@gmail.com'),
('Emma', 'Johnson', 'emmajohnson457@hotmail.com'),
('Lautaro', 'Williams', 'lautarowilliams559@gmail.com'),
('William', 'Brown', 'williambrown615@example.com'),
('Sophia', 'Jones', 'sophiajones832@yahoo.com'),
('Alexander', 'Garcia', 'alexandergarcia745@gmail.com'),
('Olivia', 'Miller', 'oliviamiller457@hotmail.com'),
('William', 'Davis', 'williamdavis287@example.com'),
('James', 'Smith', 'jamessmith546@gmail.com'),
('Emily', 'Johnson', 'emilyjohnson118@hotmail.com'),
('Emma', 'Brown', 'emmabrown911@example.com'),
('Lautaro', 'Jones', 'lautarojones379@yahoo.com'),
('William', 'Garcia', 'williamgarcia169@gmail.com'),
('Sophia', 'Miller', 'sophiamiller524@hotmail.com'),
('Alexander', 'Davis', 'alexanderdavis446@example.com');

INSERT INTO project (name, description, manager, status, created_by)
VALUES
    ('Project 1', 'Description of Project 1', 'sophiasmith261@gmail.com', 'Enabled', 'alexanderjohnson812@hotmail.com'),
    ('Project 2', 'Description of Project 2', 'oliviawilliams863@gmail.com', 'Enabled', 'williambrown876@example.com'),
    ('Project 3', 'Description of Project 3', 'jamesjones574@yahoo.com', 'Enabled', 'emilygarcia324@hotmail.com'),
    ('Project 4', 'Description of Project 4', 'emmamiller755@gmail.com', 'Enabled', 'lautarodavis33@hotmail.com'),
    ('Project 5', 'Description of Project 5', 'williamsmith922@example.com', 'Enabled', 'sophiajohnson501@hotmail.com'),
    ('Project 6', 'Description of Project 6', 'alexanderwilliams888@gmail.com', 'Enabled', 'oliviabrown682@example.com'),
    ('Project 7', 'Description of Project 7', 'williamjones133@yahoo.com', 'Enabled', 'jamesgarcia777@gmail.com'),
    ('Project 8', 'Description of Project 8', 'emilymiller19@yahoo.com', 'Enabled', 'emmadavis419@example.com'),
    ('Project 9', 'Description of Project 9', 'lautarosmith629@gmail.com', 'Enabled', 'williamjohnson973@hotmail.com'),
    ('Project 10', 'Description of Project 10', 'sophiawilliams460@gmail.com', 'Enabled', 'alexanderbrown200@example.com'),
    ('Project 11', 'Description of Project 11', 'oliviajones155@yahoo.com', 'Enabled', 'williamgarcia854@gmail.com'),
    ('Project 12', 'Description of Project 12', 'jamesmiller839@hotmail.com', 'Enabled', 'emilydavis528@example.com'),
    ('Project 13', 'Description of Project 13', 'emmasmith694@gmail.com', 'Enabled', 'lautarojohnson775@hotmail.com'),
    ('Project 14', 'Description of Project 14', 'williamwilliams222@gmail.com', 'Enabled', 'sophiabrown743@example.com'),
    ('Project 15', 'Description of Project 15', 'alexanderjones381@yahoo.com', 'Enabled', 'alexandergarcia745@gmail.com'),
    ('Project 16', 'Description of Project 16', 'oliviagarcia968@gmail.com', 'Enabled', 'oliviamiller457@hotmail.com'),
    ('Project 17', 'Description of Project 17', 'williammiller636@hotmail.com', 'Enabled', 'williamdavis287@example.com'),
    ('Project 18', 'Description of Project 18', 'jamessmith546@gmail.com', 'Enabled', 'emilysmith897@gmail.com'),
    ('Project 19', 'Description of Project 19', 'emilyjohnson118@hotmail.com', 'Enabled', 'emmabrown911@example.com'),
    ('Project 20', 'Description of Project 20', 'emmajohnson457@hotmail.com', 'Enabled', 'lautarojones379@yahoo.com'),
    ('Project 21', 'Description of Project 21', 'lautarowilliams559@gmail.com', 'Enabled', 'williambrown615@example.com'),
    ('Project 22', 'Description of Project 22', 'sophiajones832@yahoo.com', 'Enabled', 'sophiamiller524@hotmail.com'),
    ('Project 23', 'Description of Project 23', 'alexanderdavis446@example.com', 'Enabled', 'williamgarcia169@gmail.com');