import express from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './swagger'
import appRoutes from './routes/app.routes'

const app = express()

app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

const PORT = 3000

app.use('/', appRoutes); 
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.listen(PORT, () => {
    console.log('Server on port http://localhost:3000')
})