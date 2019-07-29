pipeline {
    agent none

    stages {
        stage('Build') {
            agent {
                label 'master'
            }
            steps {
                sh '''
                    echo $PATH
                    echo $USER_WWW_PATH
                    node -v
                    npm -v
                    npm install
                    npm run build
                '''
            }
        }
        stage('Deploy Dev') {
            agent {
                label 'master'
            }
            steps {
                sh '''
                    current=`date "+%s"`
                    lib_name=${current}.tar.gz
                    cd dist
                    tar -zcvf ${lib_name} *

                    if [ ! -d ${USER_WWW_PATH}  ];then
                        mkdir ${USER_WWW_PATH}
                    fi
                    mv ${lib_name} ${USER_WWW_PATH}
                    tar -zxvf ${USER_WWW_PATH}/${lib_name} -C ${USER_WWW_PATH}
                    rm -rf ${USER_WWW_PATH}/${lib_name}
                '''
            }
        }

        stage('Approve of Deploy Prod') {
          steps {
            input message: 'deploy to Prod?'
          }
        }

        stage('Deploy Prod') {
            agent {
                label 'master'
            }
            steps {
                sh '''
                    echo deploy prod
                '''
            }
        }
    }
}