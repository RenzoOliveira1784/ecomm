const database = require('../models/index.js')

function validationCvv(cvv) {
    let regex = /^\d..$/gm
    return regex.test(cvv)
}
function validationValue(value) {
    return value > 0 ? true : false
}

function validationDate (date) {
    let regex = /^\d{4}\-\d{2}$/gm
    return regex.test(date)
}

function validationNumbers (num) {
    let regex = /^\d{16}$/gm
    return regex.test(num)
}

class PaymentController {
    static async seeAllPayments (_req, res) {
        try {
            const allPayments = await database.Payments.findAll()
            return res.status(200).json(allPayments)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getPaymentById (req, res) {
        let { id } = req.params
        try{
            const pay = await database.Payments.findOne({
                attributes: ['id', 'value', 'name', 'number', 'expiration', 'status', 'createdAt', 'updatedAt'],
                where: {id: Number(id)}
            })
            
            return res.status(200).header({location: `/payments/${id}`}).json(pay)
        } catch (error) {
            res.status(500).json({message: `erro no getById ${error}`})
        }
    }

    static createPayment (req, res) {
        let pay = req.body
        if (!pay.status)
            pay.status = 'CREATED'
        if (validationNumbers(pay.number) == false) {
            res.status(400).send({message: `Number validation failed`})
        } else if (validationDate(pay.expiration) == false) {
            res.status(400).send({message: `Date validation failed`})
        } else if (validationValue(pay.value) == false) {
            res.status(400).send({message: `Value validation failed`})
        } else if (validationCvv(pay.cvv) == false) {
            res.status(400).send({message: `Cvv validation failed`})
        } else {
            try {
                database.Payments.create(pay)
                return res.status(201).json({message: `Created new payment ${pay.id, pay.status}`})
            } catch (error) {
                return res.status(500).json({message: `${error.message}`})
            }
        }
    }

    static async updatePaymentCancel (req, res) {
        let { id } = req.params
        let status1 = req.body
        
        try {
            const pay = await database.Payments.findOne({where: {id: id}})
            if (pay.status === "CREATED") {
                await database.Payments.update(status1, { where: {id: id}})
                return res.status(200).json({message: `Sucess Cancel`})
            }
            else {
                return res.status(400).json({message: `Payment status different than CREATED, action stopped`})
            }
        } catch (error){
            return res.status(500).json(error)
        }   
    }

    static async updatePaymentConfirm (req, res) {
        //clients data and order infos ----> invoice (nota fiscal)
        let { id } = req.params
        const all = req.body
        
        try {
            const pay = await database.Payments.findOne({where: {id: id}})
            if (pay.status === "CREATED") {
                await database.Payments.update({ status: "CONFIRMED" }, { where: {id: id}})
                let result = await database.Invoice.create({ all })
                return res.status(200).json({message: `Payment confirmed and invoice: ${result}`})
            }
            else {
                return res.status(400).json({message: `Payment status different than CREATED, action stopped`})
            }
        } catch (error){
            return res.status(500).json(error)
        }
    }

}

module.exports = PaymentController