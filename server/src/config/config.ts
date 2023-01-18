const config = {
    mongo: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: false,
            autoIndex: false,
            retryWrites: false
        },
        url: `mongodb+srv://admin:admin@ask-zaman-tuneli-cluste.cj5gn.mongodb.net/?retryWrites=true&w=majority`
    },
    server: {
        host: 'localhost',
        port: 5000
    }
};

export default config;
