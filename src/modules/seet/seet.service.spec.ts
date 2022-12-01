import { Test, TestingModule } from '@nestjs/testing';
import { SeetService } from './seet.service';

describe('SeetService', () => {
  let service: SeetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeetService],
    }).compile();

    service = module.get<SeetService>(SeetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
