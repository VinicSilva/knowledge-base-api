import Resource from "../entity/Resource";

export default interface ResourceRepository {
  findAll(): Promise<Resource[]>;
  findOne(resourceId: number): Promise<Resource>;
  create(resourceDto: Resource): Promise<Resource>;
  update(resourceId: number, resourceDto: Resource): Promise<Resource>;
  remove(resourceId: number): Promise<Resource[]>;
}