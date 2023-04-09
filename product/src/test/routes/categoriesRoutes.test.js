import app from '../../app.js'
import request from 'supertest'
import mongoose from 'mongoose'


beforeEach(async () => {
    await mongoose.connect('mongodb://admin:secret@127.0.0.1:27017/ecomm-product?authSource=admin')
})

afterEach(async () => {
    await mongoose.connection.close();
})


describe('GET em /categoria', () => {
    it('Deve retornar um lista de categorias', async () => {
        const resposta = await request(app)
            .get('/categories')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);
        
        expect(resposta.body[0].nomeCategoria).toEqual('INFORMÁTICA')
    })
})
describe('GET em /categoria/id', () => {
    it('Deve retornar um lista de categorias', async () => {
        const resposta = await request(app)
            .get('/categories/6402a00f28e06e9ce6b4f0a1')
            .expect(200);
        
        expect(resposta.body.nomeCategoria).toEqual('BELEZA')
    })
})

describe('POST em /categoria', () => {
    it('Deve inserir tal categoria', async () => {
        await request(app)
            .post('/categories')
            .send({
                "nomeCategoria": "carro",
                "descricaoCategoria": "carro",
            })
            .expect(201);
    })
})

describe('PUT em /categoria/id', () => {
    it('Deve atualizar tal categoria', async() => {
        await request(app)
            .put('/categories/64027fbe3bc2c82509bf2f5a')
            .send({
                "nomeCategoria": 'renzo',
                "descricaoCategoria": "renzo",
            })
            .expect(200)
    })
})

describe('PATCH em /categoria/id', () => {
    it('Deve atualizar tal categoria', async() => {
        await request(app)
            .put('/categories/64027fbe3bc2c82509bf2f5a')
            .send({
                "nomeCategoria": 'renzoPatch',
                "descricaoCategoria": "renzoPatch",
            })
            .expect(200)
    })
})

describe('DELETE em /categoria', () => {
    it('Deve deletar tal categoria', async () => {
        await request(app)
            .delete('/categories/6402acb606e58bad63804832')
            .expect(200);
    })
})