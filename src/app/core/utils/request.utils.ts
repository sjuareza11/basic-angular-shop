import { Params } from "@angular/router";

export class RequestUtils {

  public static convertObjectToQueryParams(params: Params): string {
    let queryParams = '';
    if (params && Object.keys(params).length > 0) {
      queryParams = '?';
      const paramsKeys = Object.keys(params);
      paramsKeys.forEach((param, index) => queryParams += `${param}=${params[param]}${index < paramsKeys.length - 1 ? '&' : ''}`);

    }
    return queryParams;
  }

}
