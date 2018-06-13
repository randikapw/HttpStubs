import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReqestType } from '../../stubs/base-stub/base-stub';

interface IOptionsGet {
  headers?: any;
  observe?: 'body';
  params?: {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

enum ReqeustOptions {
  headers = 'headers',
  observe = 'observe',
}

@Injectable()
export class HttpRequestProvider {

  private static readonly TAG: string = 'HttpRequestProvider';
  private RequestId: number = 0;

  constructor(
    public http: HttpClient,
  ) {
    //
  }

  /**
   * Handling http request and result data.
   *
   * @param {ReqestType} reqeustType GET|POST|PUT|..
   * @param {string} reqeustUrl Url with parameters.
   * @param {any} headers Headers as a json object.
   * @param {string} name Generic name for the reqeust.
   *
   * @returns {Promise<any>} Data as json.
   */
  public request(reqeustType: ReqestType, reqeustUrl: string, headers: any, name: string): Promise<any> {
    // Define unique tag for the request.
    const requestUniqueTag = 'HTTP_' + name + '_' + ++this.RequestId;

    console.info('Starting http request ' + requestUniqueTag, HttpRequestProvider.TAG);
    console.debug('%%% URL: ' + reqeustUrl, HttpRequestProvider.TAG);

    return new Promise((resolve, reject) => {
      // define default configs for http request.
      const configs = {};
      configs[ReqeustOptions.observe] = 'response';

      // below on fail will call in every fail case of a reqeust.
      const onFail = (error: any) => {
        const httpStatus = error.status;
        // Loging.
        console.error('HTTP Request failed. Url: ' + reqeustUrl, HttpRequestProvider.TAG);
        console.debug('http status - ' + httpStatus, HttpRequestProvider.TAG);
        if (error.headers) {
          console.debug('http headers - ' + JSON.stringify(error.headers), HttpRequestProvider.TAG);
        }

        if (!(error.error && error.error.stack)) {
          // error.stack not available means asume it is an string.
          error.error = new Error(error.message || error.error);
        }

        // define custom attribue in error object.
        error.error.httpStatus = httpStatus;
        error.error.userMessage = 'Oops Comunicating wiht server failed!';
        reject(error.error);

      };

      // Include headers to configs if available.
      if (headers) {
        configs[ReqeustOptions.headers] = headers;
      }

      // Only defined get request or now as this aplication only using http get reqeust.
      this.http.get(reqeustUrl, configs).subscribe((response: { body: any; status: number; headers: any }) => {
        // TODO: remove below debug log.
        console.debug(
          'Response for ' + requestUniqueTag + ' is: ' + JSON.stringify(response), HttpRequestProvider.TAG);

        if (response.status === 200) {
          resolve(response.body);
        } else {
          // If the status code not 200, considering it as a faile reqeust for this application scenarios.
          onFail({
            error: 'Unexpected status for request - ' + response.status,
            headers: response.headers,
            status: response.status,
            url: reqeustUrl,
          });
        }

      }, (error) => {
        // TODO: remove beleow debug log.
        console.debug(error.message, HttpRequestProvider.TAG);
        onFail(error);
      },
      );
    });

  }

}
