// const baseUrl = 'https://autumnfish.cn';
const baseUrl = 'https://netease-cloud-music-api-lovat-delta.vercel.app';
class Request {
    request(url,method,parmas){
       return new Promise((resolve,reject)=>{
        wx.request({
            url:baseUrl+url,
            method,
            data:parmas,
            success:function(res) {
                resolve(res);
            },
            fail:function(erro) {
                reject(erro);
            }
          })
       })
    }
    get(url,parmas){
        return xzRequest.request(url,"GET",parmas);
    }
    post(url,parmas){
        return xzRequest.request(url,"POST",parmas);
    }

}
const xzRequest = new Request();

export default xzRequest;