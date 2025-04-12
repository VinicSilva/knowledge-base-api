import TopicRepository from "../../domain/repository/TopicRepository";
import TopicService from "../../service/TopicService";
import Connection from "../database/Connection";
import Http from "../http/Http";

export default class TopicController {
  constructor(
    readonly http: Http,
    readonly topicRepository: TopicRepository,
    readonly connection?: Connection
  ) {
    // http.use('/topics', middleware)

    http.route("get", "/topics", async function (_params: any, _body: any) {
      const topicService = new TopicService(topicRepository);
      const topics = await topicService.getTopics();
      return topics;
    });

    http.route(
      "get",
      "/topics/:topicId",
      async function (params: any, _body: any) {
        const topicService = new TopicService(topicRepository);
        const topic = await topicService.getTopic(parseInt(params.topicId));
        return topic;
      }
    );

    http.route(
      "get",
      "/topics/shortest-path/:sourceTopicId/:targetTopicId",
      async function (
        params: any,
        _body: any
      ) {
        const topicService = new TopicService(topicRepository);
        const shortestPath = await topicService.shortestPath(
          parseInt(params.sourceTopicId),
          parseInt(params.targetTopicId)
        );
        return shortestPath;
      }
    );

    http.route("post", "/topics", async function (params: any, body: any) {
      const topicService = new TopicService(topicRepository);
      const topic: any = await topicService.create(body);
      topic.statusCode = 201;
      return topic;
    });

    http.route(
      "put",
      "/topics/:topicId",
      async function (params: any, body: any) {
        const topicService = new TopicService(topicRepository);
        const topic = await topicService.update(parseInt(params.topicId), body);
        return topic;
      }
    );

    http.route(
      "delete",
      "/topics/:topicId",
      async function (params: any, _body: any) {
        const topicService = new TopicService(topicRepository);
        const topics = await topicService.remove(parseInt(params.topicId));
        return topics;
      }
    );
  }
}
