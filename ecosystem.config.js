module.exports = {
    apps: [
        {
            name: 'vpn-node',
            script: 'index.js', // 入口文件目录
            append_env_to_name: true, // 加上这句后可以实现开发版本和生产版本部署在同一台服务器
            // 默认环境变量
            env: {},
            // 环境变量在使用 --env production 作为启动参数时生效
            // http://pm2.keymetrics.io/docs/usage/application-declaration/#switching-to-different-environments
            env_production: {
                NODE_ENV: "production"
            }
        }
    ],
    deploy: {
        // "production" 指定部署的环境名称
        production: {
            // SSH key path, default to $HOME/.ssh
            key: '/software/private.pem',
            // SSH user
            user: 'root',
            // SSH host
            host: [
                {
                    host: '81.70.98.15',
                    port: '22'
                }
            ],
            // SSH options with no command-line flag, see 'man ssh'
            // can be either a single string or an array of strings
            ssh_options: 'StrictHostKeyChecking=no',
            // GIT remote/branch
            ref: 'origin/main',
            // GIT remote
            repo: 'git@github.com:older-fox/vpn-panel-node.git',
            // path 指定项目目录
            path: '/software/vpn-panel-node',
            // Pre-setup 在 setup 之前执行，如安装 git
            // 'pre-setup': 'apt-get install git ; ls -la',
            // Post-setup 在 setup 之后执行
            // 'post-setup': 'ls -la',
            // 每次 update 都会执行
            'pre-deploy-local': "echo '生产环境部署中'; git pull",
            // post-deploy action
            'post-deploy': 'npm install && pm2 restart ecosystem.config.js --env production'
        }
    }
}