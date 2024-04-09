import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Order } from './schemas/order.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class OrdersRepository extends AbstractRepository<Order> {
  protected readonly logger = new Logger(OrdersRepository.name);
  // private orderModel: Model<Order>;

  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }

  async updateOrder(id: string, updateFields: Partial<Order>): Promise<Order> {
    try {
      const existingOrder = await this.orderModel.findByIdAndUpdate(
        id,
        updateFields,
        { new: true },
      );

      if (!existingOrder) {
        throw new Error('Order not found');
      }

      return existingOrder;
    } catch (error) {
      this.logger.error(
        `Failed to update order with ID ${id}: ${error.message}`,
      );
      throw error;
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      const deletedOrder = await this.orderModel.findByIdAndDelete(id);

      if (!deletedOrder) {
        throw new Error('Order not found');
      }
      this.logger.log(`Order with ID ${id} deleted successfully`);
    } catch (error) {
      this.logger.error(
        `Failed to delete order with ID ${id}: ${error.message}`,
      );
      throw error;
    }
  }
}
