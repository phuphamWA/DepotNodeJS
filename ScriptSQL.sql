Create Database products;
use products;
select * from offerings;
select * from products;
select * from  suppliers;
drop table least_retail;
Create Table productName as select offerings.product_key,product_name,long_description,Unit_cost,Unit_retail, offerings.supplier_key from offerings,products where products.Id=offerings.product_key ;
Create Table vendors as select Unit_cost,Unit_retail,Supplier_name,offerings.supplier_key,offerings.product_key from offerings,suppliers where suppliers.Id=offerings.supplier_key ;
Create Table least_retail as select products.id,product_name,long_description,Unit_retail from offerings,products where products.Id=offerings.product_key ;
drop table productName;
select* from least_retail; 
Create table  least as select * from least_retail where (id,Unit_retail) in (select id,min(unit_retail) from least_retail group by id);
select * from least;
select *from vendors;
select *from productName;
Create table vendor_product as select productName.product_key,productName.product_name,vendors.supplier_key,vendors.Supplier_name, vendors.Unit_cost,vendors.Unit_retail from vendors, productName where vendors.supplier_key = productName.supplier_key;
select * from vendor_product