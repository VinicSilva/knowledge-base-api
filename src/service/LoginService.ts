export default class LoginService {
	async auth(body: any): Promise<any> {
        const { login, senha } = body;
        if(login === 'xpto' && senha === '123456') {
            return 'token';
        }
        return { statusCode: 401, message: 'Invalid login!' };
	}
}