pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'yarn install'
        sh 'yarn build'
      }
    }
    stage('Deploy to Develop') {
      when {
        branch 'develop'
      }
      steps {
        sh 'aws s3 sync build/ s3://dev-partners.intimate.online'
        sh 'aws cloudfront create-invalidation --distribution-id E2KAYGFY5PUVN7 --paths "/*"'
      }
    }
    stage('Deploy to Master') {
      when {
        branch 'master'
      }
      steps {
        
        sh 'aws s3 sync build/ s3://partners.intimate.io'
        sh 'aws cloudfront create-invalidation --distribution-id E86DH6YS1KQXG --paths "/*"'
      }
    }
    
  }
}