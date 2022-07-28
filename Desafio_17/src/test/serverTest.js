import { assert ,expect, should } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const url = "http://localhost:8080"


describe('Return productos', ()=>{

    it('should return all products', (done)=>{
        chai
            .request(url)
            .get('/productos')
            .end((err, res) => {
                console.log(res.body);
                expect(res).to.have.status(200)
                done();
        });

    });

});


describe('Return productos by ID', ()=>{

    it('should return all products', (done)=>{
        chai
            .request(url)
            .get('/productos/12')
            .end((err, res) => {
                console.log(res.body);
                expect(res).to.have.status(200)
                done();
        });

    });

});



describe('Post a new product:', ()=>{

    it('should return the product saved', (done)=>{
        chai
            .request(url)
            .post('/productos/producto')
            .send({
                producto: 'goma de borrar',
                precio: 12,
                foto: 'https://cdn1.iconfinder.com/data/icons/school-outline-icons/76/School_01-Converted_22-159.png'
            })
            .end((err, res) => {
                console.log(res.body);
                expect(res).to.have.status(201)
                done();
        });

    });

});