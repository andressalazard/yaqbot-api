# Use Alpine Linux light image
FROM alpine:latest

#Install shadow for password management
RUN apk add --no-cache shadow

#Create new user 'appuser'
RUN adduser -D -s /bin/bash appuser

#Set the init password
#password here is 'bdUs3cur3'
#change to a strong password in production
RUN echo 'appuser:bdUs3cur3' | chpasswd

#Set working directory
WORKDIR /home/appuser

#Change the current user to appuser
USER appuser

#Container entrance command line
CMD ["/bin/bash"]
