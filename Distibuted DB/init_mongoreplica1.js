config = { _id:"shard1",members:[
    {_id: 0 ,host:"localhost:27017"},
    {_id: 1 ,host:"localhost:27018"},
    {_id: 2 ,host:"localhost:27019"}, ]
};
rs.initiate(config);
rs.status();

//pointing to the replicaset1


//write (mongo) in the shell and then paste the config in it after is starts
//then we run rs.initiate(config);


