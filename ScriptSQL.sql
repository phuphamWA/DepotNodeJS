Create Database products;
use products;
select * from offerings;
select * from products;
select * from  suppliers;
select id,product_key from offerings;
Create Table idProductKey as select id,product_key from offerings;
Create Table productName as select offerings.product_key,product_name,long_description,Unit_cost,Unit_retail, offerings.supplier_key from offerings,products where products.Id=offerings.product_key ;
Create Table vendors as select offerings.supplier_key,offerings.product_key,Supplier_name,Unit_cost,Unit_retail from offerings,suppliers where suppliers.Id=offerings.supplier_key ;
Create Table least_retail as select products.id,product_name,long_description,Unit_retail from offerings,products where products.Id=offerings.product_key ;
drop table productName;
select* from least_retail; 
Create table  least as select * from least_retail where (id,Unit_retail) in (select id,min(unit_retail) from least_retail group by id);
select * from least;
select *from vendors;
select *from productName;
Create table vendor_product as select productName.product_key,productName.product_name,vendors.supplier_key,vendors.Supplier_name, vendors.Unit_cost,vendors.Unit_retail from vendors, productName where vendors.supplier_key = productName.supplier_key;
select * from vendor_product;
Create table midware as select supplier_key,least.id,least.product_name,least.long_description,least.unit_retail from offerings inner join least on offerings.product_key = least.id and offerings.unit_retail = least.unit_retail;
ALTER TABLE midware RENAME COLUMN `productId` TO `productkey` ;

select * from midware;

Create Table Complete_Least as select midware.id, midware.product_name, midware.long_description,midware.unit_retail,midware.supplier_key,Supplier_name from midware, suppliers where suppliers.id = midware.supplier_key;
select * from Complete_Least;
drop table mid2;
Create Table mid2 as select id, product_key, supplier_key from offerings;
ALTER TABLE mid2 RENAME COLUMN `id` TO `offeringID` ;
ALTER TABLE mid2 RENAME COLUMN `supplier_key` TO `SupplierKey` ;
select * from mid2;
Create Table OfferOne select * from mid2  join Complete_Least on Complete_Least.id = mid2.product_key and Complete_Least.supplier_key = mid2.SupplierKey;  

select * from OfferOne;
ALTER TABLE OfferOne Drop Column id; 