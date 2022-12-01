import { Test, TestingModule } from '@nestjs/testing';
import { SeetController } from './seet.controller';

describe('SeetController', () => {
  let controller: SeetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeetController],
    }).compile();

    controller = module.get<SeetController>(SeetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
