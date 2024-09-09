import { app } from '../../../src/app/main';
import Config from "../../../src/app/config/config";
import { loadDatabase } from "../../../src/app/db/index";

import request from 'supertest';
import { describe, test, expect, beforeAll, jest, beforeEach } from 'bun:test';

const contentTypeKey = 'Content-Type';
const contentTypeValue = /json/;
const httpSuccess = 200;
const baseRoute = "/api/tags";

const tagResponse = {
    _id: expect.any(String),
    name: expect.any(String),
    tag_id: expect.any(Number),
    description: expect.any(String),
    is_nsfw: expect.any(Boolean),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    is_active: expect.any(Boolean),
}

describe('INTEGRATION - Tag Module', () => {

    beforeAll(async () => {
        jest.clearAllMocks();
    });

    beforeEach(async () => {
        await loadDatabase(Config.db.uri);
    });

    test('GET /api/tags - should return all the tags', async () => {
        await request(app)
            .get(baseRoute)
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => {
                for (const item of response.body) {
                    expect(item).toMatchObject(tagResponse);
                }
            })
    });

    test("GET /api/tags/1 - should return the first tag", async () => {
        await request(app)
            .get(baseRoute + "/1")
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => {
                expect(response.body).toMatchObject(tagResponse);
                expect(response.body.tag_id).toEqual(1);
                expect(response.body.name).toEqual("Waifu");
                expect(response.body.description).toEqual("A simple anime character");
                expect(response.body.is_nsfw).toEqual(false);
            })
    });
})