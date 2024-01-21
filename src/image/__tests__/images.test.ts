import { app } from '../../app/main';
import request from 'supertest';

const baseRoute = '/api/images';
const contentTypeKey = 'Content-Type';
const contentTypeValue = /json/;
const httpSuccess = 200;

describe('Images Module', () => {

    test('GET /api/images - when asking for an image and there is none, should return 200 and error message', async () => {
        await request(app)
            .get(baseRoute)
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => {
                console.log(response.body);
            })
    });

})