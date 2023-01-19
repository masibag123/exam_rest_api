import Organization from '../models/Organization.js'

export const getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find()
        if (organizations.length !==0)
            res.status(200).json(organizations)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getOrganization = async (req, res) => {
    try {
        const { id } = req.params
        const organization = await Organization.findById(id)
        if (organization)
            res.status(200).json(organization)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addOrganization = async (req, res) => {
    try {
        const { orgName, benefits } = req.body
        const newOrganization = await Organization.create({
          orgName,
          benefits
        })
        const savedOrganization = await newOrganization.save()
        res.status(201).json({ id: savedOrganization._id})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteOrganization = async (req, res) => {
    try {
        await Organization.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateOrganization = async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const { orgName, benefits } = req.body
        const update = {
            orgName: orgName,
            benefits: benefits
        }
      
        await Organization.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
      console.log(err)
      res.status(404).json({ error: err.message })
    }
}
