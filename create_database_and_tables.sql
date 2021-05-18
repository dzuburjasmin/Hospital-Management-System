create database if not exists HMS;

create table if not exists doctors(
	id int primary key auto_increment,
    username varchar(30) not null unique,
    email varchar(30) unique not null,
    hashed_password varchar(30) not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    city varchar(30) not null,
    phone_number varchar(30) not null unique,
    signature varchar(30) not null unique
);

create table if not exists patients(
	id int primary key auto_increment,
    username varchar(30) not null unique,
    email varchar(30) unique not null,
    hashed_password varchar(30) not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    city varchar(30) not null,
    phone_number varchar(30) not null unique
);

create table if not exists perscriptions(
	id int primary key auto_increment,
    created datetime not null,
    expires datetime not null,
    description varchar(50) not null,
    institution varchar(30) not null,
    patient_id int not null,
    doctor_id int not null,
    foreign key (doctor_id)
		references doctors(id)
		on delete cascade,
    foreign key (patient_id)
		references patients(id)
		on delete no action
);

create table if not exists doctors_and_patients(
	id int primary key auto_increment,
	doctor_id int not null,
    patient_id int not null,
    foreign key(doctor_id)
		references doctors(id)
        on delete cascade,
	foreign key(patient_id)
		references patients(id)
        on delete cascade
);


select * from doctors_and_patients;
select * from doctors where jmbg is not null;

update doctors set jmbg ="226883123"  where id =5;
alter table doctors modify column hashed_password text not null;

drop table doctors_and_patients;
insert into patients(
username,email ,hashed_password,first_name,last_name,city,phone_number)
values(
    'asaf','asaf@patient.ba','asaf','Asaf','Kurbegovic','Gornji Vakuf - Uskoplje','123456789'
    );

insert into doctors_and_patients(doctor_id, patient_id) values(1,1);

select p.username, d.username from doctors_and_patients dp inner join doctors d on dp.doctor_id = d.id 
 inner join patients p on dp.doctor_id = p.id;
 
select * from doctors;
select * from patients;
select * from prescriptions;
alter table prescriptions add column status int not null;
delete from prescriptions where id in (2);
insert into prescriptions(created,expires,description,institution,patient_id,doctor_id,status)
values(curdate(),curdate(),'new Patient','UKCS',4,20,0);
select pr.*,d.first_name as doc,d.last_name,p.first_name as pat,p.last_name from prescriptions pr inner join doctors d on pr.doctor_id = d.id
inner join patients p on pr.patient_id = p.id;  

create table if not exists appointments(
	id int primary key auto_increment,
    created datetime not null,
    expires datetime not null,
    description varchar(50) not null,
    patient_id int not null,
    doctor_id int not null,
    foreign key (doctor_id)
		references doctors(id)
		on delete cascade,
    foreign key (patient_id)
		references patients(id)
		on delete no action
);
select * from doctors;
select * from patients;
select * from appointments;
drop table appointment;

insert into prescriptions(created, expires, description,institution, doctor_id, patient_id,status) values 
(curdate(), curdate(), 'description',null, 16,6,1);

alter table appointments add column status int not null;
alter table prescriptions modify institution varchar(30);
select * from prescriptions;
select * from doctors

