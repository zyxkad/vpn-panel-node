const https = require('follow-redirects').https;
const fs = require('fs');

const options = {
    'method': 'POST',
    'hostname': 'workbench.cloud.tencent.com',
    'path': '/cgi/capi?i=cvm/ResetInstance&uin=100022604925&region=ap-chengdu',
    'headers': {
        'authority': 'workbench.cloud.tencent.com',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Microsoft Edge";v="96"',
        'x-life': '132382',
        'sec-ch-ua-mobile': '?0',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.41',
        'content-type': 'application/json; charset=UTF-8',
        'x-csrfcode': '358458169',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'x-seqid': '592b92b5-c40f-62d4-4094-5a07bc34134d',
        'x-referer': 'https://console.cloud.tencent.com/cvm/instance/index?action=ResetInstance&rid=16',
        'x-lid': 'H1zrphe8YF',
        'sec-ch-ua-platform': '"Windows"',
        'origin': 'https://console.cloud.tencent.com',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://console.cloud.tencent.com/',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'cookie': 'language=zh; qcloud_from=qcloud.bing.seo-1638391055515; _ga=GA1.2.682831430.1638391056; sajssdk_2015_cross_new_user=1; qcloud_uid=6008742309188bd96e11147e337b2029; _gcl_au=1.1.1907781271.1638391058; opc_xsrf=f4c6e8b0f3144cd451e9e556a120c1e3%7C1638391095; projectName=%E5%85%A8%E9%83%A8%E9%A1%B9%E7%9B%AE; intl_language=zh; from=rechargeCheckBtn; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22100022604925%22%2C%22first_id%22%3A%2217d77b7859b83d-01365c4952ce107-5919145b-2764800-17d77b7859ca5c%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2217d77b7859b83d-01365c4952ce107-5919145b-2764800-17d77b7859ca5c%22%7D; qcmainCSRFToken=Sk7MpnxLKY; qcloud_visitId=121a1ea031ef1d10edae12a3a5a24d23; _gat=1; lastLoginType=email; lusername=lpqslrmslc%40iubridge.com; uin=o100022604925; tinyid=144115263423823381; skey=p6q*5*GlBhjR2Du34ujkyYbVTBSriOMvt23H2zqwcCE_; loginType=email; intl=1; regionId=16; appid=1308586254; moduleId=1308586254; systemTimeGap=-758; ownerUin=O100022604925G; saas_synced_session=100022604925%7Cp6q*5*GlBhjR2Du34ujkyYbVTBSriOMvt23H2zqwcCE_; nick=100022604925; qcact.sid=s%3A879KOUMYErAtA-vqvZtMjLdNW5up73r0.Lpa3Izt29s3ZqxTUmWJ51TKXhEzaGK1MMvIQeZs4U8I'
    },
    'maxRedirects': 20
};


function reinstall() {
    const data = fs.readFileSync('D:\\Projects\\vpn-panel-node\\test\\list.txt','ascii')
    //console.log(data)
    const lines = data.split('\r\n')
    for (let i = 0; i < lines.length; i++) {
        console.log(lines[i])
        const req = https.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
            });

            res.on("error", function (error) {
                console.error(error);
            });
        });
        const postData = `{\"serviceType\":\"cvm\",\"action\":\"ResetInstance\",\"region\":\"ap-chengdu\",\"data\":{\"Version\":\"2017-03-12\",\"InstanceId\":\"${lines[i]}\",\"ImageId\":\"img-c4mppsg5\",\"LoginSettings\":{\"Password\":\"Limengwei990114.\"},\"EnhancedService\":{\"SecurityService\":{\"Enabled\":false},\"MonitorService\":{\"Enabled\":false}}}}`;
        req.write(postData)
        req.end()
    }

}


reinstall()

