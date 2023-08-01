const { createSala } = require('./Salas');

describe('creating Salas', ()=>{
    it.only("shouldn't create a sala without passing a name", async()=>{
        const req = {
            body: {
                name: "",
                numero: "D25",
                status: "inativo",
                grupo: "informatica",
                userId: "1",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createSala(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});