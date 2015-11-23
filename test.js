var cp = require('child_process');

cp.exec('ssh-add /root/certs/git_rsa', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
});