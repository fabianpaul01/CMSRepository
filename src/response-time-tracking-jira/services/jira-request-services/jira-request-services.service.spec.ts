import { Test, TestingModule } from '@nestjs/testing';
import { JiraRequestServices } from './jira-request-services.service';

describe('JiraRequestServicesService', () => {
  let service: JiraRequestServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JiraRequestServices],
    }).compile();

    service = module.get<JiraRequestServicesService>(JiraRequestServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
