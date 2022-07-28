pipeline{
    agent{
        docker{
            image "node:14.17"
        }
    }
    stages{
        stage('build'){
            steps{
                sh "npm install --loglevel=verbose"
                sh "npm run build"
            }
        }
    }
}
