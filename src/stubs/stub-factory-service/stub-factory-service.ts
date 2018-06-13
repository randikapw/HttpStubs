import { BaseStub } from '../base-stub/base-stub';
import { Injectable } from '@angular/core';
import { HttpRequestProvider } from '../../providers/Http/http-request';
import { UsersStub } from '../users-stub/users-stub';

export enum Stubs {
    Users = 'UsersStub',
}

@Injectable()
export class StubFactoryServiceProvider {

    constructor(
        private http: HttpRequestProvider,
    ) {
        //
    }

    /**
     * Creates and return stub object mapping to passed Stub parameter.
     *
     * @param   {Stubs}  stub stub to create.
     *
     * @returns {BaseStub} related stub object.
     */
    public createStub(stub: Stubs): BaseStub {
        let newStub: BaseStub;
        switch (stub) {
            case (Stubs.Users):
                newStub = new UsersStub();
                break;
        }
        return newStub.init(this.http);
    }
}
