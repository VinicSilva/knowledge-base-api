import Topic from "../entity/Topic";

export default interface TopicRepository {
  findAll(): Promise<Topic[]>;
  findOne(topicId: number): Promise<Topic>;
  create(topicDto: Topic): Promise<Topic>;
  update(topicId: number, topicDto: Topic): Promise<Topic>;
  remove(topicId: number): Promise<Topic[]>;
}