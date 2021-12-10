mkdir -p C:/data/config/config-a C:/data/config/config-b C:/data/config/config-c


mongod --logpath "cfg-a.log" --dbpath C:/data/config/config-a --replSet conf --port 57040 --configsvr &
mongod --logpath "cfg-b.log" --dbpath C:/data/config/config-b --replSet conf --port 57041 --configsvr &
mongod --logpath "cfg-c.log" --dbpath C:/data/config/config-c --replSet conf --port 57042 --configsvr



