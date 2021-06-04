import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemServiceService } from './order-item-service.service';

describe('OrderItemServiceService', () => {
  let service: OrderItemServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderItemServiceService],
    }).compile();

    service = module.get<OrderItemServiceService>(OrderItemServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
