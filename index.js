const mysql = require('mysql');
const express = require('express');
var app= express();
const cors = require('cors'); 
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({
    encoded:true
}));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'northwind',
//   typeCast: function (field, next) {
//     // handle only BIT(1)
//     if (field.type == "BIT" && field.length == 1) {
//         var bit = field.string();

//         return (bit === null) ? null : bit.charCodeAt(0);
//     }

//     // handle everything else as default
//     return next();
// }
});
 
connection.connect((err)=>{
    if(!err)
    console.log("db connection succeded");
    else
    console.log("DB connection failed \n Error : "+ JSON.stringify(err,undefined,2));
});

// #customer table
//retrieve all customers
app.get('/customers',(req, res)=>{

    let sql='SELECT * FROM customers';
    
    connection.query(sql,(error, result, field)=>{
        if(error)
        throw error;
        return res.send({error: false, data: result, message:'all customers Infomation'});
    });                          
});

//retrive customers with id
app.get('/customers/:CustomerID',(req, res)=>{
    let id=req.params.CustomerID;
    if(!id){
        return res.status(400).send({error:true, message: 'please provide id'});
    }

    let sql='SELECT * FROM customers where CustomerID = ?';

    connection.query(sql,id,(error, result, field)=>{
        if(error)
        throw error;
        return res.send({error: false, data: result, message:'Customers Information using CustomerID'});
    });                          
});

//Insert in the customer tale
app.post('/customers',(req,res)=>{
    let CustomerID=req.body.CustomerID;
    let CompanyName= req.body.CompanyName;
    let ContactName= req.body.ContactName;
    let ContactTitle= req.body.ContactTitle;
    let Address= req.body.Address;
    let City= req.body.City;
    let Region= req.body.Region;
    let PostalCode= req.body.PostalCode;
    let Country= req.body.Country;
    let Phone= req.body.Phone;
    let Fax=req.body.Fax;

    if(!CustomerID || !CompanyName)
    return res.status(404).send({error: true, message: 'CustomerID and CompanyName cant be NULL'});

    let sql="INSERT INTO customers(CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax) value(?,?,?,?,?,?,?,?,?,?,?) ";
    let val=[CustomerID,CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax];

    connection.query( sql,val,(error, result, field)=>{
        if(error)
        throw error;
        console.log("Row Inserted in Customers Table");
        return res.send({error: false, data: result, message:'Successfully Inserted into Customers Table'});
        
    });

});
 
//Updating customer table
app.put('/customers',(req,res)=>{
    let CustomerID=req.body.CustomerID;
    let CompanyName= req.body.CompanyName;
    let ContactName= req.body.ContactName;
    let ContactTitle= req.body.ContactTitle;
    let Address= req.body.Address;
    let City= req.body.City;
    let Region= req.body.Region;
    let PostalCode= req.body.PostalCode;
    let Country= req.body.Country;
    let Phone= req.body.Phone;
    let Fax=req.body.Fax;

    if(!CustomerID || !CompanyName)
    return res.status(404).send({error: true, message: 'CustomerID and CompanyName cant be NULL'});

    let query='Update customers SET CompanyName=?, ContactName=?, ContactTitle=?, Address=?, City=? ,Region=? ,PostalCode=? ,Country=? ,Phone=? \
    ,Fax=? where CustomerID=?';
    let val=[CompanyName,ContactName,ContactTitle,Address,City,Region,PostalCode,Country,Phone,Fax,CustomerID];

    connection.query(query,val,(error, result, field)=>{
        if(error)
        throw error;
        console.log("Row Updated");
        return res.send({error: false, data: result, message:'Data Updated Successfully'});
    });

});

// #Product table
//retrieve all Products data
app.get('/products',(req, res)=>{
    connection.query('SELECT * FROM products',(error, result, field)=>{
        if(error)
        throw error;
        return res.send({error: false, data: result, message:'all Products Infomation'});
    });                          
});

