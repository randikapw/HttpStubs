import { BaseStub, ReqestType } from '../base-stub/base-stub';

export class UsersStub extends BaseStub {

    private static readonly TAG: string = 'UsersStub';
    private configs: {index?};

    /**
     * @override form BaseStub.
     */
    public getStubName(): string {
        return 'Users';
    }

    /**
     * @override form BaseStub.
     */
    public async setCustomConfigs(customConfigs: any) {
        // verify mandatory configs
        //if (!customConfigs.date) { throw new Error('Mandetory config "date" not available.'); }

        var configs = {index:null};
        if(customConfigs.index){configs.index = customConfigs.index};
        this.configs = configs;
    }

    public getCustomConfigs(){
        if (this.configs) {
            return this.configs;
        } else {
            throw new Error(UsersStub.TAG + ' - Try to get custrom config without setting it');
        }
    }

    /**
     * @override form BaseStub.
     */
    public getRequestType(): ReqestType {
        return ReqestType.Get;
    }

    /**
     * @override form BaseStub.
     */
    public async getUrl() {
        // const repsApp: RepsApp = RepsApp.getInstance();
        // const host = await repsApp.getApiHost();
        // const apiRoot = await repsApp.getApiRoot();
        // const user = await this.authService.getUserName();

        var url =  BaseStub.HOST + '/users';
        // set optional parameters
        const configs = this.getCustomConfigs();
        if (configs.index) {url += '/' + configs.index};
        console.log(url);
        return url;
    }

    /**
     * @override form BaseStub.
     */
    public async getPreparedData(data) {
        try {
            // validate data before manipualte.
            this.validateDataInstance(data);
            return data;
        } catch (e) {
            // TODO: handle e here if needed.
            throw e;
        }
    }

    /**
     * @override form BaseStub.
     */
    public validateDataInstance(data: any) {
        // Use this function if you need to validate received data. Like data is in expected format.
        // If data is not valid, just throw an error
        // throw new Error('Invalid data.');
    }

}