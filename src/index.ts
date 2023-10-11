import {Axios} from "./lib/axios";


export class UPS_APC_API {
    private readonly host: string;
    private axios: Axios;
    private readonly _username: string;
    private readonly _password: string;

    constructor(host: string, username: string, password: string) {
        this.host = host;
        this._username = username;
        this._password = password;

        this.axios = new Axios(this.host, this._username, this._password);
    }

    async getData() {
        const res = await this.axios.fetch();
        const data = this.axios.parse(res.data);
        return data;
    }

}
