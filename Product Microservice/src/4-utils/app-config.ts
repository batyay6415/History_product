class AppConfig {

    // Server Port:
    public port = 4001;

    public connectionString = "mongodb://127.0.0.1:27017/northwind";
}

const appConfig = new AppConfig();

export default appConfig;
