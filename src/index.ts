import {Axios} from "./lib/axios";

 /**
 * @classdesc Class to get data of a UPS
 *
 * The Constructor takes the connection data (host, username, password)
 *
 * A method then can access and fetch some data of the UPS
 * @author Nico W. (Trickfilm400)
 * @since 0.0.0
 * @version 1.0.0
 * @class
 */
export class UPS_APC_API {
    private readonly host: string;
    private axios: Axios;
    private readonly _username: string;
    private readonly _password: string;

    /**
     *
     * @param host ONLY a FQDN or IP, http prefix will be appended later
     * @param username username to login like on the web page
     * @param password password to login like on the web page
     */
    constructor(host: string, username: string, password: string) {
        this.host = host;
        this._username = username;
        this._password = password;

        this.axios = new Axios(this.host, this._username, this._password);
    }

    /**
     * Main function to get the data of the UPS
     *
     * Currently, only 4 attributes are read out
     */
    async getData() {
        const res = await this.axios.fetch();
        const data = this.axios.parse(res.data);
        return data;
    }

}
