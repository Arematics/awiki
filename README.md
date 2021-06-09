# awiki
Arematics self-developed modern wiki system

## Setup

### Keycloak
For the setup you need a self-developed Keycloak instance. Read more about it here: https://hub.docker.com/r/jboss/keycloak/
If you don't want to create your own authentication system, you can request the Arematics authentication system for your REST backend.
You will receive your own authentication client information from us.

(Using the Arematics Rest backend specified in the [Angular Prod Environment File](awiki-frontend/src/environments/environment.prod.ts) will restrict your wiki to our codebase.
We will also not give you access to POST resources there, so you won't be able to use the admin console.)

### RESTful backend
You will also need to set up the Spring backend using Docker. The Gradle task "bootBuildImage" will generate your Docker image.

### Frontend
First of all modify your [Angular Prod Environment File](awiki-frontend/src/environments/environment.prod.ts). You need to define your RESTful Backend Link and all the data for your keycloak client.

Build your Angular frontend using the command "ng build --prod --output-hashing=all" and deploy it to the specified html path on your web server.
