import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Member from '../models/Member.js'

export const register = async (req, res) => {
    try { 
        const { firstName, middleName, lastName, suffix, email, password } = req.body
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(password, salt)
        const newMember = await Member.create({
            firstName,
            middleName,
            lastName,
            suffix,
            email,
            password: encryptedPassword
        })
        const savedMember = await newMember.save()
        res.status(201).json(savedMember)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        
        const member = await Member.findOne({
          email: email
        })
        
        if (!member) return res.status(400).json({msg: 'invalid email/password'})
        
        const isPasswordValid = await bcryptjs.compare(password, member.password)
        
        if (isPasswordValid) {
            const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET)
            member.password = '***'
            res.status(200).json({token, member})
        } else {
            res.status(400).json({msg: 'invalid credentials'})
        }
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}
