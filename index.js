import express from 'express' 
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import memberRoutes from './routes/members.js'
import organizationRoutes from './routes/organizations.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

/*routes*/
app.use('/auth', authRoutes)
app.use('/members', memberRoutes)
app.use('/organizations', organizationRoutes)

/*connect to database*/
const PORT = process.env.PORT || 3001
mongoose.connect(process.env.MONGO_URL, {
    dbName: 'org_api'
})
.then(() => app.listen(PORT, () => console.log('Server listening on ${PORT}')))
.catch((error) => console.log('${error} did not connect'))
