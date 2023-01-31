import { Injectable } from "@nestjs/common";
import { OpenFoodFactsApi, ApiTypes } from "openfoodfac-ts";

@Injectable({})
export class OpenFoodService {
    private openFoodFactsApi: OpenFoodFactsApi;
    constructor() {
        this.openFoodFactsApi = new OpenFoodFactsApi();
    }

    findProductByBarcode(ean: string): Promise<ApiTypes.Product> {
        console.log("EAN: " + ean);
        const product = this.openFoodFactsApi.findProductByBarcode(ean);
        if (product["productname_"])
            //const productDto = {}
            return
    }
}