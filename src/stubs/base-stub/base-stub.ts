import { HttpRequestProvider } from '../../providers/Http/http-request';


/*
  Generated class for the CommonStubServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export enum ReqestType {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE',
  Put = 'PUT',
}


export abstract class BaseStub {

  private static readonly BASE_TAG: string = 'BaseStub';
  private http: HttpRequestProvider;

  public static readonly HOST: string = 'http://jsonplaceholder.typicode.com';


  public init(
    http: HttpRequestProvider,
  ): BaseStub {
    this.http = http;
    return this;
  }

  // *** Not recomend to override this function.
  /**
   * Execute the stub function in an order and get data for this stub from
   * manupulated http request.
   *
   */
  public async executeStub(secondAttempt?: boolean) {
    try {
      const requestType = this.getRequestType();
      const headers = await this.getHeaders();
      const url = await this.getUrl();
      const urlParams = await this.getUrlParameters();
      // TODO: introduce names replacing 'TBD'
      const response = await this.http.request(requestType, url, headers, this.getStubName());
      const preparedData = await this.getPreparedData(response);
      return preparedData;
    } catch (error) {
      if (error.httpStatus && error.httpStatus === 401 && !secondAttempt) {
        console.warn('401 Unauthorized occured.', BaseStub.BASE_TAG);
        // console.info('Re attempting to authenticate user.', BaseStub.BASE_TAG);
        // You can use authentication funtion to re authenticate here.
        // const token = await this.authService.authenticateUser();
        // console.info('Rety the same request with new autherization.', BaseStub.BASE_TAG);
        //return await this.executeStub(true);
      }
      error.userMessage = 'Something went wrong.';
      throw error;
    }
  }

  /**
   * Return stub name.
   *
   * @returns {string} The name of the stub.
   */
  public abstract getStubName(): string;

  /**
   * Set cutum configurations to stub from out side if require.
   *
   * @param   {any}  customConfigs set of configs as a json.
   *
   */
  public async setCustomConfigs(customConfigs: any) {
    // Not abastract as optional to override.
  }

  /**
   * Return requet type of the http request which is mapped to the stub.
   *
   * @returns {RequestType} requet type.
   */
  public abstract getRequestType(): ReqestType;

  /**
   * Return headers of the http request which is mapped to the stub.
   *
   * @returns {Promise<any>} promise with a json result.
   */
  public async getHeaders(): Promise<any> {
    // Not abastract as optional to override.
    return null;
  }

  /**
   * Return the url of http request which is mapped to the stub.
   *
   * @returns {Promise<string>} promise that result the url.
   */
  public abstract async getUrl(): Promise<string>;

  /**
   * Return the url parameters of http request which is mapped to the stub.
   *
   * @returns {Promise<string>} promise that result the url parameters.
   */
  public async getUrlParameters(): Promise<string> {
    // Not abastract as optional to override.
    return null;
  }

  /**
   * Return manipulated data which received from http request which is mapped to the stub.
   *
   * @returns {Promise<any>} promise that result manipulated data.
   */
  public async getPreparedData(originalData: any): Promise<any> {
    // Not abastract as optional to override. and return same original data in nothing to preapare.
    return originalData;
  }

}
