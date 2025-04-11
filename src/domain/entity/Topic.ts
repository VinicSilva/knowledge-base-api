export default class Topic {
  constructor(
    readonly name: string,
    readonly content: string,
    readonly version: number = 1,
    readonly id?: number,
    readonly parentTopicId?: number,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {
    if (!name) throw new Error('name is required');
    if (!content) throw new Error('content is required');
    if (version < 1) throw new Error('version must be greater than 0');
  }  
}