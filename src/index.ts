import {defaultConfig} from './defaultConfig';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';

class CurveService {

    public config: any;
    public environment: string;
    public app: express.Express;
    public redis: connectRedis.Redis;

    constructor(config: any) {
        this.config = {...defaultConfig, ...config};
        this.app = express();
        this.redis = new (connectRedis(session))(this.config.REDIS_STORE);
        this.environment = this.config.ENV || 'development';

        CurveService.allowOrigin(this.app);
        CurveService.storeSession(this.app, this.redis, this.config.SESSION);

        // parse application/json
        this.app.use(bodyParser.json());

        this.app.listen(this.config.APP_PORT, () => {
            console.log('service is live on port: ' + this.config.APP_PORT);
        });
    }

    static allowOrigin(app: express.Express) {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    static storeSession(app: express.Express, store: connectRedis.Redis, sessionConfig) {
        app.use(session({
            store,
            ...sessionConfig
        }));
    }

}

export default CurveService;
