import db from "../models";
const { Op, where } = require("sequelize");
import { v4 as generateId } from "uuid";
import generateCode from "../ultis/generateCode";
import moment from "moment";
import generateDate from "../ultis/generateDate";

export const getPostsService = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Post.findAll({
                raw: true,
                nest: true,
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: [
                            "price",
                            "acreage",
                            "published",
                            "hashtag",
                        ],
                    },
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["name", "zalo", "phone"],
                    },
                ],
                attributes: ["id", "title", "star", "address", "description"],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Getting posts is failed.",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });
export const getPostsLimitService = (
    page,
    query,
    { priceNumber, areaNumber }
) =>
    new Promise(async (resolve, reject) => {
        try {
            let offset = !page || +page <= 1 ? 0 : +page - 1;
            const queries = { ...query };
            if (priceNumber)
                queries.priceNumber = { [Op.between]: priceNumber };
            if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber };
            const response = await db.Post.findAndCountAll({
                where: queries,
                raw: true,
                nest: true,
                offset: offset * +process.env.LIMIT,
                order: [["createdAt", "DESC"]],
                limit: +process.env.LIMIT,
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: [
                            "price",
                            "acreage",
                            "published",
                            "hashtag",
                        ],
                    },
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["name", "zalo", "phone"],
                    },
                ],
                attributes: ["id", "title", "star", "address", "description"],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Getting posts is failed.",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });

export const getNewPostService = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Post.findAll({
                raw: true,
                nest: true,
                offset: 0,
                order: [["createdAt", "DESC"]],
                limit: +process.env.LIMIT,
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: [
                            "price",
                            "acreage",
                            "published",
                            "hashtag",
                        ],
                    },
                ],
                attributes: ["id", "title", "star", "createdAt"],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Getting posts is failed.",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });

export const createNewPostService = (body, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const attributesId = generateId();
            const imagesId = generateId();
            const overviewId = generateId();
            const labelCode = generateCode(body?.label);
            const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
            const currentDate = generateDate();

            // Tạo ngày      hạn

            await db.Post.create({
                id: generateId(),
                title: body?.title,
                labelCode: labelCode,
                address: body?.address || "",
                attributesId,
                categoryCode: body?.categoryCode,
                description: JSON.stringify(body?.description) || "",
                userId,
                overviewId,
                imagesId,
                areaCode: body?.areaCode || "",
                priceCode: body?.priceCode || "",
                provinceCode: body?.province?.includes("Thành phố")
                    ? generateCode(body?.province?.replace("Thành phố ", ""))
                    : generateCode(body?.province?.replace("Tỉnh ", "")),
                priceNumber: body?.priceNumber,
                areaNumber: body?.areaNumber,
            });

            await db.Attribute.create({
                id: attributesId,
                price:
                    +body.priceNumber < 1
                        ? 1`${1 * 1000000} đồng/tháng`
                        : `${body.priceNumber} triệu/tháng`,
                acreage: `${body.areaNumber} m2`,
                published: moment().format("DD/MM/YYYY"),
                hashtag,
            });
            await db.Image.create({
                id: imagesId,
                image: JSON.stringify(body.images),
            });

            await db.Overview.create({
                id: overviewId,
                code: hashtag,
                area: body.label,
                type: body?.category,
                target: body?.target,
                bonus: "Tin thường",
                created: currentDate.today,
                expired: currentDate.expireDay,
            });

            await db.Province.findOrCreate({
                where: {
                    [Op.or]: [
                        { value: body?.province?.replace("Thành phố ", "") },
                        { value: body?.province?.replace("Tỉnh ", "") },
                    ],
                },
                defaults: {
                    code: body?.province?.includes("Thành phố")
                        ? generateCode(
                              body?.province?.replace("Thành phố ", "")
                          )
                        : generateCode(body?.province?.replace("Tỉnh ", "")),
                    value: body?.province?.includes("Thành phố")
                        ? body?.province?.replace("Thành phố ", "")
                        : generateCode(body?.province?.replace("Tỉnh ", "")),
                },
            });

            await db.Label.findOrCreate({
                where: {
                    code: labelCode,
                },
                defaults: {
                    code: labelCode,
                    value: body.label,
                },
            });

            resolve({
                err: 0,
                msg: "OK",
            });
        } catch (error) {
            reject(error);
        }
    });

export const getPostsLimitAdminService = (page, id, query) =>
    new Promise(async (resolve, reject) => {
        try {
            let offset = !page || +page <= 1 ? 0 : +page - 1;
            const queries = { ...query, userId: id };

            const response = await db.Post.findAndCountAll({
                where: queries,
                raw: true,
                nest: true,
                offset: offset * +process.env.LIMIT,
                order: [["createdAt", "DESC"]],
                limit: +process.env.LIMIT,
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: [
                            "price",
                            "acreage",
                            "published",
                            "hashtag",
                        ],
                    },
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["name", "zalo", "phone"],
                    },
                    { model: db.Overview, as: "overviews" },
                ],
                attributes: ["id", "title", "star", "address", "description"],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Getting posts is failed.",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });

export const getOneService = async (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Post.findOne({
                where: { id: id },
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: [
                            "price",
                            "acreage",
                            "published",
                            "hashtag",
                        ],
                    },
                ],
                // attributes: ["id", "title", "star", "createdAt"],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Getting posts is failed.",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });

export const deletePostSevice = async (id) =>
    new Promise(async (resolve, reject) => {
        try {
            // const post = await db.Post.findOne({
            //     where: { id: id },
            // });

            // await db.Attribute.destroy({
            //     where: {
            //         id: post.attributesId,
            //     },
            // });

            // await db.Overview.destroy({
            //     where: { id: post.overviewId },
            // });

            await db.Post.destroy({
                where: { id: id },
            });

            resolve({
                err: 0,
                msg: "Deleted",
            });
        } catch (error) {
            reject(error);
        }
    });

export const updatePostSevice = async (data) =>
    new Promise(async (resolve, reject) => {
        try {
            console.log("data >>> ", data);
            // console.log("data >>>", JSON.stringify(data.images));
            await db.Post.update(
                {
                    ...data,
                },
                {
                    where: { id: data.id },
                }
            );

            await db.Attribute.update(
                {
                    price:
                        +data.priceNumber < 1
                            ? 1`${1 * 1000000} đồng/tháng`
                            : `${data.priceNumber} triệu/tháng`,
                    acreage: `${data.areaNumber} m2`,
                    published: moment().format("DD/MM/YYYY"),
                },
                {
                    where: { id: data.attributesId },
                }
            );
            await db.Image.update(
                {
                    image: JSON.stringify(data.images),
                },
                {
                    where: {
                        id: data.imagesId,
                    },
                }
            );

            resolve({
                err: 0,
                msg: "Updated",
            });
        } catch (error) {
            reject(error);
        }
    });
