import { ChallengeController } from '@controllers/sandbox';
import { reqMock, resMock, nextMock } from '#mock';
import { UnexpectedError } from '#error';

beforeEach(() => {
  jest.clearAllMocks();
});

describe(ChallengeController.name, () => {
  test('should set the response status', async () => {
    const request = jest.fn();
    const challengeController = new ChallengeController(request);

    await challengeController.do(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(200);
  });

  test('should send the result in json', async () => {
    const requestResult = 'dumyResult';
    const request = jest.fn().mockReturnValue(requestResult);
    const challengeController = new ChallengeController(request);

    await challengeController.do(reqMock, resMock, nextMock);

    expect(resMock.json).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith(requestResult);
  });

  test('should set the status before sending', async () => {
    const request = jest.fn();
    const challengeController = new ChallengeController(request);

    await challengeController.do(reqMock, resMock, nextMock);

    const statusOrder = resMock.status.mock.invocationCallOrder[0];
    const sendOrder = resMock.json.mock.invocationCallOrder[0];
    expect(statusOrder).toBeLessThan(sendOrder);
  });

  test('should send the error to the middleware if the request fail', async () => {
    const request = jest.fn().mockReturnValue(new Error());
    const challengeController = new ChallengeController(request);

    await challengeController.do(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith(UnexpectedError);
  });
}); // si la réponse de mon service est une instance d’erreur
// le vérifie que la méthode next est appelée

//sinon
// je lance la méthode status avec le chiffle 200

//le controller doit être appelé avec une certaine url, certains middleware d’authentification..
//le middleware controller

// vérifier si la méthode du service getChallenge est utilisée autrepart parce que j’ai modifié l’interface
