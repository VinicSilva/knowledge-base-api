import ResourceRepository from "../domain/repository/ResourceRepository";

export default class ResourceService {
  constructor(readonly resourceRepository: ResourceRepository) {}

  async getResources() {
    const resources = await this.resourceRepository.findAll();
    return resources;
  }

  async getResource(resourceId: number) {
    const resource = await this.resourceRepository.findOne(resourceId);
    return resource;
  }

  async create(body: any) {
    const { url, description, topicId, type } = body;
    if (!url || !description || !topicId || !type) {
      return { statusCode: 400, message: "Fields required." };
    }
    const resource = await this.resourceRepository.create(body);
    return resource;
  }

  async update(resourceId: number, body: any) {
    const { name, content, version } = body;
    if (!name || !content || !version) {
      return { statusCode: 400, message: "Fields required." };
    }
    const findResource = await this.resourceRepository.findOne(resourceId);
    if (!findResource) {
      return { statusCode: 404, message: "Resource not found." };
    }
    const resource = await this.resourceRepository.update(resourceId, body);
    return resource;
  }

  async remove(resourceId: number) {
    const findResource = await this.resourceRepository.findOne(resourceId);
    if (!findResource) {
      return { statusCode: 404, message: "Resource not found." };
    }
    const resources = await this.resourceRepository.remove(resourceId);
    return resources;
  }
}
