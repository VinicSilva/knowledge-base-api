import { config } from "./config";
import TopicController from "./infra/controller/TopicController";
import LoginController from "./infra/controller/LoginController";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import TopicRepositoryMemory from './infra/repository/TopicRepositoryMemory';

const topicRepository = new TopicRepositoryMemory();
const http = new ExpressAdapter();
new LoginController(http);
new TopicController(http, topicRepository);
const port: any = config.port;
http.listen(port);
