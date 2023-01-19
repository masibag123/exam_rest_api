import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema(
    {
         firstName: { type: String, required: true },
         middleName: { type: String, required: true},
         lastName: { type: String, required: true},
         suffix: { type: String, required: false},
         email: { type: String, required: true, unique: true },
         password: { type: String, required: true}
    },
    { timestamps: true }
)

const Member = mongoose.model('Member', MemberSchema)
export default Member
