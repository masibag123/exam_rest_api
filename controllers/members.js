import Member from '../models/Member.js'
import bcryptjs from 'bcryptjs'

export const getMembers = async (req, res) => {
    try {
        const members = await Member.find()
        if (members.length !==0)
            res.status(200).json(members)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getMember = async (req, res) => {
    try {
        const { id } = req.params
        const member = await Member.findById(id)
        if (member)
            res.status(200).json(member)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const deleteMember = async (req, res) => {
    try {
        await Member.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateMember = async (req, res) => {
    try {
        const filter = {_id: req.params.id }
        const { firstName, middleName, lastName, suffix, email, password } = req.body
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(password, salt)
        
        const update = {
            firstName,
            middleName,
            lastName,
            suffix,
            email,
            password: encryptedPassword
        }
      
        await Member.findOneAndUpdate(filter. update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}
