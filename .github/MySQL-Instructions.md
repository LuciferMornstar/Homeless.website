What are SQL commands?
SQL commands instruct database management systems (DBMS) to perform certain actions. These include defining tables and their structure, entering, modifying, and deleting data, and executing queries.

The scope of SQL commands is defined in various ISO or ANSI standards. There are also many implementation-specific dialects. This means that the implementations of major providers like PostgreSQL, MySQL, Oracle DBMS, and Microsoft SQL Server each have own language variants. Some of them have their own commands, though most differ at least in terms of how they process strings and other data.

SQL includes several sub-languages, each of which covers different areas and contains its own commands. Let’s look at the main types of SQL commands.

What kinds of SQL commands are there?
The most important SQL commands can be roughly divided into five sub-languages. And each sub-language is responsible for different commands:

SQL sub-language	Command	Example
Data Definition Language (DDL)	Database schema definition commands: create, modify, and delete database tables; define primary keys, foreign keys, and constraints.	CREATE TABLE, DROP TABLE
Data Manipulation Language (DML)	Commands to manipulate data: edit, enter, and delete data sets.	INSERT, UPDATE
Data Query Language (DQL)	Commands to query and prepare data.	SELECT
Data Control Language (DCL)	Commands for rights management.	GRANT, REVOKE
Transaction Control Language (TCL)	Commands for transaction control.	COMMIT, ROLLBACK
What’s the underlying syntax of SQL commands?
Unlike other common programming languages, SQL is a declarative language. It describes the result to be achieved without specifying which steps are necessary to achieve it. This characteristic is reflected in its typically longer commands. In turn, fewer lines of code are often required than with conventional imperative languages.

A good example is the SQL command DROP TABLE IF EXISTS. That’s right, this is a single command that’s used to delete a table if it already exists:

DROP TABLE IF EXISTS SomeTable;
A Python example code with similar functionality includes several function calls and a branch that spans two lines:

if db.has_table(some_table):
    db.drop_table(some_table)
As shown, a single SQL command can consist of several keywords. This leads to visual similarity between the commands. Here’s an example: The two SQL commands CREATE TABLE and CREATE OR REPLACE VIEW at first glance look to be manifestations of the CREATE command. But despite the similarity, they’re independent commands.

As known from other languages, some SQL commands accept parameters. These are often the names of databases, tables, or columns. For example, we use the columns ‘Name’ and ‘Age’ from the ‘People’ table:

SELECT Name, Age FROM People;
Note
SQL commands such as SELECT and CREATE TABLE are usually completely capitalised even though SQL doesn’t distinguish between upper and lower case. It’s merely a widely used convention.

Strictly speaking, SQL commands are statements. But there are also other syntax constructs that act like commands. Here’s an overview of the most important SQL syntax elements:

Term	Description	Example
Statement	Instructs the DBMS to perform an action; ends with a semicolon.	CREATE TABLE People;
Clause	Modifies an instruction; can only occur within instructions.	WHERE, HAVING
Expression	Returns a value when evaluating.	6 * 7
Identifier	Name of a database object, variable, or procedure; can be qualified or unqualified.	dbname.tablename / tablename
Predicate	Expression that evaluates TRUE, FALSE, or UNKNOWN.	Age < 42
Query	Special statement; returns found set of records.	SELECT Name FROM People WHERE Age < 42;
Function	Processes one or more values; usually creates a new value.	UPPER('text') -- Returns 'TEXT'
Comment	Used to comment on SQL code; ignored by the RDBMS.	-- Comment up to the end of the line / /* If necessary, multiline comment */
Your overview of the most important SQL commands
Databases structure data in a hierarchy of storage layers, from the database server down to the value stored in a field. Since all aspects of a relational database management system (RDBMS) can be controlled by SQL, SQL commands exist for each of the layers. Here’s an overview of the hierarchy of RDBMS objects:

