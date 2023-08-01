const { createUser, getUsers, getUserById, updateUser } = require('./Users');

describe('Creating Users', ()=>{
    it.only("Sholdn't create a User without passing a name", async ()=>{
      const req = {
        body: {
          name: "",
          tags: "ghgfvkj876",
          matricula: "202010311",
          disciplinaOUcargo: "cordenador",
          email: "admin@gmil.com",
          password: "abc@123",
          confPassword: "abc@123",
          role: "admin",
        },
      };
      const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      };
      await createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it.only("Sholdn't create a User without passing a 'matricula'", async ()=>{
      const req = {
        body: {
          name: "abc",
          tags: "ghgfvkj876",
          matricula: "",
          disciplinaOUcargo: "cordenador",
          email: "admin@gmil.com",
          password: "abc@123",
          confPassword: "abc@123",
          role: "admin",
        },
      };
      const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      };
      await createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing a 'disciplinaOUcargo'", async ()=>{
      const req = {
        body: {
          name: "abc",
          tags: "ghgfvkj876",
          matricula: "202010311",
          disciplinaOUcargo: "",
          email: "admin@gmil.com",
          password: "abc@123",
          confPassword: "abc@123",
          role: "admin",
        },
      };
      const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      };
      await createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing a 'email'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "",
              password: "abc@123",
              confPassword: "abc@123",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing a 'password'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "",
              confPassword: "abc@123",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing a 'confPassword'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "abc@123",
              confPassword: "",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User passing a 'confPassword' diferent from 'password'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "abc@123",
              confPassword: "123@abc",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing neither 'password' neither 'confPassword'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "",
              confPassword: "",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Sholdn't create a User without passing a 'role'", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "abc@123",
              confPassword: "abc@123",
              role: "",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    }); 
    it.only("Shold create a admin User", async ()=>{
        const req = {
            body: {
              name: "abc",
              tags: "ghgfvkj876",
              matricula: "202010311",
              disciplinaOUcargo: "cordenador",
              email: "admin@gmil.com",
              password: "abc@123",
              confPassword: "abc@123",
              role: "admin",
            },
          };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
    }); 
});

describe('Find Users', ()=>{
  it.only('get all users', async()=>{
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getUsers({}, res);   
    expect(res.status).toHaveBeenCalledWith(200);
    console.log(res.json);    
  });
  it.only('get user by id', async()=>{
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getUserById({params:{id:'1'}}, res);   
    expect(res.status).toHaveBeenCalledWith(200);
  });
});