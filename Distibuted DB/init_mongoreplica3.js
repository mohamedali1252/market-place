config = { _id:"shard3",members:[
    {_id: 0 ,host:"localhost:47017"},
    {_id: 1 ,host:"localhost:47018"},
    {_id: 2 ,host:"localhost:47019"}, ]
};
rs.initiate(config);
rs.status();

//pointing to the replicaset3

/*
we must kill all the processes of mongod before we execute our files 
taskkill /IM "mongos.exe" /F
then we must remove the config files of the C:/data/db


chmod u+x create_replicaset1.sh create_replicaset2.sh create_replicaset3.sh
now we can execute this files like that: 
create_replicaset1.sh 
same for the other files
mongo --port 27017
then put the config variable on it then:
rs.initiate(config);
we wait untill the current convert to primary then we can write 
rs.status();
to see who is the primary nodes and who is the secnodary

same for the other files:
create_replicaset2.sh 
mongo --port 37017
put the config var.
rs.initiate(config);
rs.status();

create_replicaset3.sh 
mongo --port 47017
put the config var.
rs.initiate(config);
rs.status();



we can see the processes of mongod in the task manager or we can type:
tasklist



mkdir -p /data/config/conig-a /data/config/conig-b /data/config/conig-c


*/



//mongod --logpath "cfg-a.log" --dbpath C:\data\db\config-a --replSet conf --port 57040 --configsvr
//mongod --logpath "cfg-b.log" --dbpath C:\data\db\config-b --replSet conf --port 57041 --configsvr
//mongod --logpath "cfg-c.log" --dbpath C:\data\db\config-c --replSet conf --port 57042 --configsvr

//mongo --port 57040
/*
config = {_id: "conf",members:[
    {_id:0,host:"localhost:57040"},
    {_id:1,host:"localhost:57041"},
    {_id:2,host:"localhost:57042"} ]
};
rs.initiate(config);

then run the command:
mongos --configdb conf/localhost:57040,localhost:57041,localhost:57042 --logpath "mongos-1.log" --port 21010
mongo --port 21010

db.adminCommand({addshard:"shard1/" + "localhost:27017"}); //this is the primary nodes not the replicas
db.adminCommand({addshard:"shard2/" + "localhost:37017"});
db.adminCommand({addshard:"shard3/" + "localhost:47017"});
db.adminCommand({enableSharding:"school"});
use school

db.adminCommand({shardCollection:"school.students", key:{student_id:1}});
show collections
use students

db.students.insert({id:12,name:"mohamed",class:"12",subject:"math"});
db.students.insert({id:13,name:"ahmed",class:"13",subject:"science"});
db.students.insert({id:14,name:"mahmoud",class:"12",subject:"biology"});
db.students.insert({id:15,name:"mostafa",class:"13",subject:"chemistry"});
db.students.insert({id:16,name:"samir",class:"12",subject:"physics"});
db.students.insert({id:17,name:"yossef",class:"12",subject:"arabic"});
db.students.insert({id:18,name:"tarek",class:"13",subject:"english"});
db.students.insert({id:19,name:"khaled",class:"13",subject:"history"});
db.students.insert({id:20,name:"malik",class:"12",subject:"programming"});

db.students.find().pretty()


*/