RDBMS object	Includes
Server	Databases
Database	Tables
Table	Data sets
Data set	Fields
Field	Typed value
In addition to the primary RDBMS objects shown, other objects such as views and stored procedures are used. These also have their own SQL commands. Next, we’ll take a closer look at the commands of the five main SQL sub-languages:

Data Definition Language (DDL)
Data Manipulation Language (DML)
Data Query Language (DQL)
Data Control Language (DCL)
Transaction Control Language (TCL)
SQL commands for data definition
These SQL commands are used to define data structures. These operate on aggregate objects like databases, tables and indexes. An aggregate object is used to store multiple records; a record contains multiple fields, with each field associated with a column. The column defines the data type of the field, e.g., number, string, Boolean, etc. Constraints like ‘must be unique’, ‘must not be null’ etc. can also be defined for a column.

SQL commands to define databases
At the highest level of a relational database management system (RDBMS) are databases. These can be created and deleted via SQL command:

SQL command	Description	Example
CREATE DATABASE	Create new database.	CREATE DATABASE Store;
DROP DATABASE	Delete a database.	DROP DATABASE Store;
USE	Select database for the following commands.	USE Store;
SQL commands to define tables
The construction of a database begins with the definition of the database schema. The schema is the basis for efficiency and requires a careful design that maps the individual tables and their relationships to one another. Usually, the database schema is based on entity relation (ER) diagrams or special UML diagrams.

If the database schema is available as an abstract description, the database structure is built using suitable SQL commands. Tables with columns and their types are defined and any links between tables are implemented using ‘foreign keys’. The structure can be modified afterwards by executing further SQL commands. Here’s an overview of the most important commands:

SQL command	Description	Example
CREATE TABLE	Create new table in database; besides the name of the table, the names of columns with their types are defined.	CREATE TABLE Customers ( CustomerID INT UNSIGNED NOT NULL AUTO_INCREMENT, CustomerName VARCHAR(255) NOT NULL, Country VARCHAR(60) NOT NULL, PRIMARY KEY (CustomerID) );
ALTER TABLE	Modify existing table: add/remove columns; change type or name of a column.	ALTER TABLE Customers ADD Email VARCHAR(50);
TRUNCATE TABLE	Delete all entries in a table; retain table structure in the process.	TRUNCATE TABLE Customers;
DROP TABLE	Delete table completely; triggers an error during execution if the table doesn’t exist.	DROP TABLE Customers;
DROP TABLE IF EXISTS	Delete the table if it exists.	DROP TABLE IF EXISTS Customers;
ALTER COLUMN	Change data type of an existing column.	ALTER TABLE Customers ALTER COLUMN Email VARCHAR(255);
DROP COLUMN	Delete column of a table completely.	ALTER TABLE customers DROP COLUMN Email;
CREATE INDEX	Create named index for column(s) in existing table.	CREATE INDEX IdxEmail ON Customers (Email);
DROP INDEX	Remove existing index.	ALTER TABLE Customers DROP INDEX IdxEmail;
An important part of a database management system (DBMS) is to ensure the consistency of the data. For example, it’s possible to specify that the fields of individual columns mustn’t be empty or that the values they contain must be within permitted limits. These are known as constraints. Foreign keys can also be used to ensure that links between tables are created correctly.

To set constraints for individual columns, several clauses within data definition statements are used. Here are a couple without examples:

SQL command	Description
NOT NULL	Define that the value of the field must not be NULL.
UNIQUE	Define that the value of the field may not occur twice within the column.
DEFAULT	Set a default for the field; if no value is specified for the field when creating the record, the default will be used.
CHECK	Set a condition that the value of the field must meet.
PRIMARY KEY	Specify that the field contains the primary key; implies UNIQUE and NOT NULL.
FOREIGN KEY	Specify that the value of the field must be a primary key of another table.
SQL commands for data manipulation
If the tables of a database are already defined, then it’s time for operations on individual data records. Using the right SQL commands, data sets can be newly inserted, changed and deleted. This is also referred to as the CRUD operation (Create, Read, Update, Delete) which can also be found in NoSQL databases.

