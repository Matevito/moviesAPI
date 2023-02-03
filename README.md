# Prueba técnica [desarrollador backend]

Esta aplicación consiste en una API REST que gestiona datos entre usuarios, películas y sus correspondientes categorías. La aplicatión esta desarrollada en **Typescript** usando el framework **Express.js** y utiliza **PostsgreSQL** como base de datos. Para realizar las conexiones con la base de datos se utilizo la libreria **pg**. Tambien se utilizaron bibliotecas como **bcryptjs** para encriptar las contraseñas de los usuarios, **jsonwebtoken** para lidiar con la autorizacion de los usuarios y **express-validator** para lidiar con los formularios para añadir elementos en la base de datos.

El proyecto utiliza **MVC** (Modelo-Vista-Controlador) como el modelo de arquitectura al desarrollar esta prueba tecnica. En la carpeta de [/database](./src/database) se encuentran todos los script SQL utilizados por la aplicación. En la carpeta [/services](./src/services) se encuentran acoplados todas las funciones que utilizan esos queries para realizar peticiones a la base de datos.

![Esquema modelo  de la base de datos](./DATABASE_MODEL.png)

## Enlaces a demo de la aplicación

- La API se encuentra desplegada en el siguiente enlace: https://moviesapi-production-ed6a.up.railway.app/api/v1/.

- La documentacion sobre cada una de las distintas rutas la pueden encontrar [aca](https://documenter.getpostman.com/view/17244389/2s935mtQnJ#266000c6-3d35-49e3-9c97-bda9ea08a769).

Si se desea montar la aplicacioń en local solo es necesario copiar este repositorio. Asegurarse de poseer Node.js, en lo posible una versión de 18 para arriba y crear un archivo _.env_ donde almacenar las distintas variables de entorno. Se puede utilizar el esquema de este archivo ubicado [aca](/.example.env)

# CUESTIONARIO

## 1. ¿Cuál es el propósito de "module.exports"?

El proposito de 'module.exports' en Javascript consiste en poder exportar funciones, valores y demas tipos de datos a otros archivos.
Es una funcionalidad importante porque permite modularizar proyectos de desarrollo en diferentes archivos diferentes en lugar de uno solo. Las ventajas de esto son multiples: **1)** trabajar en el codigo es más sencillo porque se puede conseguir que cada parte del codigo haga una sola cosa; **2)** evita posibles conflictos trabajando en equipo si dos o más miembros diferentes trabajan en el mismo documento;**3)** permite separar la lógica del proyecto eliminando una importante capa de abstracción.

## 2. ¿Qué es un middleware?

Un middleware es una función que se ejecuta previo a otro componente y cuya funcion es manejar el flujo de la información o detener el flujo de la aplicación de inmediato, de ser necesario. Por ejemplo, antes de que el formulario de autenticación de un usuario llegue al controlador de una API puede haber un middleware que verifique que la información suministrada es realmente de tipo que se pide y que este completa.

En el presente proyecto [utilize un middleware](./src/middlewares/verifyToken.ts) para lidiar tanto con la autenticación de los usuarios como para gestionar la información del usuario autenticado que ingrese a la plataforma. Esto ultimo fue util al establecer una pelicula como vista ya que se requiere, para esto, saber exactamente cuál fue el usuario que realizo este procedimiento. Y si la información del usuario se brinda por medio de un parametro, query o en el cuerpo de la petición esto seria ciertamente inseguro porque no se tiene certeza de que el usuario que realizo la petición es quien dice ser.

## 3. ¿Cual es la diferencia entre código bloqueante y código no bloqueante?

Es la primera vez que escucho de _código bloqueante y código no bloqueante_. Aunque tengo la impresión de que esta pregunta se refiere a la diferencia entre código sincronico y asincronico.
El codigo sincronico es aquel que no puede realizar tareas en segundo plano mientras ejecuta una tarea, el codigo asincronico, como es de preveer, si permite este tipo de funcionalidades de ejecutar tareas en segundo plano mientras se encuentran ejecutando otras.

Tiene sentido que en una plataforma que procese gran cantidad de usuarios que se opte por codigo asincronico porque el codigo sincronico, o bloqueante, ocaciona cuellos de botella que afectan el rendimiento de la aplicación de la que hagan parte.

## 4. ¿Qué biblioteca de javascript usaría para manejar datos en tiempo real?

Si entendemos por manejar datos en tiempo real que el usuario de una aplicación tenga acceso a información por parte del servidor sin necesidad de estar realizando peticiones a este, entonces utilizaria websockets. Esta tecnologia permite establecer una linea de conexión bidireccional entre usuario y servidor lo que permite que el servidor envie información al usuario sinque este se lo pide, como sucede en el protocolo HTTP.

Hablando de bibliotecas en especifico, probablemente me decantaria por Socket.io ya que la he utilizado previamente y se que posee un gran soporte y documentación por parte de sus desarrolladores.

# PLUS

## 5. ¿Cual es la principal ventaja de trabajar un proyecto dockerizado?

No he utilizado previamente Docker, pero en mi conocimiento de la herramienta se puede crear un entorno de trabajo para un equipo y que con esto no hayan conflictos por que los miembros posean diferentes versiones de lenguajes, librerias, etc.
