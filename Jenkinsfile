pipeline {
    agent any

    stages {

        stage('Test') {
            steps {
                echo 'Jenkinsfile is working'
            }
        }

        stage('Docker Check') {
            steps {
                sh 'docker version'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t frontend ./frontend'
            }
        }

    }
}