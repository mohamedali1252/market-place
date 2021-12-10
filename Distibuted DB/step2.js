config = {_id: "conf",members:[
    {_id:0,host:"localhost:57040"},
    {_id:1,host:"localhost:57041"},
    {_id:2,host:"localhost:57042"} ]
};

rs.initiate(config);
rs.status();
exit
