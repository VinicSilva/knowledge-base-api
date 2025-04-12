export default class Resource {
  constructor(
    readonly url: string,
    readonly description: string,
    readonly topicId: number,
    readonly type: "video" | "article" | "pdf",
    readonly id?: number,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {
    if (!url) throw new Error('url is required');
    if (!description) throw new Error('description is required');
    if (!topicId) throw new Error('topicId is required');
    if (!type) throw new Error('type is required');
    if (type !== "video" && type !== "article" && type !== "pdf") {
      throw new Error('type must be video, article or pdf');
    }
  }  
}