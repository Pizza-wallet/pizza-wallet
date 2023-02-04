import axios from "axios";
import { moralisNftApi, moralisApi } from "../helpers/MoralisApi";

const axiosInstance = axios.create({
    headers: {
        "X-API-Key": process.env.REACT_APP_MORALIS_WEB3_API
    }
})

export const queryNftData = async (api: moralisApi, actionIndex: number) => {
    try {
        const response = await axiosInstance.get(api.endpoint, {
            params: {
            chain: api.chains[actionIndex],
            apiKey: process.env.REACT_APP_MORALIS_WEB3_API
            }
        });
        const data = response.data.result;
        return data;
    } catch (error) {
        console.error(error);
    }
};
  
export const allNftData = async () => {
    try {
        const dataFromAllChains = [];
        for (const api of moralisNftApi) {
            const dataFromChains = [];
            for (let i = 0; i < api.chains.length; i++) {
                const nftData = await queryNftData(api, i);
                dataFromChains.push(nftData);
            }
            dataFromAllChains.push({ ...api, dataFromChains });
        }
        return dataFromAllChains;
    } catch (error) {
        console.error(error);
    }
};
console.log(allNftData());