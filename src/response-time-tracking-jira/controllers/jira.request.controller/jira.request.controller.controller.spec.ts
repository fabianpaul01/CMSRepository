import { Test, TestingModule } from '@nestjs/testing';
import { Jira.Request.ControllerController } from './jira.request.controller.controller';

describe('Jira.Request.ControllerController', () => {
  let controller: Jira.Request.ControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Jira.Request.ControllerController],
    }).compile();

    controller = module.get<Jira.Request.ControllerController>(Jira.Request.ControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
