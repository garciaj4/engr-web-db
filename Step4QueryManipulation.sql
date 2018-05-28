--Entity 1:Components
--___________________________________________________________________________
-- get all Components info  for the components page
SELECT * FROM Components;

-- edit Components info for the components page
UPDATE Components
SET
Component_Manufacturer_id = [newManufacturer_id || oldManufacturer_id],
Component_partNumber = [newPartNumber || oldPartNumber],
Component_type = [newType || oldType},
Component_stock = [newStock || oldStock],
Component_cost = [newCost || oldCost],
Component_leadTime = [newLeadTime || LeadTime]
WHERE Component_id = [selectedComponent_id];

-- delete Components from the components page
//We are not allowing delete of components as their participation is required in other entities.
DELETE FROM Components WHERE id = [id of row selected];

-- search Components by part number on the components page 
SELECT * FROM Component 
WHERE Component_partnumber= [partNumber_searchBox];

-- search Components by manufacturer on the components page 
SELECT * FROM Components
WHERE Component_Manufactuer_id IN
	(SELECT Manufacturer_id FROM Manufacturers m 
	WHERE m.Manufacturer_name = [manName_searchBox]);

-- Add Components on the components page 
INSERT INTO Component
(`Component_Manufacturer_id`,
`Component_partNumber`,
`Component_type`
`Component_stock`
`Component_cost`
`Component_leadTime`)
VALUES
([newComponent_Manufacturer_id],
[newComponent_partNumber],
[newComponent_type],
[newComponent_stock],
[newComponent_cost],
newComponent_leadTime]);		

--Entity 2:Manufacturers
--___________________________________________________________________________
--get all Manufacturer info for the page
	SELECT * FROM Manufacturers;

-- edit Manufacturers info for the Manufacturers page
UPDATE Components
SET
Manufacturer_name = [newName || oldName],
Manufacturer_discount = [newDiscount || oldDiscount},
Manufacturer_phone = [newPhone || oldPhone],
Manufacturer_zip = [newZip || oldZip],
Manufactuer_preferred = [newPreferred || oldPreferred]
WHERE Manufacturer_id = [selectedManufacturer_id];

-- delete Manufacturers from the Manufacturers  page
//We are not allowing delete of Manufacturers  as their participation is required in other entities.
DELETE FROM Manufacturers WHERE id = [id of row selected];

-- search Manufacturer by name on the Manufacturer page 
SELECT * from Manufacturer 
WHERE Manufacturer_name= [name_searchBox];

-- Add Manufacturer on the Manufacturers page 
INSERT INTO Manufacturer
(`Manufacturer_name`,
`Manufacturer_discount`,
`Manufacturer_prefered`
`Manufacturer_phone`
`Manufacturer_zip`)
VALUES
([newManufacturer_name],
[newManufacturer_discount],
[newManufacturer_prefered],
[newManufacturer_phone],
[newManufacturer_zip]);
	
--Entity 3:Products
--___________________________________________________________________________
--get all Product info for the page
	SELECT * FROM Products;

-- edit Product info for the Products page
UPDATE Product
SET
Product_name = [newName || oldName],
Product_description = [newDescription || oldDescription},
Product_cost = [newCost || oldCost],
Product_price = [newPrice || oldPrice]
WHERE Product_id = [selectedProduct_id];

-- delete Products from the Product  page
//We are not allowing delete of Products  as their participation is required in other entities.
DELETE FROM Products WHERE id = [id of row selected];

-- search Manufacturer by name on the Manufacturer page 
SELECT * from Product 
WHERE Product_name= [name_searchBox];

-- Add Product on the Products page 
INSERT INTO Product
(`Product_name`,
`Product_description`,
`Product_cost`
`Product_price`)
VALUES
([newProduct_name],
[newProduct_description],
[newProduct_cost],
[newProduct_price]);

--Entity 4:Orders
--___________________________________________________________________________
--get all Order info for the Order page
	SELECT * FROM Orders;

-- edit Order info for the Orders page
UPDATE Order
SET
Order_dateCreated = [newCreateDate || oldCreateDate]
Order_dateFulfilled = [newFulfillDate || oldFulfillDate],
Order_status = [newStatus || oldStatus]
WHERE Order_id = [selectedOrder_id];

-- delete Orders from the Order  page
DELETE FROM Orders WHERE Order_id = [id of row selected];

-- search Order by id on the Order page 
SELECT * from Order 
WHERE Order_id= [id_searchBox];

-- Add Order on the Orders page 
INSERT INTO Order
(`Order_Customer_id`,
`Order_dateCreated`,
`Order_dateFulfilled`
`Order_status`)
VALUES
([newOrder_Customer_id],
[newOrder_dateCreated],
[newOrder_dateFulfilled],okay
[newOrder_status]);

--Many-to-Many 1:Orders_Products(List)
--___________________________________________________________________________
	--Select relevant order data for viewing
		SELECT
			Order_id,
Customer_name,
Order_dateCreated,
Order_dateFulfilled,
Order_status,
Product_name,
Product_quantity
FROM Orders_Products op
INNER JOIN Orders o ON op.oid = o.Order_id
INNER JOIN Customers c ON o.Order_Customer_id = c.Customer_id INNER JOIN Products p ON op.pid = p.Product_id;

	--add a product to an order from the order page
		INSERT INTO Orders_Products (`oid`, `pid`, `Product_quantity`)
		VALUES ([selectedOrder_id], [selectedProduct_id], [qty]);

--delete products from orders from the Order page
		DELETE FROM Orders_Products
		WHERE Orders_Products.oid = [selectedOrder_id]
AND Orders_Products.pid = [selectedProduct_id];

	--modify qty of product on order
UPDATE Orders_Products op
SET op.Product_qty = [newQty];		

	--delete orders from the order page
		DELETE FROM Orders
		WHERE Order_id = [selectedOrder_id];

--Many-to-Many 2:Products_Components(Make Up)
--___________________________________________________________________________
--Select product component associations for viewing.
SELECT * FROM Products p INNER JOIN
Components_Products cp ON p.Product_id = cp.pid INNER JOIN
Components c on cp.cid = c.Component_id
WHERE p.Product_id = [selectedProduct_id];

-- Associate a product with components
INSERT INTO Components_Products (`pid`, `cid`)
VALUES ([selectedProduct_id],[selectedComponent_id]);

-- Dissociate a component from a product
DELETE FROM Components_Products 
WHERE Components_Products_cid = [selectedComponen_id]
AND Components_Products_pid = [selectedProduct_id] ;

--Change association 
UPDATE Products_Components pc
SET pc.cid = [newComponent_id]
WHERE pc.pid = [selectedProduct_id] AND pc.cid = [selectedComponent_id];