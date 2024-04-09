import { Injectable } from '@nestjs/common';
import {
  CreateOrderRequest,
  UpdateOrderRequest,
} from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  getOrders() {
    return this.ordersRepository.find({});
  }

  async createOrder(request: CreateOrderRequest) {
    return this.ordersRepository.create(request);
  }

  async updateOrder(id: string, updateOrderRequest: UpdateOrderRequest) {
    const existingOrder = await this.ordersRepository.updateOrder(
      id,
      updateOrderRequest,
    );

    if (!existingOrder) {
      throw new Error('Order not found');
    }

    // Update only the fields that are provided in the update request
    if (updateOrderRequest.name !== undefined) {
      existingOrder.name = updateOrderRequest.name;
    }

    if (updateOrderRequest.price !== undefined) {
      existingOrder.price = updateOrderRequest.price;
    }

    if (updateOrderRequest.phoneNumber !== undefined) {
      existingOrder.phoneNumber = updateOrderRequest.phoneNumber;
    }
  }

  async deleteOrder(id: string) {
    try {
      await this.ordersRepository.deleteOrder(id);

      console.log(`Order with ID ${id} deleted successfully`);
    } catch (error) {
      throw new Error('Failed to delete order with ID ${id}: ${error.message}');
    }
  }
}
