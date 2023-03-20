const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GEt User
router.get("/users/:id", async (request, response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: request.params.id}
        });
        response.status(201).send({user});
    }
    catch(error) {
        response.status(500).send(error.message);
    }
});

router.get("/users", async (request, response) => {
    try {
        const users = await prisma.user.findMany();
        response.status(201).send({users});
    }
    catch(error) {
        response.status(500).send(error.message);
    }
});

// Update User via ID
router.patch("/users/:id", async (request, response) => {
    try {
        const user = prisma.user.update({
            where: {id: request.params.id},
            data: request.body
        });
        response.status(201).send({user});
    }
    catch(error) {
        response.status(500).send(error.message);
    }
});

// Create User
router.post("/users", async (request, response) => {
    try {
        const user = await prisma.user.create({
            data: request.body
        });
        response.status(201).send({user});
    }
    catch(error) {
        response.status(500).send(error.message);
    }
});


// Delete User via id
router.delete("/users/:id", async (request, response) =>{
    try {
        const deletedUser = prisma.user.delete({
            where: {id: request.params}
        });
        response.status(201).send({deletedUser})
    } 
    catch(error) {
        response.status(500).send(error.message);
    }
});

module.exports = router;