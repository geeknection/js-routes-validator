export interface RoutesData {
    global: string[];
    auth: string[];
    inAuthRedirectTo: string;
    inPrivateRedirectTo: string;
}
/**
 * Valida o acesso de rotas
 * O que não estiver em auth ou global, será considerado rota privada
 */
declare class RoutesValidator {
    private global;
    private auth;
    /**
     * Caso esteja em uma rota de autenticação e sem permissão, para onde deve ser redirecionado?
     */
    private inAuthRedirectTo;
    /**
     * Se estiver em uma rota privado e sem sessão, para onde deve ser redirecionado?
     */
    private inPrivateRedirectTo;
    /**
     * Token não é um valor obrigatório. Você pode passar um valor quando desejar validar rotas de sessão
     */
    token: string;
    /**
     * Função não obrigatória. Você pode passar uma função de callback quando desejar executar algo após a validação de sessão
     * @returns any
     */
    callback: any;
    constructor(routes: RoutesData);
    /**
     * Valida as rotas quando está em sessão
     * @returns void
     */
    private routesInSession;
    /**
     * Verifica o parâmetro da rota atual com as rotas informadas
     * @returns boolean
     */
    private combineParams;
    /**
     * Verifica a rota atual nas rotas de auth
     * @returns number
     */
    private checkAuth;
    /**
     * Verifica a rota atual nas rotas globais
     * @returns number
     */
    private checkGlobal;
    /**
     * Valida as rotas quando está sem sessão
     * @returns void
     */
    private routesWithoutSession;
    /**
     * Inicia a validação das rotas
     * @returns void
     */
    init: () => boolean | void;
}
export default RoutesValidator;
