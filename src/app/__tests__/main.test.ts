import { app } from '../main';
import request from 'supertest';

const contentTypeKey = 'Content-Type';
const contentTypeValue = /json/;
const httpSuccess = 200;

describe('App Module', () => {

    test('GET / - when asking for the root route should return 200 and catch all message', async () => {
        await request(app)
            .get('/')
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => {
                expect(response.body).toEqual({ message: "Allo! Catch-all route." });
            })
    });

    test('GET /api - when asking for the api route should return 200 and api message', async () => {
        await request(app)
            .get('/api')
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => {
                expect(response.body).toEqual({ message: "Welcome to the Waifuland API" });
            })
    });

})