SQL command	Description	Example
INSERT INTO	Enter data sets into a table.	INSERT INTO Customers (CustomerName) VALUES('Tester');
UPDATE	Update fields in one or more data sets.	UPDATE Customers SET Email = 'test@example.com' WHERE CustomerName = 'Tester';
DELETE FROM	Delete data sets from a table.	DELETE FROM Customers WHERE CustomerName = 'Tester';
Keep in mind that the clauses or functions ‘WHERE’, ‘SET’, and ‘VALUES’ in the examples can also be found in other contexts. But despite the same name, slightly different rules may apply. Be careful when using the SQL commands UPDATE and DELETE FROM without a WHERE clause. All data records contained in the table will be changed or deleted.

SQL commands to query data
The SQL command SELECT is probably the language’s best-known command. It’s used to query data from the database. Normally, the data set isn’t changed in the process. That’s why the SELECT command is often accessible to analysts. Let’s look at the basic components of the SQL SELECT command:

SQL command	Description	Example
SELECT	Query data in a database.	SELECT CustomerName FROM Customers;
WHERE	Restrict query to records that match a given predicate.	SELECT Email FROM Customers WHERE CustomerName = 'Tester';
AS	Define alias for table or row within a query.	SELECT CustomerID AS ID, CustomerName AS Customer FROM Customers;
HAVING	Limit query with aggregate function to applicable records.	SELECT COUNT(CustomerID), Country FROM Customers HAVING COUNT(CustomerID) >= 1;
Even though SELECT provides only one SQL command for querying data, it offers a wide range of possible applications. For example, there are a number of clauses that are used to filter, sort, and summarise data. Let’s take a look at them.

SQL commands to refine queries
The SELECT SQL command returns a so-called result set. Conceptually, a result set can be thought of as a table with columns and values. In practice, it’s often necessary to filter or sort the results or to limit the number of records returned. For all these use cases there are corresponding clauses that can be used within a SELECT SQL command:

SQL command	Description	Example
DISTINCT	Remove duplicates from results.	SELECT DISTINCT Country FROM Customers;
LIMIT	Restrict the result set to the top results.	SELECT * FROM Customers LIMIT 5;
GROUP BY	Group result set according to a common characteristic.	SELECT CustomerName, Country FROM Customers GROUP BY Country;
ORDER BY	Sort result set according to a characteristic.	SELECT CustomerName, Email FROM Customers SORT BY CustomerName;
ASC	Sort in ascending order.	SELECT DISTINCT Country FROM Customers SORT BY Country ASC;
DESC	Sort in descending order.	SELECT DISTINCT Country FROM Customers SORT BY Country DESC;
SQL commands for linking queries
In addition to refining the result set, it’s possible to link queries across multiple tables. Remember that a SELECT SQL command returns a result set. That’s why SQL contains commands that let you merge two result sets according to the rules of relational set theory.

To explain the SQL commands for joining queries in detail, more complex examples with several defined tables are necessary. That’s why we’ve omitted the example code here. Let’s look at the most important set operations:

SQL command	Description
UNION	Merge two result sets; the result sets must have columns of the same type in the same order. Their rows are merged.
INNER JOIN	Filter two result sets according to a common criterion.
LEFT JOIN	Match the result set of the left query with matching results of the right query; unmatched fields are set to NULL.
RIGHT JOIN	Match the result set of the right query with matching results of the left query; unmatched fields are set to NULL.
FULL OUTER JOIN	Combination of a LEFT JOIN and RIGHT JOIN.
SQL commands to save and recreate queries
As we’ve seen, SQL queries can be quite complex. In practice, it’s useful to execute queries repeatedly. For example, you can save the SQL commands as code and import them as needed. But this isn’t very efficient. Instead, there are special SQL commands that can be used to store complex queries as a unit directly in the database management system (DBMS).

