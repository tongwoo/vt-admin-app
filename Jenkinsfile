pipeline{
    agent{
        docker{
            image "node:14.17"
            args "-v \$HOME/.npm:/root/.npm"
        }
    }
    stages{
        stage('build'){
            steps{
                sh "npm install --registry=https://registry.npmmirror.com --loglevel=verbose"
                sh "npm run build"
            }
        }
    }
}
