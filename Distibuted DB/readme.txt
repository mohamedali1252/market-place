we must kill all the processes of mongod before we execute our files 
taskkill /IM "mongod.exe" /F             OR             we can end task from the task manager
then we must remove the config files of the C:/data/config


chmod u+x create_replicatset1.sh create_replicatset2.sh create_replicatset3.sh step2.sh
now we can execute this files like that: 
create_replicatset1.sh
same for the other files
mongo --port 27017
then put the config variable on it then:
rs.initiate(config);
we wait untill the current convert to primary then we can write 
rs.status();
to see who is the primary nodes and who is the secnodary
then we exit:
exit

same for the other files:
create_replicatset2.sh
mongo --port 37017
put the config var.
rs.initiate(config);
rs.status();
exit

create_replicatset3.sh
mongo --port 47017
put the config var.
rs.initiate(config);
rs.status();
exit


we can see the processes of mongod in the task manager or we can type:
tasklist

run the step2.sh like that:
step2.sh

then we write:
mongo --port 57040
we take the config const from the step2.js and paste in the mongo
rs.initiate(config);






then run the command:
mongos --configdb conf/localhost:57040,localhost:57041,localhost:57042 --logpath "mongos-1.log" --port 21010
mongo --port 21010

db.adminCommand({addshard:"shard1/" + "localhost:27017"}); //this is the primary nodes not the replicas
db.adminCommand({addshard:"shard2/" + "localhost:37017"});
db.adminCommand({addshard:"shard3/" + "localhost:47017"});
db.adminCommand({enableSharding:"shop"}); // sh.enableSharding("shop")
use shop
db.adminCommand({shardCollection:"shop.users", key:{_id:1}}); // sh.shardCollection("shop.users",{"username":"hashed"})


new:

db.users.getShardDistribution() to show the distribution of the data //in mongos

mongo mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=shard1
mongo mongodb://localhost:37017,localhost:37018,localhost:37019/?replicaSet=shard2
mongo mongodb://localhost:47017,localhost:47018,localhost:47019/?replicaSet=shard3
db.getReplicationInfo()
rs.conf()

mongo mongodb://localhost:27018
mongo mongodb://localhost:27019


mongo mongodb://localhost:37018
mongo mongodb://localhost:37019

mongo mongodb://localhost:47018
rs.secondaryOk()
now we can see the data using:
show dbs
use shop
show collections
db.users.find().pretty()


mongo mongodb://localhost:47019
rs.secondaryOk()
now we can see the data using:
show dbs
use shop
show collections
db.users.find().pretty()













