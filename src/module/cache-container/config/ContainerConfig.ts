import {App} from "../../../ManagementConsole";
import {ContainerConfigCtrl} from "./ContainerConfigCtrl";
import {IRedirectState} from "../../../common/IRedirectState";
import {SchemaConfigCtrl} from "./schemas/SchemaConfigCtrl";
import {TransportConfigCtrl} from "./transport/TransportConfigCtrl";

const module: ng.IModule = App.module("managementConsole.cache-container.config", []);

// @ngInject
module.config(($stateProvider: ng.ui.IStateProvider) => {
  $stateProvider.state("container-config", <IRedirectState>{
    parent: "root",
    url: "containers/:profileName/:containerName/config",
    templateUrl: "module/cache-container/config/view/config.html",
    controller: ContainerConfigCtrl,
    controllerAs: "ctrl",
    redirectTo: "container-config.schemas",
    resolve: {
      container: ["$stateParams", "containerService", ($stateParams, containerService) => {
        return containerService.getContainer($stateParams.containerName, $stateParams.profileName);
      }]
    }
  });

  $stateProvider.state("container-config.schemas", {
    url: "/schemas",
    templateUrl: "module/cache-container/config/schemas/view/schemas.html",
    controller: SchemaConfigCtrl,
    controllerAs: "schemaCtrl",
    resolve: {
      availableSchemas: ["$stateParams", "container", "schemaService", ($stateParams, container, schemaService) => {
        return schemaService.getProtoSchemaNames(container);
      }]
    }
  });

  $stateProvider.state("container-config.transport", {
    url: "/transport",
    templateUrl: "module/cache-container/config/transport/view/transport.html",
    controller: TransportConfigCtrl,
    controllerAs: "transCtrl",
    resolve: {
      transport: ["$stateParams", "container", "containerConfigService", ($stateParams, container, containerConfigService) => {
        return containerConfigService.getTransportConfig(container);
      }],
      meta: ["container", "containerConfigService", (container, containerConfigService) => {
        return containerConfigService.getTransportMeta(container);
      }]
    }
  });
});