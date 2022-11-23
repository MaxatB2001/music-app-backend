import { Test, TestingModule } from '@nestjs/testing';
import { SelectionsController } from './selections.controller';

describe('SelectionsController', () => {
  let controller: SelectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectionsController],
    }).compile();

    controller = module.get<SelectionsController>(SelectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
