CREATE TABLE `Manufacturers` (
    `Manufacturer_id` int(11) AUTO_INCREMENT,
    `Manufacturer_name` varchar(255) NOT NULL,
    `Manufacturer_phone` varchar(255) NOT NULL,
    `Manufacturer_zip` varchar(255) NOT NULL,
    `Manufacturer_discount` decimal (3, 2) NOT NULL,
    `Manufacturer_preferred` boolean DEFAULT 0 NOT NULL,
    PRIMARY KEY (`Manufacturer_id`),
    UNIQUE KEY (`Manufacturer_name`)
) ENGINE = InnoDB;

INSERT INTO `Manufacturers`
(`Manufacturer_name`, `Manufacturer_phone`, `Manufacturer_zip`, `Manufacturer_discount`)
VALUES
("Righto-Matic", "324-652-6548", 54125, 0.15),
("Lefto-Matic", "324-652-6548", 55555, 0.12),
("Upto-Matic", "324-652-6548", 12345, 0.1),
("Auto-Matic", "324-652-6548", 54321, 0),
("SENSO-MATIC", "324-652-6548", 54125, 1),
("DOOR-O-MATIC", "324-652-6548", 54125, .99);

UPDATE `Manufacturers`
SET `Manufacturer_preferred`=1
WHERE Manufacturer_id=5;

CREATE TABLE `Components` (
    `Component_id` int(11) AUTO_INCREMENT,
    `Component_partNumber` varchar(255) NOT NULL,
    `Component_type` varchar(255) NOT NULL,
    `Component_stock` int(11) NOT NULL DEFAULT 0,
    `Component_Manufacturer_id` int(11) NOT NULL,
    `Component_cost` decimal (9, 2) NOT NULL DEFAULT 0.00,
    `Component_leadTime` int(11) DEFAULT 1,
    PRIMARY KEY (`Component_id`),
    UNIQUE KEY (`Component_partNumber`, `Component_Manufacturer_id`),
    FOREIGN KEY (`Component_Manufacturer_id`) REFERENCES `Manufacturers` (`Manufacturer_id`)
) ENGINE = InnoDB;

INSERT INTO `Components`
(`Component_partNumber`, `Component_type`, `Component_stock`, `Component_Manufacturer_id`, `Component_cost`, `Component_leadTime`)
VALUES 
("CBL-546519684", "Cable", 31, 1, 2354.65, 3),
("DR-ASDF654", "DOOR", 123, 2, 32.24, 1),
("HNG-ASDF-ASDF", "HINGE", 1154, 3, 2.65, 1),
("RD-ASDFQ", "ROD", 365, 4, 23.65, 2),
("SNSR-000001100000011", "MOTION SENSOR", 19, 5, 333.65, 3),
("DR-ASDFASDF", "DOOR", 213, 6, 24.65, 2);

CREATE TABLE `Products` (
    `Product_id` int(11) AUTO_INCREMENT, 
    `Product_name` varchar(255) NOT NULL, 
    `Product_description` varchar(255), 
    `Product_cost` decimal (9,2) NOT NULL, 
    `Product_price` decimal (9, 2) NOT NULL,
    PRIMARY KEY (`Product_id`),
    UNIQUE KEY (`Product_name`) 
) ENGINE = InnoDB;

INSERT INTO `Products`
(`Product_name`, `Product_description`, `Product_cost`, `Product_price`)
VALUES
("Wizzy Dizzy", "Topsy turvey, just what you want in a vehicle", 3265.65, 7999.99),
("Topsy Turvey", "Wizzy Dizzy, just what you want in a vehicle", 5623.65, 9997.99),
("Rolls-Over-Royce", "NOT what you want in a vehicle", 100.01, 99.99),
("Totoya", "For legal reasons.", 2584.65, 4999.99),
("Fjord", "The not so origninal scandinavian beater truck.", 11, 20),
("Steel Cable Kite", "Mostly for experiments, not for kids.", 500.05, 1000.10);

CREATE TABLE `Customers` (
    `Customer_id` int(11) AUTO_INCREMENT,
    `Customer_name` varchar(255) NOT NULL, 
    `Customer_phone` varchar(255) NOT NULL, 
    `Customer_street` varchar(255) NOT NULL, 
    `Customer_city` varchar(255) NOT NULL,
    `Customer_zip` varchar(255) NOT NULL, 
    PRIMARY KEY (`Customer_id`),
    UNIQUE KEY (`Customer_name`)
 ) ENGINE = InnoDB;

INSERT INTO `Customers`
 (`Customer_name`, `Customer_phone`, `Customer_street`, `Customer_city`, `Customer_zip`) 
VALUES
('XYZ Engineering', '415-546-2222', '323 High Road', 'Santa Clara', 95054),
('Gogozoom', '484-898-6548', ' 5 Berkley St', 'Fort Washington', 19034),
('TuTechi', '856-398-6548', ' 361 Laurel Lane ', 'Yonkers', 10701),
('Downware', '745-898-6548', ' 9561 Albany Drive', 'Saint Joseph', 49085),
('Ron-Engineering', '809-898-6548', ' 7133 Grant ave', 'Forney', 75126),
('AEC', '510-898-6548', ' 5 Oakwood St', 'Oakland', 94577);

CREATE TABLE `Orders` (
    `Order_id` int(11) AUTO_INCREMENT,
    `Order_status` varchar(255) NOT NULL,
    `Order_dateCreated` date NOT NULL,
    `Order_dateFulfilled` date DEFAULT NULL,
    `Order_Customer_id` int(11),
    PRIMARY KEY (`Order_id`),
    FOREIGN KEY (`Order_Customer_id`) REFERENCES `Customers` (`Customer_id`)
) ENGINE = InnoDB;

INSERT INTO `Orders`
(`Order_status`, `Order_dateCreated`, `Order_Customer_id`)
VALUES
("Pending", '2018-05-01', 1),
("Shipped",' 2018-04-30', 2),
("Pending", '2018-04-01', 3),
("Fulfilled", '2018-03-10', 4),
("Shipped", '2018-03-11', 5),
("Fulfilled", '2010-05-01', 6);

CREATE TABLE `Components_Products`(
    `cid` int(11),
    `pid` int(11),
    `Component_quantity` int(11) NOT NULL DEFAULT 1,
    PRIMARY KEY (`cid`, `pid`),
    FOREIGN KEY (`cid`) REFERENCES `Components` (`Component_id`),
    FOREIGN KEY (`pid`) REFERENCES `Products` (`Product_id`)
) ENGINE = InnoDB;

INSERT INTO `Components_Products`
(`cid`, `pid`, `Component_quantity`)
VALUES
(1, 6, 10),
(4, 3, 130),
(5, 3, 120),
(3, 3, 110),
(3, 1, 13),
(3, 2, 31);

CREATE TABLE `Orders_Products` (
    `oid` int(11),
    `pid` int(11),
    `Product_quantity` int(11) NOT NULL DEFAULT 1,
    PRIMARY KEY (`oid`,`pid`),
    FOREIGN KEY (`oid`) REFERENCES `Orders` (`Order_id`),
    FOREIGN KEY (`pid`) REFERENCES `Products` (`Product_id`)
) ENGINE = InnoDB;

INSERT INTO `Orders_Products`
(`oid`, `pid`, `Product_quantity`)
 VALUES (1,2,1), (1,4,2),(2,3,3),(2,5,2),(3,3,3),(4,6,2),(4,5,1),(4,1,4);
