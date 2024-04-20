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
                        sh 'sudo apt update && sudo apt install -y npm'
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
                        sh 'npm run build'
                    } catch (err) {
                        echo "Error occurred during build: ${err}"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}
