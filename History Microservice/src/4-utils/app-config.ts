class AppConfig {

    // Server Port:
    public port = 4002;

    public connectionString = "mongodb://127.0.0.1:27017/History";
}

const appConfig = new AppConfig();

export default appConfig;
