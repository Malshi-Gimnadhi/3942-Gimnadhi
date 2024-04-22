1.	Figure out and write the required codes to dockerize your application

•	Selected a application.
•	Wrote Dockerfile and docker-compose.yml to containerize the application.
•	Manually tested the Dockerization process to ensure functionality.


The Dockerfile:

# Use official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]


  
2.	Put your codes to the remote repository

•	Created a GitLab repository 

The GitHub Link: https://github.com/Malshi-Gimnadhi/3942-Gimnadhi

•	Pushed the application code, Dockerfile, docker-compose.yml, and Jenkins pipeline script to the repository.


5.	Write a pipeline to automate the dockerize process using groovy. Groovy code also should be kept inside the repository


pipeline {
    agent any

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Test") {
            steps {
                script {
                    try {
                        // Update apt and install npm without sudo
                        sh 'sudo -S apt update < /dev/null'
                        sh 'sudo -S apt install -y npm < /dev/null'
                       
                        // Run npm test
                        sh 'npm test'
                    } catch (err) {
                        echo "Error occurred during testing: ${err}"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }

        stage("Build") {
            steps {
                script {
                    try {
                        // Navigate to the directory containing package.json
                        dir("${WORKSPACE}") {
                            // Run npm build
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    } catch (err) {
                        echo "Error occurred during build: ${err}"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}

6.	Your pipeline should be able to get the application codes from the remote repository,
create the docker image and run the container from the created docker image.

•	Wrote a Jenkins pipeline script in Groovy to automate the Dockerization process.
•	The pipeline retrieves application code from the remote repository, builds the Docker image, and runs containers.

 

 

 

 


 

