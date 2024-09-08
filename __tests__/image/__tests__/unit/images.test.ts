import { ImageProp } from "../../../../src/image/interfaces/image-interface";
import { getImageMock, image } from "./mocks/image";
import { jest, describe, test, beforeAll, expect } from "bun:test";

describe("UNIT - Images Module", () => {

    beforeAll(async () => {
        jest.clearAllMocks();
    });

    test('GET /api/images - when asking for an image should return a random one', async () => {
        const response = getImageMock({ size: 1 });
        expect(getImageMock).toHaveBeenCalledTimes(1);
        expect(response).toMatchObject(image);
    });

    test('GET /api/images?size=2 - when asking for 2 images should return an array of 2 images', async () => {
        const response = getImageMock({ size: 2 });
        expect(getImageMock).toHaveBeenCalledTimes(2);
        expect(response).toEqual([image, image]);
    });

    test('GET /api/images?size=1&tag_id=2 - when asking for a tag_id should return that one', async () => {
        const response = getImageMock({ size: 1, tag_id: 2 }) as ImageProp;
        expect(getImageMock).toHaveBeenCalledTimes(3);
        expect(response.tag.tag_id).toBe(2);
    });

    test("GET /api/images/all - when asking for all images should return an array of images", async () => {
        const response = getImageMock({ size: 4 }) as ImageProp[];
        expect(getImageMock).toHaveBeenCalledTimes(4);
        expect(response.length).toBe(4);
    });

});