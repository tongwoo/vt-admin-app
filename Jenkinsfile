pipeline{
    agent{
        docker{
            image "node:14"
        }
    }
    stages{
        stage('build'){
            steps{
                sh "npm install node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ --loglevel=verbose"
                sh "npm install --loglevel=verbose"
                sh "npm run build"
            }
        }
    }
}
