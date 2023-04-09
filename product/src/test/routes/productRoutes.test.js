import app from '../../app.js'
import request from 'supertest'
import mongoose from 'mongoose'


beforeEach(async () => {
    await mongoose.connect('mongodb://admin:secret@127.0.0.1:27017/ecomm-product?authSource=admin')
})

afterEach(async () => {
    await mongoose.connection.close();
})

describe('GET em /produto', () => {
    it('Deve retornar um lista de produtos', async () => {
        const resposta = await request(app)
            .get('/products')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
        
        expect(resposta.body[0].nomeProduto).toEqual('Notebook Samsung')
    })
})

describe('GET em tal /produto', () => {
    it('Deve retornar um produto', async () => {
        const resposta = await request(app)
            .get('/products/64027fbe3bc2c82509bf2f55')
            .expect(200);
        
        expect(resposta.body.nomeProduto).toEqual('Notebook Samsung')
    })
})

describe('POST em /produto', () => {
    it('Deve inserir tal produto', async () => {
        await request(app)
            .post('/products')
            .send({
                "nomeProduto": "carro",
                "descricaoProduto": "carro",
                "slug": "carro-carro",
                "precoUnitario": 120230,
                "quantidadeEmEstoque": 2,
                "categoria": "6402acb606e58bad63804832"
            })
            .expect(201);
    })
})

describe('PUT em /produto/id', () => {
    it('Deve atualizar tal produto', async() => {
        await request(app)
            .put('/products/64027fbe3bc2c82509bf2f5a')
            .send({
                "nomeProduto": 'mudei',
                "descricaoProduto": "renzo",
                "slug": "renzo-renzo",
                "precoUnitario": 120230,
                "quantidadeEmEstoque": 3,
                "categoria": "6402a00f28e06e9ce6b4f0a7"
            })
            .expect(200)
    })
})

describe('DELETE em /produto', () => {
    it('Deve deletar tal produto', async () => {
        await request(app)
            .delete('/products/6402acb606e58bad63804832')
            .expect(200);
    })
})