Let’s first look at views. A database view is roughly equivalent to a stored query. Note that a query returns a tabular result set as a result. Instead of discarding it, we store it as a view, which is also called a ‘virtual table’. As a rule, a view can only be read. There are a handful of SQL commands for working with views:

SQL command	Description	Example
CREATE VIEW	Create a new view.	CREATE VIEW BritishCustomers AS SELECT CustomerName, Email FROM Customers WHERE Country = "UK";
ALTER VIEW	Edit an existing view.	ALTER VIEW BritishCustomers AS SELECT * FROM Customers WHERE Country = "UK";
CREATE OR REPLACE VIEW	Create or replace an existing view.	CREATE OR REPLACE VIEW BritishCustomers AS SELECT * FROM Customers WHERE Country = "UK";
SHOW CREATE VIEW	Show the SQL command used to create a view.	SHOW CREATE VIEW BritishCustomers;
DROP VIEW	Delete an existing view.	DROP VIEW BritishCustomers;
In addition to database views, there are stored procedures. Stored procedures are used to repeatedly execute queries and are more complex than views. They can take parameters and use them to assemble queries dynamically. It’s also possible to use a stored procedure for write access to the underlying data. Here’s an overview of the relevant SQL commands, omitting examples for reasons of space:

SQL command	Description
CREATE PROCEDURE	Create a new procedure.
ALTER PROCEDURE	Edit an existing procedure.
CREATE OR REPLACE PROCEDURE	Create or replace an existing procedure.
DROP PROCEDURE	Delete an existing procedure.
CALL	Execute a stored procedure.
The use of stored procedures moves code from the client to the server. The separation of concerns leads to better security and performance. A possible disadvantage is that the ‘business logic’ contained within a stored procedure is outside the version control system. Since stored procedures are heavily dependent on the surrounding DBMS, at worst, a change of vendor will result in loss of functionality.

Note
Don’t confuse stored procedures with the well-known prepared statements. Both improve security, but prepared statements are defined on the client application side.

SQL commands for access control
A single database server can contain multiple databases. To manage them independently, access control mechanisms are used. For example, you can define the rights of individual users to access databases and the tables they contain. You can also define user groups and assign users to them. Two main SQL commands come into play:

SQL command	Description	Example
GRANT	Rights granted	GRANT ALL ON SomeDB.* TO 'john'@'localhost';
REVOKE	Rights revoked	REVOKE INSERT ON *.* FROM 'john'@'localhost';
SQL commands for transaction control
One of the advantages of using relational database management systems (RDBMS) is the guarantee of ‘ACID’ properties which ensures that the data is always in a tidy state. Technically, so-called transactions are used, which are indivisible as ‘atomic operations’. A transaction is either completed in full and without errors, or an error has occurred. Then the individual steps are undone. Let’s look at the SQL commands for transaction control:

SQL command	Description	Example
START TRANSACTION	Mark the beginning of a transaction.	START TRANSACTION;
COMMIT	Complete a transaction that’s already been started.	START TRANSACTION; TRUNCATE TABLE Customers; COMMIT;
ROLLBACK	Cancel a started transaction and return the dataset to the initial state.	START TRANSACTION; TRUNCATE TABLE Customers; ROLLBACK;
SAVEPOINT	Create a named save point within a transaction.	START TRANSACTION; SAVEPOINT BeforeAddData;
ROLLBACK TO	Jump back to a named save point.	ROLLBACK TO BeforeAddData;
An overview of the aforementioned ACID properties:

ACID property	Description
Atomicity	Transactions are `indivisible´. They are either executed completely or not at all. If an atomic transaction is aborted, the system is in the state before the transaction started.
Consistency	After a transaction has been executed, the data set is again consistent.
Isolation	Transactions executed at the same time must not affect each other.
Durability	The effects of a transaction must remain permanently in the data set. And they must not be lost if, for example, the RDBMS crashes.