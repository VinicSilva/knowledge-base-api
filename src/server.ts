import { config } from "./config";
import TopicController from "./infra/controller/TopicController";
import LoginController from "./infra/controller/LoginController";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import TopicRepositoryMemory from './infra/repository/TopicRepositoryMemory';
import ResourceRepositoryMemory from "./infra/repository/ResourceRepositoryMemory";
import ResourceController from "./infra/controller/ResourceController";

const topicRepository = new TopicRepositoryMemory();
const resourceRepository = new ResourceRepositoryMemory();
const http = new ExpressAdapter();
new LoginController(http);
new TopicController(http, topicRepository);
new ResourceController(http, resourceRepository);

const port: any = config.port;
http.listen(port);
