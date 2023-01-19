import mongoose from 'mongoose'

const OrganizationSchema = new mongoose.Schema(
    {
        orgName: { type: String, required: true },
        benefits: { type: String, required: true}
    },
    { timestamps: true }
)

const Organization = mongoose.model('Organization', OrganizationSchema)
export default Organization
