import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RemovePasswordInterceptor } from './auth/remove-password.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new RemovePasswordInterceptor());
  const config = new DocumentBuilder()
    .setTitle('EMINANCE Machine Coding')
    .setDescription(
      `
    Task Description:
    - implement one signup API for user registration(with just username and password), should store the data in the DB
    - should check for user name duplication
    - implement hashing for password
  
    - implement one login API, should verify the given credentials with the one in DB, proceed accordingly.

    - only logged in users should be able to visit this page. 
    - implement one products API(with get method), which should fetch data from the given("https://dummyjson.com/products") external API and return to the client.
    
    - (optional) Logout functionality
    - (Optional) JWT authentication, so only the authenticated users allowed to the request the products data.
    - Summary:
    - should use ReactJS in the frontend, NodeJS with Express and MongoDB in the backend.
    - API's: 1. Registration, 2. Login, 3. Logout(optional), and 4. products API, with proper middleware wherever possible.
    - Client application should look as in the design, additional styling is upto the candidate. And make it responsive*.
    - (optional) JWT authentication.
    - Use either local MongoDB or Mongo Atlas, whichever is comfirtable.
    - Provide proper Readme.md file, describing how to setup and run the project.
    - We are expecting a production quality implementation. 
  
  External API: \n
    url: "https://dummyjson.com/products"
    method: GET
    `,
    )
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Products')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = 3001;
  await app.listen(port, () => {
    console.log(`Server started running on port => ${port}`);
  });
}
bootstrap();
