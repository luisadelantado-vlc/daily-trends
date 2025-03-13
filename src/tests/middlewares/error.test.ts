import errorHandler from "../../middlewares/error.handler";
import { Request, Response } from 'express';


describe('Error middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockResponse = {
            status: mockStatus,
        };
        mockRequest = {}; 
    });
    test('Error DB handler', async () => {
        const error = {
            message: 'getaddrinfo ENOTFOUND',
          } as Error;


        errorHandler(error, mockRequest as Request, mockResponse as Response);

        expect(mockStatus).toHaveBeenCalledWith(503);
        expect(mockJson).toHaveBeenCalledWith({ message: 'Database connection failed. Please try again later.' });

    });
})