//retrive products with id
app.get('/products/:ProductID',(req, res)=>{
    let id=req.params.ProductID;
    if(!id){
        return res.status(400).send({error:true, message: 'please provide id'});
    }

    let query='SELECT * FROM products where ProductID = ?';

    connection.query(query,id,(error, result, field)=>{
        if(error)
        throw error;
        return res.send({error: false, data: result, message:'Information by ID'});
    });                          
});

//Insert in the products tale
app.post('/products',(req,res)=>{
    let ProductID=req.body.ProductID;
    let ProductName= req.body.ProductName;
    let SupplierID= req.body.SupplierID;
    let CategoryID= req.body.CategoryID;
    let QuantityPerUnit= req.body.QuantityPerUnit;
    let UnitPrice= req.body.UnitPrice;
    let UnitsINStock= req.body.UnitsINStock;
    let UnitsOnOrder= req.body.UnitsOnOrder;
    let ReorderLevel= req.body.ReorderLevel;
    let Discontinued= req.body.Discontinued;

    if(!ProductID || !ProductName || !Discontinued)
        return res.status(404).send({error: true, message: "ProductID , ProductName and Discontinued can't be NULL"});
    
    let query="INSERT INTO products(ProductID,ProductName,SupplierID,CategoryID,QuantityPerUnit,UnitPrice,UnitsINStock,UnitsOnOrder,ReorderLevel,Discontinued) \
    value(?,?,?,?,?,?,?,?,?,?) " ;
    let val=[ProductID,ProductName,SupplierID,CategoryID,QuantityPerUnit,UnitPrice,UnitsINStock,UnitsOnOrder,ReorderLevel,Discontinued];
   
    connection.query(query,val,(error, result, field)=>{
        if(error)
        throw error;
        console.log("Row Inserted in Products Table")
        return res.send({error: false, data: result, message:'Successfully inserted into product table'});
    });

});
 
//Updating product table
app.put('/products',(req,res)=>{
    let ProductID=req.body.ProductID;
    let ProductName= req.body.ProductName;
    let SupplierID= req.body.SupplierID;
    let CategoryID= req.body.CategoryID;
    let QuantityPerUnit= req.body.QuantityPerUnit;
    let UnitPrice= req.body.UnitPrice;
    let UnitsINStock= req.body.UnitsINStock;
    let UnitsOnOrder= req.body.UnitsOnOrder;
    let ReorderLevel= req.body.ReorderLevel;
    let Discontinued= req.body.Discontinued;

    if(!ProductID || !ProductName)
    return res.status(404).send({error: true, message: 'ProductID and ProductName cant be NULL'});

    let query='Update products SET ProductName=?, SupplierID=?, CategoryID=?, QuantityPerUnit=?, UnitPrice=? ,UnitsINStock=? ,UnitsOnOrder=? ,ReorderLevel=?, Discontinued=? \
    where ProductID=?';
    let val=[ProductName,SupplierID,CategoryID,QuantityPerUnit,UnitPrice,UnitsINStock,UnitsOnOrder,ReorderLevel,Discontinued,ProductID];

    connection.query(query,val,(error, result, field)=>{
        if(error)
        throw error;
        console.log("Row Updated");
        return res.send({error: false, data: result, message:'Data Updated Successfully in Product table'});
    });

});

//order history of given customer

//order history by given id
app.get('/orderhistory/:CustomerID',(req, res)=>{
    let id=req.params.CustomerID;
    if(!id){
        return res.status(400).send({error:true, message: 'please provide CustomerID'});
    }

    let query='SELECT * FROM orders where CustomerID = ?';

    connection.query(query,id,(error, result, field)=>{
        if(error)
        throw error;
        return res.send({error: false, data: result, message:'Order Histry of given CustomerID'});
    });                          
});


app.listen(3000,()=>console.log("Express server is running at port no : 3000"));
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });