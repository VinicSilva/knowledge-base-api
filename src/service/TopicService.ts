import TopicRepository from "../domain/repository/TopicRepository";

export default class TopicService {
  constructor(readonly topicRepository: TopicRepository) {}

  async getTopics() {
    const topics = await this.topicRepository.findAll();
    return topics;
  }

  async getTopic(topicId: number) {
    const topic = await this.topicRepository.findOne(topicId);
    return topic;
  }

  async shortestPath(
    sourceTopicId: number,
    targetTopicId: number
  ): Promise<any> {
    const findSourceTopicId = await this.topicRepository.findOne(sourceTopicId);
    const findTargetTopicId = await this.topicRepository.findOne(targetTopicId);
    if (!findSourceTopicId || !findTargetTopicId) {
      return { statusCode: 404, message: "Topic not found." };
    }
    const shortestPath = await this.topicRepository.findShortestPath(
      sourceTopicId,
      targetTopicId
    );

    if (!shortestPath.length) {
      return { statusCode: 404, message: "No path found." };
    }

    return shortestPath.map(item => `TopicID ${item.id}: ${item.name}`).join(" -> ");
  }

  async create(body: any) {
    const { name, content } = body;
    if (!name || !content) {
      return { statusCode: 400, message: "Fields required." };
    }
    const topic = await this.topicRepository.create(body);
    return topic;
  }

  async update(topicId: number, body: any) {
    const { name, content } = body;
    if (!name || !content) {
      return { statusCode: 400, message: "Fields required." };
    }
    const findTopic = await this.topicRepository.findOne(topicId);
    if (!findTopic) {
      return { statusCode: 404, message: "Topic not found." };
    }
    const topic = await this.topicRepository.update(topicId, body);
    return topic;
  }

  async remove(topicId: number) {
    const findTopic = await this.topicRepository.findOne(topicId);
    if (!findTopic) {
      return { statusCode: 404, message: "Topic not found." };
    }
    const topics = await this.topicRepository.remove(topicId);
    return topics;
  }
}
