import { loadDatabase } from "../../app/db";
import Config from "../../app/config/config";
import { app } from "../../app/main";

import request from 'supertest';
import { Response } from 'supertest';
import { Server } from 'http';


const baseRoute = '/api/images';
const contentTypeKey = 'Content-Type';
const contentTypeValue = /json/;
const httpSuccess = 200;

const image = {
    id: expect.any(String),
    url: expect.any(String),
    is_nsfw: expect.any(Boolean),
    tag: {
        name: expect.any(String),
        tag_id: expect.any(Number),
        description: expect.any(String),
        is_nsfw: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        is_active: expect.any(Boolean)
    }
}

describe('Images Module', () => {

    let server: Server;

    beforeAll(async () => {
        jest.resetModules();
    });

    beforeEach(async () => {
        server = app.listen(Config.app.port);
        await loadDatabase(Config.db.uri);
    })

    test('GET /api/images - when asking for an image should return a random one', async () => {
        await request(app)
            .get(baseRoute)
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => expectImage(response));
    });

    test('GET /api/images?size=2 - when asking for 2 images should return an array of 2 images', async () => {
        await request(app)
            .get(baseRoute)
            .query({ size: 2 })
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array);
                expect(response.body).toHaveLength(2);

                for (const item of response.body) {
                    expect(item).toBeTruthy();
                    expect(item).toMatchObject(image);
                }
            })
    });

    test('GET /api/images?size=3&tag_id=2 - when asking for a tag_id should return that one', async () => {
        await request(app)
            .get(baseRoute)
            .query({ size: 3 })
            .query({ tag_id: 2 })
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array);
                expect(response.body).toHaveLength(3);

                for (const item of response.body) {
                    expect(item.tag).toMatchObject({ tag_id: 2 })
                    expect(item.tag.name).toEqual('Neko')
                    expect(item.tag.description).toEqual('A cat appear character');
                }
            })
    });

    test("GET /api/images/all - when asking for all images should return an array of images", async () => {
        await request(app)
            .get(`${baseRoute}/all`)
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array);
                expect(response.body.length).toBeGreaterThan(20); // Database has more than 10 images

                for (const item of response.body) {
                    expect(item).toBeTruthy();
                    expect(item).toMatchObject(image);
                }
            })
    });

    test("GET /api/images/all?tag_id=3 - when asking for all images with a tag_id should return an array of images", async () => {
        await request(app)
            .get(`${baseRoute}/all`)
            .query({ tag_id: 3 })
            .expect(contentTypeKey, contentTypeValue)
            .expect(httpSuccess)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array);
                expect(response.body.length).toBeGreaterThan(5);

                for (const item of response.body) {
                    expect(item).toBeTruthy();
                    expect(item.tag).toMatchObject({ tag_id: 3 })
                    expect(item.tag.name).toEqual('Happy')
                    expect(item.tag.description).toEqual('A happy character smiling');
                }
            })
    });

    afterEach(() => {
        server.close();
    })

})

function expectImage(response: Response) {
    expect(response.body).toBeTruthy();
    expect(response.body).toMatchObject(image);
}