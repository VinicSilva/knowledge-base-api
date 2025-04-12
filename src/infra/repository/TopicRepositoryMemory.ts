import Topic from "../../domain/entity/Topic";
import TopicRepository from "../../domain/repository/TopicRepository";

export default class TopicRepositoryMemory implements TopicRepository {
  topics: Topic[];

  constructor() {
    this.topics = [];
  }

  async findAll(): Promise<Topic[]> {
    return this.topics;
  }

  async findOne(topicId: number): Promise<Topic> {
    const topicData = this.topics.find((topic: Topic) => topic.id === topicId);
    if (!topicData) return null;
    const topic: Topic = new Topic(
      topicData.name,
      topicData.content,
      topicData.version,
      topicData.id,
      topicData.parentTopicId,
      topicData.createdAt,
      topicData.updatedAt,
    );
    return topic;
  }

  async create(topicDto: Topic): Promise<Topic> {
    const id = this.topics.length + 1;
    this.topics.push({
      ...topicDto,
      id,
    });
    const topic: Topic = new Topic(
      topicDto.name,
      topicDto.content,
      topicDto.version,
      id,
      topicDto.parentTopicId
    );
    return topic;
  }

  async update(topicId: number, topicDto: any): Promise<Topic> {
    const topicIndex = this.topics.findIndex(
      (topic: Topic) => topic.id === topicId
    );
    if (topicIndex == -1) return null;
    this.topics[topicIndex] = {
      ...topicDto,
      id: topicId,
    };
    const topic: Topic = new Topic(
      topicDto.name,
      topicDto.content,
      topicDto.version,
      topicId,
      topicDto.parentTopicId,
      topicDto.createdAt,
      new Date(),
    );
    return topic;
  }

  async remove(topicId: number): Promise<Topic[]> {
    const topicIndex = this.topics.findIndex(
      (topic: Topic) => topic.id === topicId
    );
    if (topicIndex == -1) return null;
    this.topics.splice(topicIndex, 1);
    return this.findAll();
  }
}
