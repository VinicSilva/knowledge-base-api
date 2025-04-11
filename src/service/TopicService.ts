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

  async create(body: any) {
    const { name, content, version, parentTopicId } = body;
    if (!name || !content || !version) {
      return { statusCode: 400, message: "Fields required." };
    }
    const topic = await this.topicRepository.create(body);
    return topic;
  }

  async update(topicId: number, body: any) {
    const { name, content, version, parentTopicId } = body;
    if (!name || !content || !version) {
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
