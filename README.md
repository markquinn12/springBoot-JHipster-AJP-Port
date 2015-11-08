# springBoot-JHipster-AJP-Port
Example of how to open an AJP port in a spring boot (tomcat) angular webapp

##The problem:
I needed to correctly redirect traffic from a proxy machine to a machine which was running my webapp. The communication needed to be over https so an AJP port needed to be opened on the web server.

"The Apache JServ Protocol (AJP) is a binary protocol that can proxy inbound requests from a web server through to an application server that sits behind the web server. It also supports some monitoring in that the web server can ping the application server."

##The Solution:
The project which I have checked in is an out of the box JHipster [JHipster](https://jhipster.github.io/) application. JHipster comes bundled with a Spring boot webserver which uses Tomcat by default. I had to make a few changes to configure Spring boot to open the AJP port.

Full JHipster technology stack can he found [here] (https://jhipster.github.io/tech_stack.html)

####Pre-requisites
You must have the following installed: Maven, Java 8

choco install maven
choco install jdk8

####Optional
Maven takes care of eveything if you just want to build and run the application but if you want to change certain aspects then you will also need to install: Node.js, bower, grunt

choco install nodejs
npm install -g bower
npm install -g grunt-cli

##Building and running the application
Once cloned and everything installed you can navigate to the top level of the project on the command line and enter:

mvn clean install -DskipTests -Pprod

This will create a .jar file in the "target" folder. Navigate to the "target" folder and enter the command:

java -jar openajpport-0.0.1-SNAPSHOT.war --spring.profiles.active=prod

Now we have built and run our application in "prod" mode.

####Testing the application
We can then test that the AJP port is open by running the command:

telnet localhost 8008

The JHipster application will be available at: http://localhost:8080

Done!





