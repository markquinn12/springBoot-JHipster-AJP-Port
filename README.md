# springBoot-JHipster-AJP-Port
Example of how to open an AJP port in a spring boot (tomcat) angular webapp

##The problem:
I needed to correctly redirect traffic from a proxy machine to a machine which was running my webapp. The communication needed to be over https so an AJP port needed to be opened on the web server.

"The Apache JServ Protocol (AJP) is a binary protocol that can proxy inbound requests from a web server through to an application server that sits behind the web server. It also supports some monitoring in that the web server can ping the application server."

##The Solution:
The project which I have checked in is an out of the box [JHipster](https://jhipster.github.io/) application. JHipster comes bundled with a Spring boot webserver which uses Tomcat by default. I had to make a few changes to configure Spring boot to open the AJP port.

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

##Code changes:
To open the AJP port on port 8008 there was very little changes that needed to be made.

Firstly in the [application.yml](/src/main/resources/config/application.yml) file I added 

```yml
tomcatAjp:
    port: 8008
    remoteauthentication: false
    enabled: true   
    protocol: AJP/1.3
    scheme: http
```

And then in the [Application.java](/src/main/java/mark/quinn/Application.java) file we inject the properties defined above:

```java
@Value("${tomcatAjp.protocol}")
String ajpProtocol;
    
@Value("${tomcatAjp.port}")
String ajpPort;

@Value("${tomcatAjp.enabled}")
String ajpEnabled;     
    
@Value("${tomcatAjp.scheme}")
String ajpScheme;
```    
  
And then in the same [Application.java](/src/main/java/mark/quinn/Application.java) file I created a servlet factory bean using the injected properties.
    
```java
@Bean
public EmbeddedServletContainerFactory servletContainer() 
{
   Integer ajpPortInt = Integer.parseInt(ajpPort);
   Boolean ajpEnabledBool = Boolean.valueOf(ajpEnabled);    
    
    TomcatEmbeddedServletContainerFactory tomcat = new TomcatEmbeddedServletContainerFactory();
    if (ajpEnabledBool)
    {
        Connector ajpConnector = new Connector(ajpProtocol);
        ajpConnector.setProtocol(ajpProtocol);
        ajpConnector.setPort(ajpPortInt);
        ajpConnector.setSecure(false);
        ajpConnector.setAllowTrace(false);
        ajpConnector.setScheme(ajpScheme);
        tomcat.addAdditionalTomcatConnectors(ajpConnector);
    }
    
    return tomcat;
}
```   

A few imports are also needed.

```java
import org.apache.catalina.connector.Connector;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
```   

