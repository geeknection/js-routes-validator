export interface RoutesData {
    global: string[],
    auth: string[],
    inAuthRedirectTo: string
    inPrivateRedirectTo: string
}
/**
 * Valida o acesso de rotas
 * O que não estiver em auth ou global, será considerado rota privada
 */
class RoutesValidator {
    private global: string[] = [];
    private auth: string[] = [];
    /**
     * Caso esteja em uma rota de autenticação e sem permissão, para onde deve ser redirecionado?
     */
    private inAuthRedirectTo: string = '/';
    /**
     * Se estiver em uma rota privado e sem sessão, para onde deve ser redirecionado?
     */
    private inPrivateRedirectTo: string = '/';
    /**
     * Token não é um valor obrigatório. Você pode passar um valor quando desejar validar rotas de sessão
     */
    public token: string = '';
    /**
     * Função não obrigatória. Você pode passar uma função de callback quando desejar executar algo após a validação de sessão
     * @returns any
     */
    public callback: any = () => null;
    constructor(routes: RoutesData) {
        this.global = routes.global;
        this.auth = routes.auth;
        this.inAuthRedirectTo = routes.inAuthRedirectTo;
        this.inPrivateRedirectTo = routes.inPrivateRedirectTo;
    }
    /**
     * Valida as rotas quando está em sessão
     * @returns void
     */
    private routesInSession = (): void => {
        const params = window.location.pathname.split('/');
        const inAuth = this.checkAuth(params);
        if (inAuth) {
            window.location.href = this.inAuthRedirectTo;
        }
        else {
            this.callback();
        }
    }
    /**
     * Verifica o parâmetro da rota atual com as rotas informadas
     * @returns boolean
     */
    private combineParams = (currentRoute: string[], route: string[]): boolean => {
        let result = false;
        Object.keys(route).map((key: any) => {
            const param: string = route[key];
            if ((param.indexOf(':') >= 0) || (param === currentRoute[key])) {
                result = true;
            }
            else {
                result = false;
            }
        });
        return result;
    }
    /**
     * Verifica a rota atual nas rotas de auth
     * @returns number
     */
    private checkAuth = (params: string[]): number => {
        return this.auth.filter(item => {
            const splited = item.split('/');
            if (splited.length === params.length) {
                if (this.combineParams(params, splited)) {
                    return item;
                }
            }
        }).length;
    }
    /**
     * Verifica a rota atual nas rotas globais
     * @returns number
     */
    private checkGlobal = (params: string[]): number => {
        return this.global.filter(item => {
            const splited = item.split('/');
            if (splited.length === params.length) {
                if (this.combineParams(params, splited)) {
                    return item;
                }
            }
        }).length;
    }
    /**
     * Valida as rotas quando está sem sessão
     * @returns void
     */
    private routesWithoutSession = (): void => {
        const params = window.location.pathname.split('/');
        const inAuth = this.checkAuth(params);
        const inGlobal = this.checkGlobal(params);
        if (!inAuth && !inGlobal) {
            window.location.href = this.inPrivateRedirectTo;
        }
    }
    /**
     * Inicia a validação das rotas
     * @returns void
     */
    public init = (): boolean|void => {
        if (this.token.length) {
            this.routesInSession();
        }
        else {
            this.routesWithoutSession();
        }
        return true;
    }
}
export default RoutesValidator;