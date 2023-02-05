import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';

describe.skip('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userController = module.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = [
        {
          id: faker.datatype.number(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          is_active: true,
          create_at: faker.date.past(),
          notes: [],
        },
      ];

      jest
        .spyOn(userService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.findAll()).toBe(result);
    });
  });
});
