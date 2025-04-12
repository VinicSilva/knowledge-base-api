import ResourceRepository from "../../domain/repository/ResourceRepository";
import ResourceService from "../../service/ResourceService";
import Connection from "../database/Connection";
import Http from "../http/Http";

export default class ResourceController {
  constructor(
    readonly http: Http,
    readonly resourceRepository: ResourceRepository,
    readonly connection?: Connection
  ) {
    // http.use('/resources', middleware)

    http.route("get", "/resources", async function (_params: any, _body: any) {
      const resourceService = new ResourceService(resourceRepository);
      const resources = await resourceService.getResources();
      return resources;
    });

    http.route(
      "get",
      "/resources/:resourceId",
      async function (params: any, _body: any) {
        const resourceService = new ResourceService(resourceRepository);
        const resource = await resourceService.getResource(parseInt(params.resourceId));
        return resource;
      }
    );

    http.route("post", "/resources", async function (params: any, body: any) {
      const resourceService = new ResourceService(resourceRepository);
      const resource: any = await resourceService.create(body);
      resource.statusCode = 201;
      return resource;
    });

    http.route(
      "put",
      "/resources/:resourceId",
      async function (params: any, body: any) {
        const resourceService = new ResourceService(resourceRepository);
        const resource = await resourceService.update(parseInt(params.resourceId), body);
        return resource;
      }
    );

    http.route(
      "delete",
      "/resources/:resourceId",
      async function (params: any, _body: any) {
        const resourceService = new ResourceService(resourceRepository);
        const resources = await resourceService.remove(parseInt(params.resourceId));
        return resources;
      }
    );
  }
}
