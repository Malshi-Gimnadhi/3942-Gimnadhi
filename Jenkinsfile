pipeline {
    agent any

    environment {
        // Define environment variables if needed
        PATH = "/usr/local/bin:$PATH" // Ensure npm is accessible
        HOME = "${WORKSPACE}" // Set the home directory
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Test") {
            steps {
                script {
                    // Install npm dependencies
                    sh 'npm install'

                    // Run npm test
                    sh 'npm test'
                }
            }
        }

        stage("Build") {
            steps {
                script {
                    // Run npm build
                    sh 'npm run build'
                }
            }
        }
    }
}

