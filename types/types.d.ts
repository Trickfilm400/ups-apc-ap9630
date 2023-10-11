export declare class Axios {
    private readonly host;
    private instance;
    private session?;
    private _username;
    private _password;
    constructor(host: string, username: string, password: string);
    fetch(): Promise<import("axios").AxiosResponse<string, any>>;
    parse(req: string): {
        loadInWatt: number;
    };
    login(): Promise<void>;
}



export declare class UPS_APC_API {
    private readonly host;
    private axios;
    private readonly _username;
    private readonly _password;
    constructor(host: string, username: string, password: string);
    getData(): Promise<{
        loadInWatt: number;
    }>;
}
