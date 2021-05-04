import { environment } from "src/environments/environment";

export const enum Endpoints {
  Authenticate = 'authenticate',

  CreateUser = 'user',

  AllFarms = 'farms',
  FarmsById = 'farms/{{0}}',
  CreateFarm = 'farms',
  DeleteFarm = 'farms/{{0}}',
  UpdateFarm = 'farms/{{0}}',

  CreateStand = 'farms/{{0}}/stands',
  DeleteStand = 'stands/{{0}}',
  StandById = 'farms/{{0}}/stands/{{1}}',
  UpdateStand = 'farms/{{0}}/stands/{{1}}',

  CreateSample = 'farms/{{0}}/stands/{{1}}/samples',
  DeleteSample = 'samples/{{0}}',
  UpdateSample = 'farms/{{0}}/stands/{{1}}/samples/{{2}}',

  CreateProduction = 'farms/{{0}}/stands/{{1}}/productions',
  DeleteProduction = 'productions/{{0}}',
  UpdateProduction = 'farms/{{0}}/stands/{{1}}/productions/{{2}}',
  
  Report = 'report/{{0}}',
}

export const serviceBackUrl = (endpoint: Endpoints, ...params: Array<string|number>): string => {
  return endpointInterpolation(environment.backUrl, endpoint, ...params);
}

export const endpointInterpolation = (baseUrl: string, endpoint: string, ...param: Array<string|number>) => {
  const interpolatedEndpoint = param.reduce<string>((old, curr, i) => old.split(`{{${i}}}`).join(curr.toString()), endpoint);
  
  return baseUrl + interpolatedEndpoint;
}