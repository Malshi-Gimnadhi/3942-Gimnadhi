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
                    // Install npm if not already installed
                    sh 'sudo apt update'
                    sh 'sudo apt install -y npm'

                    // Run npm test
                    sh 'npm test'
                }
            }
        }

        stage("Build") {
            steps {
                script {
                    // Navigate to the directory containing package.json
                    dir("${WORKSPACE}") {
                        // Run npm build
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }
    }
}

