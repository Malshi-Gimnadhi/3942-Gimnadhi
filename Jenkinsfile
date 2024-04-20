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

