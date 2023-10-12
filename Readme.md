# UPS APC AP9630 NodeJS API

This NPM package provides a full nodejs-api for the APC AP9630 UPS Management Card 2 device to fetch data of the device.

## Usage

- Install NPM package from GitHub / NPM.
- Function return a Promise

## Example

```typescript
import UPS_APC_API from "@trickfilm400/ups-apc-ap9630";

const client = new UPS_APC_API("<IP / Host of device", "<username>", "<password>");

client.getData().then((res) => {
    console.log(res);
    /*
     * {
            loadInAmpere: number,
            voltage: number,
            loadInWatt: number,
            temperature: number,
        }
     *
     *
     */
}).catch(console.error);
```

&copy; 2023 Trickfilm400
