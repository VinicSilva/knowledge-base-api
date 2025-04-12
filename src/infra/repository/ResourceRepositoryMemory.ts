import Resource from "../../domain/entity/Resource";
import ResourceRepository from "../../domain/repository/ResourceRepository";

export default class ResourceRepositoryMemory implements ResourceRepository {
  resources: Resource[];

  constructor() {
    this.resources = [];
  }

  async findAll(): Promise<Resource[]> {
    return this.resources;
  }

  async findOne(resourceId: number): Promise<Resource> {
    const resourceData = this.resources.find((resource: Resource) => resource.id === resourceId);
    if (!resourceData) return null;
    const topic: Resource = new Resource(
      resourceData.url,
      resourceData.description,
      resourceData.topicId,
      resourceData.type,
      resourceData.id,
    );
    return topic;
  }

  async create(resourceDto: Resource): Promise<Resource> {
    const id = this.resources.length + 1;
    this.resources.push({
      ...resourceDto,
      id,
    });
    const resource: Resource = new Resource(
      resourceDto.url,
      resourceDto.description,
      resourceDto.topicId,
      resourceDto.type,
      id,
      resourceDto.createdAt,
      new Date(),
    );
    return resource;
  }

  async update(resourceId: number, resourceDto: any): Promise<Resource> {
    const resourceIndex = this.resources.findIndex(
      (resource: Resource) => resource.id === resourceId
    );
    if (resourceIndex == -1) return null;
    this.resources[resourceIndex] = {
      ...resourceDto,
      id: resourceId,
    };
    const resource: Resource = new Resource(
      resourceDto.url,
      resourceDto.description,
      resourceDto.topicId,
      resourceDto.type,
      resourceId,
      resourceDto.createdAt,
      new Date(),
    );
    return resource;
  }

  async remove(resourceId: number): Promise<Resource[]> {
    const resourceIndex = this.resources.findIndex(
      (resource: Resource) => resource.id === resourceId
    );
    if (resourceIndex == -1) return null;
    this.resources.splice(resourceIndex, 1);
    return this.findAll();
  }
}
