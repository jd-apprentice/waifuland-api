export const image = {
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
};

const defaultSize = 1;
const defaultId = '1';
const defaultUrl = 'https://www.example.com/image.jpg';
const defaultNsfw = false;
const defaultTag = {
    name: 'tag',
    tag_id: 1,
    description: 'description',
    is_nsfw: false,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    is_active: true
};

const defaultImage = {
    id: defaultId,
    url: defaultUrl,
    is_nsfw: defaultNsfw,
    tag: defaultTag
};

export const getImageMock = jest.fn((args = {
    size: defaultSize,
    tag_id: defaultTag.tag_id
}) => {

    let response = Array.from({ length: args.size }, () => defaultImage);

    if (args.tag_id) {
        response = response.map((image) => {
            return {
                ...image,
                tag: {
                    ...image.tag,
                    tag_id: args.tag_id,
                    name: expect.any(String),
                    description: expect.any(String)
                }
            };
        });
    };

    return args.size === 1 ? response[0] : response;
});