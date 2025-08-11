DROP TABLE IF EXISTS hasBadges;
DROP TABLE IF EXISTS badges;
DROP TABLE IF EXISTS user;

CREATE TABLE user{
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status TINYINT NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY(id),
    CONSTRAINT unq_user_username UNIQUE (adresse_mail),
    CONSTRAINT unq_user_email UNIQUE (email)
};

CREATE TABLE badge{
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    picture VARCHAR(255) NOT NULL,
    CONSTRAINT pk_badge PRIMARY KEY(id),
    CONSTRAINT unq_badge_name UNIQUE(name),
    CONSTRAINT unq_badge_picture UNIQUE(picture)
};

CREATE TABLE hasBadges{
    id_user INT UNSIGNED NOT NULL,
    id_badge INT UNSIGNED NOT NULL,
    CONSTRAINT pk_hasBadges PRIMARY KEY(id_user),
    CONSTRAINT fk_hasBadges_id_user FOREIGN KEY id_user REFERENCES user(id),
    CONSTRAINT fk_hasBadges_id_badge FOREIGN KEY id_badge REFERENCES badge(id)
};