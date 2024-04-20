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
                    // Install npm if it's not already installed
                    sh 'sudo apt update && sudo apt install -y npm'

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
