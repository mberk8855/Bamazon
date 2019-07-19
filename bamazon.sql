DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT (10) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)

VALUES 
("Furbie", "Toys", 100, 3),
("Kombucha", "Food", 3.99, 10),
("Pizza Peel", "Home Goods", 49.99, 10),
("Pokemon Cards","Toys",19.99, 10),
("Dracula","Books", 24.99, 9),
("Dark Chocolate bar", "Food", 1.99, 119),
("Pizza Dough", "Food", 6.99,90),
("Baking Steel","Home Goods",59.99, 15), 
("Alien","Area 51", 90000, 1), 
("Truffle Cheese", "Food",9.99,8)


