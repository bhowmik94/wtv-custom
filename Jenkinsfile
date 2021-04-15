#!/usr/bin/env groovy

def buildAndDeploy (servers, config) {
    def app_name = 'virtualsummit'

    echo 'Create tarball'
    script {
        env.deploy_version = "${sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()}"
        env.file_name = "${app_name}.${env.deploy_version}"
        sh 'mkdir to_deploy'
        sh "tar czvf to_deploy/'${env.file_name}'.tar.gz --exclude 'to_deploy' --exclude '.git' --exclude 'node_modules' --exclude '.next' --exclude 'Jenkinsfile' --exclude 'deploy.sh' --exclude 'package-lock.json' ."
    }

    echo "Deploy tarball to $servers"
    script {
        for (item in servers) {
            sh "scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null to_deploy/'${env.file_name}'.tar.gz wtv@'${item}':/tmp/"
            sh(script: """
            ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null wtv@'${item}' bash -c "'
                export PATH=/home/wtv/.nvm/versions/node/v12.1.0/bin:$PATH
                pm2 delete virtualsummit
                rm -rf /srv/apps/virtualsummit.*
                mkdir -p /srv/apps/'${env.file_name}'
                ln -s /home/wtv/.env /srv/apps/'${env.file_name}'/'${config}'
                tar xzvf /tmp/'${env.file_name}'.tar.gz -C /srv/apps/'${env.file_name}' || exit \$?
                cd /srv/apps/'${env.file_name}'
                npm install && pm2 start process.json && pm2 save --force && pm2 logs --nostream || exit \$?
            '"
            ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null wtv@'${item}' rm -f /tmp/'${env.file_name}'.tar.gz
            """)
            sleep(10)
            sh "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null wtv@'${item}' '/home/wtv/.nvm/versions/node/v12.1.0/bin/pm2 list | grep virtualsummit || exit \$?'"
        }
    }
}

pipeline {
    agent {
        docker {
            label 'docker-node'
            image 'wtvglobalproductdevelopment/wtv-jenkins-slave-nodejs:latest'
            registryUrl 'https://registry.hub.docker.com'
            registryCredentialsId 'Dockerhub'
            alwaysPull true
            args '-u 1000:998 -v /home/wtv/.ssh:/home/jenkins/.ssh'
        }
    }

    stages {
        stage ('Checkout') {
            steps {
                checkout scm
            }
        }
        stage ('Test') {
            steps {
                sh 'npm install || exit \$?'
            }
        }
        stage ('Deploy') {
            steps {
                script {
                    //Check branch
                    if ("${env.BRANCH_NAME}" == "master") {
                        def servers = ['4130-shst-fcdo-1.unbn-win.unit.net', '4130-shst-fcdo-2.unbn-win.unit.net']
                        def config = '.env'
                        buildAndDeploy(servers, config)
                    } else {
                        println "Nothing to deploy in ${env.BRANCH_NAME} Branch."
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
