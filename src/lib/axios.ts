import axios, {AxiosInstance} from "axios";
import * as JSDOM from "jsdom";

export class Axios {
    private readonly host: string;
    private instance: AxiosInstance;
    private session?: string;
    private _username: string;
    private _password: string;

    constructor(host: string, username: string, password: string) {
        this.host = host;
        this._username = username;
        this._password = password;
        this.instance = axios.create({
            baseURL: `http://${this.host}/`,
            timeout: 10000
        });
    }

    async fetch() {
        // login if missing session
        if (!this.session) await this.login();
        let response = await this.instance.get<string>("/NMC/" + this.session + "/ulstat.htm")
        //if session is invalid, login and try again
        if (response.status === 303) {
            await this.login()
            response = await this.instance.get<string>("/NMC/" + this.session + "/ulstat.htm")
            return response;
        }
        return response;
    }

    parse(req: string) {
        req = req.replace(/\n/g, "");
        const dom = new JSDOM.JSDOM(req)
        const ampere = dom.window.document.getElementById("langLoadCurrent")?.parentElement?.parentElement?.childNodes.item(1);
        const voltage = dom.window.document.getElementById("langOutputVoltage")?.parentElement?.parentElement?.childNodes.item(3);
        const temperature = dom.window.document.getElementById("langInternalTemp")?.parentElement?.parentElement?.childNodes.item(3);
        const ampere_number = ampere?.firstChild?.nodeValue ? parseFloat(ampere.firstChild.nodeValue) : -1
        const voltage_number = voltage?.firstChild?.nodeValue ? parseFloat(voltage.firstChild.nodeValue) : -1
        const temperature_number = temperature?.firstChild?.nodeValue ? parseFloat(temperature.firstChild.nodeValue.replace("°C", "")) : -1
        //
        return {
            loadInAmpere: ampere_number,
            voltage: voltage_number,
            loadInWatt: ampere_number !== -1 && voltage_number !== -1 ? ampere_number * voltage_number : -1,
            temperature: temperature_number
        };
    }

    async login() {
        return new Promise<void>((resolve, reject) => {
            this.instance.post<string>("/Forms/login1", {
                "login_username": this._username || "apc",
                "login_password": this._password || "apc",
                "prefLanguage": "00000000",
                "submit": "Log+On"
            }, {
                maxRedirects: 0,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                validateStatus: (status) => status >= 200 && status <= 400
            }).then(response => {
                // console.log(response)
                // console.log(response)
                if (response.status === 303) {
                    const reg = /(?:[/]?NMC\/)(?<session>.*)(?:\/home.htm)/.exec(response.headers.location)
                    console.log(reg)
                    this.session = reg?.groups?.session;
                    resolve()
                }
            }).catch(reject)
        })
    }

}
