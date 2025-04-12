import Topic from "../../domain/entity/Topic";
import TopicRepository from "../../domain/repository/TopicRepository";

type TopicTree = Topic & {
  subtopics: TopicTree[];
};

export default class TopicRepositoryMemory implements TopicRepository {
  topics: Topic[];

  constructor() {
    this.topics = [];
  }

  async findAll(): Promise<Topic[]> {
    const latestByParent: Map<number, Topic> = new Map();

    for (const topic of this.topics) {
      const parentId = topic.parentTopicId || topic.id;

      const existing = latestByParent.get(parentId);
      if (!existing || topic.version > existing.version) {
        latestByParent.set(parentId, topic);
      }
    }

    return Array.from(latestByParent.values());
  }

  async findOne(topicId: number): Promise<TopicTree> {
    const topicData = this.topics.find((topic: Topic) => topic.id === topicId);
    if (!topicData) return null;
    const children = await this.findChildren(topicData.id);
    const subtopics = await Promise.all(
      children.map((child) => this.findOne(child.id))
    );

    return {
      ...topicData,
      subtopics,
    };
  }

  async findAllVersions(topicId: number): Promise<Topic[]> {
    const baseTopic = this.topics.find((t) => t.id === topicId);
    if (!baseTopic) return [];

    const parentId = baseTopic.parentTopicId || baseTopic.id;
    return this.topics.filter(
      (t) => t.id === parentId || t.parentTopicId === parentId
    );
  }

  async findChildren(parentTopicId: number): Promise<Topic[]> {
    return this.topics.filter((t) => t.parentTopicId === parentTopicId);
  }

  async create(topicDto: Topic): Promise<Topic> {
    const id = this.generateNextId();
    const newTopic = new Topic(
      topicDto.name,
      topicDto.content,
      1,
      id,
      topicDto.parentTopicId || null,
      new Date(),
      new Date()
    );
    this.topics.push(newTopic);
    return newTopic;
  }

  async update(topicId: number, topicDto: Partial<Topic>): Promise<Topic> {
    const baseTopic = this.topics.find(t => t.id === topicId);
    if (!baseTopic) return null;
  
    const parentId = baseTopic.id;
  
    const siblingVersions = this.topics
      .filter(topic => topic.parentTopicId === parentId)
      .map(topic => topic.version);
  
    const newVersion = siblingVersions.length ? Math.max(...siblingVersions) + 1 : 1;
  
    const newId = this.generateNextId();
  
    const newTopic = new Topic(
      topicDto.name || baseTopic.name,
      topicDto.content || baseTopic.content,
      newVersion,
      newId,
      parentId,
    );
  
    this.topics.push(newTopic);
    return newTopic;
  }

  async remove(topicId: number): Promise<Topic[]> {
    this.topics = this.topics.filter((topic) => topic.id !== topicId);
    return this.findAll();
  }

  private generateNextId(): number {
    const ids = this.topics.map((t) => t.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }
}
