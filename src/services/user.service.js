import prisma from "../config/prisma.config.js";

export const getUserBy = async(colum, value) => {
    return await prisma.user.findUnique({ where : {[colum] : value}})
}

export const createUser = async(userData) => {
    return await  prisma.user.create({data : userData})
}
