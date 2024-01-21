# 🎲 WAIFULAND-API

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/a1af9f77714c498282b102bfb0fd7bf3)](https://app.codacy.com/gh/jd-apprentice/waifuland-api/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

![WaifuLand](https://user-images.githubusercontent.com/68082746/155921172-311bb682-cfed-494f-89c5-371e22ac25a6.gif)

WaifuLand is a REST API that provides information about the anime world. It is a project that is still in development, but it is already functional.

## 🗒 About the project

- The project is a REST API which gives random waifu images, they are uploaded to cloudinary and their public url is stored in mongodb
- Learning throught documentation and breaking things
- Expect many bugs and errors in the code
- You are free to collaborate with the project or use it as you wish

## 🚧 Routes

- `GET` Grab a random image `api/images`
- `GET` Grab an array of random images `api/images?size=<Size>`
- `GET` Grab a random image `api/images?tag_id=<tag_id>`

## ✍️ Examples

```bash
$ curl https://waifuland.jonathan.com.ar/api/images -H "Accept: application/json"
$ curl https://waifuland.jonathan.com.ar/api/images\?size\=5\&tag_id\=1 -H "Accept: application/json"
```

## 📖 Status

- Want to see how the project is going? check this -> [Issue](https://github.com/jd-apprentice/waifuland-api/issues/3)

## 🌐 Can I use the api?

- Yes! is currently being hosted in DigitalOcean -> [Get waifu](https://waifuland.jonathan.com.ar/api/images)

## 📚 Stack

- Nodejs
- Express
- Typescript
- Multer
- Cloudinary
- Render
- Mongodb
- Mongoose

## 🏗️ Build the project locally

```
Fill the fields in the .env.example

# App port
PORT=

# Your mongodb uri
DB_HOST=

# Your secret hash for signing petitions
TOKEN=

# Your cloudinary information
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_SECRET=
CLOUDINARY_URL=

# Rollbar information
ROLLBAR_TOKEN=
ROLLBAR_ENVIRONMENT=

>> cp .env.example .env

>> npm install

>> npm run dev
```

## 🧱 Structure

- User enters the page
  ![Login](https://user-images.githubusercontent.com/68082746/164032923-64c5d286-e232-478f-b121-39d28b71b416.png)
- Once user is logged into the page
  ![Token](https://user-images.githubusercontent.com/68082746/164033037-6191489e-3561-46b3-a0c4-7324faf9abb7.png)

## 📁 Folders

```
📦src
┣ 📂app
┣ 📂common
┣ 📂image
┗ 📂user
┃ ┣ 📂dto
┃ ┣ 📂interfaces
┃ ┃ ┗ 📜user-interface.ts
┃ ┣ 📂schema
┃ ┃ ┗ 📜user-schema.ts
┃ ┣ 📜user-controller.ts
┃ ┣ 📜user-middleware.ts
┃ ┣ 📜user-repository.ts
┃ ┣ 📜user-routes.ts
┃ ┗ 📜user-service.ts
```

## 📝 License

This project is under the MIT license. See the [LICENSE](./LICENSE) for more information.

## 🤝 Contribute

- For more information, check the [CONTRIBUTE](./CONTRIBUTE.md) file

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://jonathan.com.ar/es"><img src="https://avatars.githubusercontent.com/u/68082746?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jonathan Dyallo</b></sub></a><br /><a href="https://github.com/jd-apprentice/waifuland-api/commits?author=jd-apprentice" title="Code">💻</a> <a href="https://github.com/jd-apprentice/waifuland-api/commits?author=jd-apprentice" title="Tests">⚠️</a> <a href="https://github.com/jd-apprentice/waifuland-api/commits?author=jd-apprentice" title="Documentation">📖</a> <a href="#maintenance-jd-apprentice" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
