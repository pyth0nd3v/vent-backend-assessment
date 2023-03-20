const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// GET Tenant via ID
router.get("/tenant/:id", async (request, res) => {
    try {
        const tenant = await prisma.tenant.findUnique({
            where: {id: request.params.id}
        });
        res.status(200).send({tenant});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

// Update Tenant using DI
router.patch("/tenant/:id", async (request, res) => {
    try {
        const tenant = await prisma.tenant.update({
            where: {id: request.params.id},
            data: request.body
        });
        res.status(200).send({tenant});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});


// Create Tenant
router.post("/tenant", async (request, res) => {
    try {
        const tenant = await prisma.tenant.create({
            data: request.body
        });
        res.status(200).send({tenant});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get("/tenant", async (request, res) => {
    try {
        const tenants = await prisma.tenant.findMany();
        res.status(200).send({tenants});
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

// Delete Tenant using ID
router.delete("/tenant/:id", async (request, res) =>{
    try {
        const deletedtenant = await prisma.tenant.delete({
            where: {id: request.params.id}
        });
        res.status(200).send({deletedtenant})
    } 
    catch(error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
