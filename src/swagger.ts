import swaggerJSDoc from "swagger-jsdoc";
import path from 'path'

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Documentación Challange Esto Es',
            version: '1.0.0'
        },
    },
    apis: [`${path.join(__dirname, './routes/*')}`]
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec