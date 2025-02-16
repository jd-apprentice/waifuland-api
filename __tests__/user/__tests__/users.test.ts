import { app } from '../../../src/app/main';
import { Config } from "../../../src/app/config/config";
import { loadDatabase } from "../../../src/app/db/index";
import generateToken from '../../../src/common/utils/generateToken';

import request from 'supertest';
import { describe, test, expect, beforeAll, jest, beforeEach } from 'bun:test';

const contentTypeKey = 'Content-Type';
const contentTypeValue = /json/;
const httpSuccess = 200;
const httpUnauthorized = 401;
const baseRoute = "/v1/api/user";

const userResponse = {
    _id: expect.any(String),
    username: expect.any(String),
    password: expect.any(String),
    isAdmin: expect.any(Boolean),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    profile_picture: expect.any(String),
}

describe('INTEGRATION - User Module', () => {

    let token: string | undefined;

    beforeAll(async () => {
        token = generateToken("prueba");
        jest.clearAllMocks();
    });

    beforeEach(async () => {
        await loadDatabase(Config.db.uri);
    });

    test('GET /api/user - should get unauthorized without token', async () => {
        await request(app)
            .get(baseRoute)
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpUnauthorized)
            .then((response) => {
                expect(response.body.output.payload)
                    .toMatchObject(
                        {
                            statusCode: httpUnauthorized,
                            error: "Unauthorized",
                            message: "Invalid token"
                        }
                    );
            })
    });

    test('GET /api/user - should return all users', async () => {

        const response = await request(app)
            .get(baseRoute)
            .set('Authorization', `Bearer ${token}`)
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess);

        for (const item of response.body) {
            expect(item).toMatchObject(userResponse);
            expect(item.isAdmin).toEqual(false);
            expect(item.username).toEqual("prueba");
        }
    });

})