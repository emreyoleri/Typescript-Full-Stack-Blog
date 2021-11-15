const config = {
   mongo : {
       options: {
           useUnifinedTopology:true,
           useNewUrlParser : true,
           socketTimeoutMS: 30000,
           keepAlive: true,
           poolSize:50,
           autoIndex: false,
           retryWrites:false
       },
       url : `mongodb+srv://emreyoleriDB:1052emre@cluster0.lzsew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
   },
    server: {
        host: 'localhost',
        port: 3000
    }
};

export default config;
