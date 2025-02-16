import { app } from '../../../src/app/main';
import request from 'supertest';
import { describe, test, expect } from 'bun:test';

const contentTypeKey = 'Content-Type';
const contentTypeValue = /json/;
const httpSuccess = 200;

describe('INTEGRATION - App Module', () => {

    test('GET / - when asking for the root route should return 200 and catch all message', async () => {
        await request(app)
            .get('/')
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => {
                expect(response.body).toEqual({ message: "Allo! Catch-all route." });
            })
    });

    test('GET /v1/api - when asking for the api route should return 200 and api message', async () => {
        await request(app)
            .get('/v1/api')
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => {
                expect(response.body).toEqual({ message: "Welcome to the Waifuland API" });
            })
    });

})