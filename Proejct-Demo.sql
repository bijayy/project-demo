-- Create table student
create table student(
	id int primary key IDENTITY(1,1) ,
	name varchar(50),
	email varchar(250)
)

-- Insert Record to Student table
insert into student(name, email) values ('Bijay Kumar Yadav', 'bijayy33@outlook.com')
insert into student(name, email) values ('Ajay Kumar Yadav', 'ajayy33@outlook.com')

-- View all the records in student table
select * from student

--Creating stored procedures
--
--Insert Student Records in Student Table
create procedure InsertStudent
	@name varchar(50),
	@email varchar(250)
As
	insert into student(name, email) values (@name, @email)
Go

--Select All Student Records from Student Table
create procedure SelectStudents
As
	select * from student
Go

--Select a Student Records from Student Table by Student Id
create procedure SelectStudentById
	@id int
As
	select * from student where id = @id
Go

--Insert Student Records in Student Table
create procedure DeleteStudentById
	@id int
As
	delete from student where id = @id
Go

--UdpateStudentByID
create procedure UpdateStudentById
	@id int,
	@name varchar(50),
	@email varchar(250)
As
	update student set name = @name, email = @email where id = @id
Go

-- Executing the sp
exec SelectStudents
exec SelectStudentById 1