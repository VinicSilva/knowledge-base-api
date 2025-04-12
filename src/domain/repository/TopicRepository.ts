import Topic from "../entity/Topic";

type TopicTree = Topic & {
  subtopics: TopicTree[];
};

export default interface TopicRepository {
  findAll(): Promise<Topic[]>;
  findOne(topicId: number): Promise<TopicTree>;
  create(topicDto: Topic): Promise<Topic>;
  update(topicId: number, topicDto: Topic): Promise<Topic>;
  remove(topicId: number): Promise<Topic[]>;
  findShortestPath(
    sourceTopicId: number,
    targetTopicId: number
  ): Promise<any>;
}