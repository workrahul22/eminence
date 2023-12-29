import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private httpService: HttpService) {}
  async getAllProducts() {
    const productUrl = `https://dummyjson.com/products`;
    const products = await this.httpService.get(productUrl).toPromise();
    return products.data;
  }
}
