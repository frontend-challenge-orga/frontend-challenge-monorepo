import { reqMock, resMock, nextMock } from '#mock';
import { UnexpectedError } from '#error';
import { httpStatus } from '@package/domain';
import { ChallengeControllerGet } from '@controllers/challenge.controller';

beforeEach(() => {
  jest.clearAllMocks();
});

describe(ChallengeControllerGet.name, () => {
  test('should set the response status', async () => {
    const request = jest.fn();
    const challengeController = new ChallengeControllerGet(request);

    await challengeController.do(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(httpStatus.OK);
  });

  test('should send the result in json', async () => {
    const requestResult = 'dumyResult';
    const request = jest.fn().mockReturnValue(requestResult);
    const challengeController = new ChallengeControllerGet(request);

    await challengeController.do(reqMock, resMock, nextMock);

    expect(resMock.json).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith(requestResult);
  });

  test('should set the status before sending', async () => {
    const request = jest.fn();
    const challengeController = new ChallengeControllerGet(request);

    await challengeController.do(reqMock, resMock, nextMock);

    const statusOrder = resMock.status.mock.invocationCallOrder[0];
    const sendOrder = resMock.json.mock.invocationCallOrder[0];
    expect(statusOrder).toBeLessThan(sendOrder);
  });

  test('should send the error to the middleware if the request fail', async () => {
    const request = jest.fn().mockReturnValue(new Error());
    const challengeController = new ChallengeControllerGet(request);

    await challengeController.do(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock.mock.calls[0][0]).toBeInstanceOf(UnexpectedError);
  });
});
