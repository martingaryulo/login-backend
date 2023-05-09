# Despliegue login page RedHat SSO
#### Necesidad del cliente
Creacion de un login page para acceder a las aplicaciones consumiendo los servicios de SSO y 3scale.

#### Implementacion tecnica
Se crea un backend en Express y un frontend en html con scriplet en Javascript

#### Procedimiento
##### **Pre-requisitos**
- Red Hat SSO, 3scale apimanager y apicast desplegados.
- Acceso a dichas plataformas como administrador
- Crear un namespace para nuestra aplicacion.

##### **Pasos a seguir**
1) Crea runa nueva aplicación con S2i de Node.js con el siguiente comando oc new-app. Se debera reemplazar con el repositorio desde donde se tomaran los archivos para el despliegue
    ```sh
    oc new-app nodeshift/ubi8-s2i-nodejs:latest~https://github.com/your-repo/your-backend.git --name=your-backend
    ```
2) Exponer una ruta para el servicio de backend para que se pueda acceder desde el frontend. usando el comando oc expose, ree
    ```sh
    oc expose svc/your-backend
    ```
    
3) Cree una nueva aplicación con la imagen del constructor de Nginx utlizando el comando oc new-app. 
    ```sh
    oc new-app nginx:latest~https://github.com/your-repo/your-frontend.git --name=your-frontend
    ```

4) Exponga una ruta para su servicio frontend para que se pueda acceder desde Internet usando el comando oc expose.
    ```sh
    oc expose svc/your-frontend --hostname=your-hostname.com
    ```
5) Configure el servicio backend para usar el servicio Red Hat SSO 7.6. Puede hacerlo configurando las variables de entorno adecuadas en la configuracion del backend del deployment.

    ```sh
    oc set env dc/your-backend \  
        SSO_HOST=your-sso-host \
        SSO_REALM=your-sso-realm \
        SSO_CLIENT_ID=your-sso-client-id \
        SSO_CLIENT_SECRET=your-sso-client-secret 
    ```


6) Verifique que su aplicación de front-end pueda acceder al servicio de back-end haciendo una solicitud a la URL de back-end. Por ejemplo:

    ```sh
    fetch('/your-backend/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/
    body: JSON.stringify({ username: 'your-username', password: '
    .then(response => response.
    .then(
    // Handle the API 
    console.
    .catch(
    // Handle any 
    console.error(
        
    });
    ```


#### Descripcion de archivos.
| File | Descripcion |
| ------ | ------ |
| backend/app.js | Código del backend|
| frontend/index.html | Código del frontend |
| frontend/css/index.css | Hoja de estilos para el frontend |
